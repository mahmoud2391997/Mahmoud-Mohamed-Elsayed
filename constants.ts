import { Video, Product, Plan } from './types';

export const MOCK_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'Heavy Bag Fundamentals',
    trainer: 'Mike "The Iron" Steele',
    category: 'Bag Training',
    duration: '15:30',
    thumbnail: 'https://picsum.photos/id/1056/600/400',
    isLocked: false,
    isFavorite: false,
    views: 1250,
  },
  {
    id: '2',
    title: 'Kickboxing Advanced Combos',
    trainer: 'Sarah "Viper" Vance',
    category: 'Kickboxing',
    duration: '22:15',
    thumbnail: 'https://picsum.photos/id/1060/600/400',
    isLocked: true,
    isFavorite: true,
    views: 3400,
  },
  {
    id: '3',
    title: 'Boxing Footwork Drills',
    trainer: 'Mike "The Iron" Steele',
    category: 'Boxing',
    duration: '10:00',
    thumbnail: 'https://picsum.photos/id/1081/600/400',
    isLocked: false,
    isFavorite: false,
    views: 890,
  },
  {
    id: '4',
    title: 'HIIT Bag Workout',
    trainer: 'John Doe',
    category: 'Bag Training',
    duration: '30:00',
    thumbnail: 'https://picsum.photos/id/1025/600/400',
    isLocked: true,
    isFavorite: false,
    views: 5600,
  },
  {
    id: '5',
    title: 'Defensive Maneuvers',
    trainer: 'Sarah "Viper" Vance',
    category: 'Boxing',
    duration: '18:45',
    thumbnail: 'https://picsum.photos/id/1015/600/400',
    isLocked: true,
    isFavorite: false,
    views: 2100,
  },
  {
    id: '6',
    title: 'Speed & Power Kicks',
    trainer: 'John Doe',
    category: 'Kickboxing',
    duration: '25:00',
    thumbnail: 'https://picsum.photos/id/1057/600/400',
    isLocked: false,
    isFavorite: true,
    views: 1800,
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Pro Impact Gloves 16oz',
    price: 89.99,
    description: 'Premium leather gloves designed for maximum protection and power.',
    image: 'https://picsum.photos/id/1080/400/400',
    category: 'Gloves',
  },
  {
    id: 'p2',
    name: 'Elite Shin Guards',
    price: 65.50,
    description: 'Lightweight foam construction with secure velcro straps.',
    image: 'https://picsum.photos/id/1059/400/400',
    category: 'Protection',
  },
  {
    id: 'p3',
    name: 'Cotton Hand Wraps (4.5m)',
    price: 12.99,
    description: 'Essential wrist support for all striking arts. Breathable fabric.',
    image: 'https://picsum.photos/id/1070/400/400',
    category: 'Accessories',
  },
  {
    id: 'p4',
    name: 'Heavy Bag 100lbs',
    price: 149.99,
    description: 'Durable vinyl shell with fiber filling. Chains included.',
    image: 'https://picsum.photos/id/1050/400/400',
    category: 'Equipment',
  },
];

export const SUBSCRIPTION_PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Rookie',
    price: 0,
    features: [
      'Access to 5 basic videos',
      'Webshop access',
      'Community forum (Read only)'
    ],
  },
  {
    id: 'pro',
    name: 'Contender',
    price: 14.99,
    features: [
      'Full Video Library Access',
      'HD Streaming',
      'Save Favorites',
      'Ad-free experience',
      'Weekly new content'
    ],
    isRecommended: true,
  },
  {
    id: 'elite',
    name: 'Champion',
    price: 24.99,
    features: [
      'All Contender features',
      '1-on-1 Virtual Coaching Feedback',
      'Exclusive Seminars',
      '15% Webshop Discount',
      'Offline Downloads'
    ],
  },
];

export const TRAINERS = ['All', 'Mike "The Iron" Steele', 'Sarah "Viper" Vance', 'John Doe'];
export const CATEGORIES = ['All', 'Boxing', 'Kickboxing', 'Bag Training'];
