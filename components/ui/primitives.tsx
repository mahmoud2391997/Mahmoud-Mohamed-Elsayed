import React from 'react';

// Types for better DX, mimicking React Native props partially
interface ViewProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
  numberOfLines?: number;
}

interface TouchableOpacityProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  activeOpacity?: number;
}

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  source: { uri: string } | string;
  resizeMode?: 'cover' | 'contain' | 'stretch';
}

interface ScrollViewProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  horizontal?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  showsVerticalScrollIndicator?: boolean;
  contentContainerStyle?: React.CSSProperties;
  contentContainerClassName?: string;
}

// --- COMPONENTS ---

export const View: React.FC<ViewProps> = ({ className = "", children, ...props }) => (
  <div className={`flex flex-col ${className}`} {...props}>
    {children}
  </div>
);

export const SafeAreaView: React.FC<ViewProps> = ({ className = "", children, ...props }) => (
  <div className={`flex flex-col w-full h-full ${className}`} {...props}>
    {children}
  </div>
);

export const Text: React.FC<TextProps> = ({ className = "", numberOfLines, children, style, ...props }) => {
  const lineClampStyle = numberOfLines ? {
    display: '-webkit-box',
    WebkitLineClamp: numberOfLines,
    WebkitBoxOrient: 'vertical' as const,
    overflow: 'hidden'
  } : {};

  return (
    <span 
      className={`block font-sans ${className}`} 
      style={{ ...lineClampStyle, ...style }} 
      {...props}
    >
      {children}
    </span>
  );
};

export const TouchableOpacity: React.FC<TouchableOpacityProps> = ({ 
  className = "", 
  activeOpacity = 0.7, 
  children, 
  style,
  onClick,
  ...props 
}) => {
  return (
    <button 
      className={`transition-opacity cursor-pointer select-none touch-manipulation ${className}`}
      style={{ ...style }}
      onClick={onClick}
      {...props}
      onMouseDown={(e) => e.currentTarget.style.opacity = String(activeOpacity)}
      onMouseUp={(e) => e.currentTarget.style.opacity = '1'}
      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
      onTouchStart={(e) => e.currentTarget.style.opacity = String(activeOpacity)}
      onTouchEnd={(e) => e.currentTarget.style.opacity = '1'}
    >
      {children}
    </button>
  );
};

export const Image: React.FC<ImageProps> = ({ className = "", source, resizeMode = 'cover', style, ...props }) => {
  const src = typeof source === 'string' ? source : source.uri;
  const objectFit = resizeMode === 'stretch' ? 'fill' : resizeMode;
  
  return (
    <img 
      src={src} 
      className={`block ${className}`}
      style={{ objectFit: objectFit as any, ...style }}
      {...props}
    />
  );
};

export const ImageBackground: React.FC<ViewProps & { source: { uri: string } | string }> = ({ 
  className = "", 
  source, 
  children, 
  style, 
  ...props 
}) => {
  const src = typeof source === 'string' ? source : source.uri;
  return (
    <div 
      className={`bg-cover bg-center flex flex-col ${className}`}
      style={{ backgroundImage: `url(${src})`, ...style }}
      {...props}
    >
      {children}
    </div>
  );
};

export const ScrollView: React.FC<ScrollViewProps> = ({ 
  className = "", 
  children, 
  horizontal, 
  showsHorizontalScrollIndicator = true,
  showsVerticalScrollIndicator = true,
  contentContainerClassName = "",
  ...props 
}) => {
  const scrollClass = horizontal ? 'overflow-x-auto flex-row' : 'overflow-y-auto flex-col';
  const hideScroll = (!showsHorizontalScrollIndicator || !showsVerticalScrollIndicator) ? 'no-scrollbar' : '';
  
  return (
    <div className={`flex ${scrollClass} ${hideScroll} ${className}`} {...props}>
      <div className={`flex ${horizontal ? 'flex-row' : 'flex-col'} ${contentContainerClassName}`}>
        {children}
      </div>
    </div>
  );
};

interface FlatListProps<T> {
  data: T[];
  renderItem: (info: { item: T; index: number }) => React.ReactNode;
  keyExtractor: (item: T) => string;
  className?: string;
  contentContainerClassName?: string;
  horizontal?: boolean;
  numColumns?: number;
  ListEmptyComponent?: React.ReactNode;
  showsHorizontalScrollIndicator?: boolean;
}

export function FlatList<T>({ 
  data, 
  renderItem, 
  keyExtractor, 
  className = "", 
  contentContainerClassName = "",
  horizontal,
  numColumns = 1,
  ListEmptyComponent,
  showsHorizontalScrollIndicator
}: FlatListProps<T>) {
  
  if (!data || data.length === 0) {
    return <>{ListEmptyComponent}</>;
  }

  const isGrid = numColumns > 1;

  if (horizontal) {
    return (
      <ScrollView 
        horizontal 
        className={className} 
        contentContainerClassName={contentContainerClassName}
        showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      >
        {data.map((item, index) => (
          <React.Fragment key={keyExtractor(item)}>
            {renderItem({ item, index })}
          </React.Fragment>
        ))}
      </ScrollView>
    );
  }

  return (
    <div className={`flex flex-col ${isGrid ? 'grid' : ''} ${className}`} 
         style={isGrid ? { gridTemplateColumns: `repeat(${numColumns}, minmax(0, 1fr))` } : {}}>
      <div className={`contents ${contentContainerClassName}`}>
        {data.map((item, index) => (
          <React.Fragment key={keyExtractor(item)}>
            {renderItem({ item, index })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
