export interface Video {
  id: string;
  title: string;
  trainer: string;
  category: 'Boxing' | 'Kickboxing' | 'Bag Training';
  duration: string;
  thumbnail: string;
  isLocked: boolean;
  isFavorite: boolean;
  views: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  isRecommended?: boolean;
}

export type ViewState = 'VIDEOS' | 'SHOP' | 'SUBSCRIPTION' | 'AI_COACH';
