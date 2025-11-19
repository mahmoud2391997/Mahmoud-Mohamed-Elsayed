import React from 'react';
import { Product } from '../types';
import { Plus } from 'lucide-react';
import { View, Text, Image, TouchableOpacity } from './ui/primitives';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <View className="bg-[#333333] rounded-xl overflow-hidden border border-[#404040] flex-col h-full shadow-sm">
      <View className="relative h-32 bg-white p-2 items-center justify-center">
        <Image 
          source={{ uri: product.image }} 
          className="w-full h-full"
          resizeMode="contain"
        />
        <View className="absolute top-1 left-1 bg-[#adc935] px-1.5 py-0.5 rounded">
          <Text className="text-[#262626] text-[10px] font-bold">
            {product.category}
          </Text>
        </View>
      </View>
      
      <View className="p-3 flex-1 justify-between">
        <Text numberOfLines={2} className="text-sm font-semibold text-white mb-2 leading-tight">
          {product.name}
        </Text>
        
        <View className="flex-row items-center justify-between pt-2 border-t border-[#404040]">
          <Text className="text-sm font-bold text-[#adc935]">
            ${product.price.toFixed(0)}
          </Text>
          <TouchableOpacity 
            onClick={() => onAddToCart(product)}
            className="bg-white/10 active:bg-[#adc935] p-1.5 rounded-lg"
          >
            <Plus className="w-4 h-4 text-white active:text-black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;
