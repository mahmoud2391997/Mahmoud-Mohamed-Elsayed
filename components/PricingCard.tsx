import React from 'react';
import { Plan } from '../types';
import { CheckCircle2 } from 'lucide-react';
import { View, Text, TouchableOpacity } from './ui/primitives';

interface PricingCardProps {
  plan: Plan;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan }) => {
  const isRecommended = plan.isRecommended;
  
  return (
    <View 
      className={`relative rounded-2xl p-5 mb-4 flex-col
        ${isRecommended 
          ? 'bg-[#333333] border-2 border-[#adc935]' 
          : 'bg-[#2a2a2a] border border-[#404040]'
        }`}
    >
      {isRecommended && (
        <View className="absolute -top-3 left-0 right-0 items-center z-10">
          <View className="bg-[#adc935] px-3 py-0.5 rounded-full shadow-lg">
             <Text className="text-[#262626] text-xs font-bold uppercase tracking-wide">
               Best Value
             </Text>
          </View>
        </View>
      )}

      <View className="mb-4 flex-row justify-between items-end">
        <Text className={`text-lg font-bold ${isRecommended ? 'text-[#adc935]' : 'text-white'}`}>
          {plan.name}
        </Text>
        <View className="flex-row items-baseline gap-0.5">
          <Text className="text-2xl font-bold text-white">
            ${plan.price}
          </Text>
          <Text className="text-gray-500 text-xs">/mo</Text>
        </View>
      </View>

      <View className="space-y-3 mb-6">
        {plan.features.map((feature, idx) => (
          <View key={idx} className="flex-row items-start gap-2">
            <CheckCircle2 className={`w-4 h-4 mt-0.5 ${isRecommended ? 'text-[#adc935]' : 'text-gray-600'}`} />
            <Text className="text-xs text-gray-300 flex-1 leading-tight">
              {feature}
            </Text>
          </View>
        ))}
      </View>

      <TouchableOpacity 
        className={`w-full py-3 rounded-lg items-center justify-center
          ${isRecommended 
            ? 'bg-[#adc935]' 
            : 'bg-[#404040]'
          }`}
      >
        <Text className={`font-bold text-sm ${isRecommended ? 'text-[#262626]' : 'text-white'}`}>
          Select Plan
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PricingCard;
