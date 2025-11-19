import React from 'react';
import { Video } from '../types';
import { Play, Lock, Heart } from 'lucide-react';
import { View, Text, TouchableOpacity, Image } from './ui/primitives';

interface VideoCardProps {
  video: Video;
  onToggleFavorite: (id: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onToggleFavorite }) => {
  return (
    <TouchableOpacity 
      activeOpacity={0.9}
      className="flex-row bg-[#333333] rounded-xl overflow-hidden border border-[#404040] mb-4 h-28 shadow-sm"
    >
      {/* Thumbnail Section */}
      <View className="relative w-32 h-full bg-black">
        <Image 
          source={{ uri: video.thumbnail }} 
          className="w-full h-full opacity-80"
          resizeMode="cover"
        />
        
        <View className="absolute inset-0 items-center justify-center">
          {video.isLocked ? (
            <View className="bg-black/60 p-1.5 rounded-full backdrop-blur-sm">
              <Lock className="w-4 h-4 text-[#adc935]" />
            </View>
          ) : (
            <View className="bg-[#adc935] p-1.5 rounded-full shadow-lg">
              <Play className="w-4 h-4 text-[#262626] fill-current" />
            </View>
          )}
        </View>
        
        <View className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 rounded">
          <Text className="text-[10px] text-white font-medium">
            {video.duration}
          </Text>
        </View>
      </View>

      {/* Content Section */}
      <View className="flex-1 p-3 justify-between">
        <View>
          <View className="flex-row justify-between items-start">
            <Text className="text-[#adc935] text-[10px] font-bold tracking-wider uppercase">
              {video.category}
            </Text>
            <TouchableOpacity 
              onPress={(e: any) => {
                e.stopPropagation();
                onToggleFavorite(video.id);
              }}
              className="p-1 -mt-1 -mr-1"
            >
              <Heart className={`w-4 h-4 ${video.isFavorite ? 'fill-[#adc935] text-[#adc935]' : 'text-gray-500'}`} />
            </TouchableOpacity>
          </View>
          <Text numberOfLines={2} className="text-white font-semibold text-sm mt-1 leading-tight">
            {video.title}
          </Text>
        </View>

        <View className="flex-row items-center justify-between mt-1">
          <View className="flex-row items-center gap-1.5">
            <View className="w-5 h-5 rounded-full bg-gray-600 items-center justify-center border border-gray-500">
              <Text className="text-[8px] text-white font-bold">
                {video.trainer.charAt(0)}
              </Text>
            </View>
            <Text className="text-xs text-gray-400" numberOfLines={1}>
              {video.trainer.split(' ')[0]}
            </Text>
          </View>
          <Text className="text-[10px] text-gray-500">
            {video.views > 1000 ? (video.views/1000).toFixed(1) + 'k' : video.views} views
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default VideoCard;
