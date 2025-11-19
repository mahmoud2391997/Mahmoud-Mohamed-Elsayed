import React, { useState } from 'react';
import { Video, Product } from './types';
import { MOCK_VIDEOS, MOCK_PRODUCTS, SUBSCRIPTION_PLANS, TRAINERS, CATEGORIES } from './constants';
import VideoCard from './components/VideoCard';
import ProductCard from './components/ProductCard';
import PricingCard from './components/PricingCard';
import { generateWorkoutSuggestion } from './services/geminiService';
import { View, Text, SafeAreaView, ScrollView, FlatList, TouchableOpacity } from './components/ui/primitives';

// Icons
import { 
  Home,
  ShoppingBag, 
  Trophy,
  Bot, 
  Search, 
  Sparkles,
  Loader2,
  Dumbbell
} from 'lucide-react';

// Mobile Tab Types
type Tab = 'HOME' | 'SHOP' | 'COACH' | 'PREMIUM';

// --- COMPONENTS ---

const Chip: React.FC<{ label: string, active: boolean, onPress: () => void }> = ({ label, active, onPress }) => (
  <TouchableOpacity 
    onClick={onPress}
    className={`px-4 py-2 rounded-full border mr-2
      ${active 
        ? 'bg-[#adc935] border-[#adc935]' 
        : 'bg-[#333] border-[#404040]'
      }`}
  >
    <Text className={`text-sm font-medium ${active ? 'text-[#262626]' : 'text-gray-300'}`}>
      {label}
    </Text>
  </TouchableOpacity>
);

const TabBarIcon: React.FC<{ icon: React.ReactNode, label: string, isActive: boolean, onPress: () => void }> = ({ icon, label, isActive, onPress }) => (
  <TouchableOpacity 
    onClick={onPress}
    className="flex-1 items-center justify-center py-2"
  >
    <View className={`p-1 rounded-xl mb-1 ${isActive ? 'bg-[#adc935]/10' : ''}`}>
      {React.cloneElement(icon as React.ReactElement, { 
        className: `w-6 h-6 ${isActive ? 'text-[#adc935]' : 'text-gray-500'}` 
      })}
    </View>
    <Text className={`text-[10px] font-medium ${isActive ? 'text-[#adc935]' : 'text-gray-500'}`}>
      {label}
    </Text>
  </TouchableOpacity>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('HOME');
  
  // State
  const [videos, setVideos] = useState<Video[]>(MOCK_VIDEOS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrainer, setSelectedTrainer] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartCount, setCartCount] = useState(0);
  const [showToast, setShowToast] = useState(false);

  // AI Coach State
  const [aiGoal, setAiGoal] = useState('');
  const [aiExperience, setAiExperience] = useState('');
  const [aiTime, setAiTime] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{role: 'user' | 'ai', text: string}>>([
    { role: 'ai', text: "Hi fighter! I'm your AI Coach. Configure your session below." }
  ]);

  // --- LOGIC ---

  const handleAddToCart = (product: Product) => {
    setCartCount(prev => prev + 1);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleToggleFavorite = (id: string) => {
    setVideos(prev => prev.map(v => 
      v.id === id ? { ...v, isFavorite: !v.isFavorite } : v
    ));
  };

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          video.trainer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTrainer = selectedTrainer === 'All' || video.trainer === selectedTrainer;
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    return matchesSearch && matchesTrainer && matchesCategory;
  });

  const handleAskAi = async () => {
    if (!aiGoal || !aiExperience || !aiTime) return;
    
    const userMessage = `Goal: ${aiGoal}, Level: ${aiExperience}, Time: ${aiTime}`;
    setChatHistory(prev => [...prev, { role: 'user', text: userMessage }]);
    
    setAiLoading(true);
    const suggestion = await generateWorkoutSuggestion(aiGoal, aiExperience, aiTime);
    
    setChatHistory(prev => [...prev, { role: 'ai', text: suggestion }]);
    setAiLoading(false);
    
    setAiGoal('');
    setAiExperience('');
    setAiTime('');
  };

  // --- SCREENS ---

  const HomeScreen = () => (
    <ScrollView className="flex-1 bg-[#262626]" contentContainerClassName="pb-24 px-4 pt-4">
      {/* Search Input */}
      <View className="mb-6 relative">
        <View className="absolute left-3 top-3.5 z-10">
          <Search className="h-5 w-5 text-gray-400" />
        </View>
        <input 
          type="text" 
          placeholder="Search workouts..." 
          className="w-full bg-[#333] text-white h-12 pl-10 pr-4 rounded-2xl border border-[#404040] focus:outline-none focus:border-[#adc935]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </View>

      {/* Filters */}
      <View className="mb-4">
        <Text className="text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
          {CATEGORIES.map(cat => (
            <Chip key={cat} label={cat} active={selectedCategory === cat} onPress={() => setSelectedCategory(cat)} />
          ))}
        </ScrollView>
      </View>

      <View className="mb-6">
        <Text className="text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Trainers</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
          {TRAINERS.map(trainer => (
            <Chip key={trainer} label={trainer.split(' ')[0]} active={selectedTrainer === trainer} onPress={() => setSelectedTrainer(trainer)} />
          ))}
        </ScrollView>
      </View>

      {/* Video List */}
      <View className="flex-col">
        {filteredVideos.map(video => (
          <VideoCard key={video.id} video={video} onToggleFavorite={handleToggleFavorite} />
        ))}
        {filteredVideos.length === 0 && (
          <View className="items-center py-10">
            <Dumbbell className="w-12 h-12 text-gray-700 mb-3" />
            <Text className="text-gray-500">No workouts found</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );

  const ShopScreen = () => (
    <View className="flex-1 bg-[#262626] pb-24 px-4 pt-4">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-2xl font-bold text-white">Gear Shop</Text>
        <View className="relative">
          <ShoppingBag className="w-6 h-6 text-white" />
          {cartCount > 0 && (
            <View className="absolute -top-2 -right-2 bg-[#adc935] w-5 h-5 rounded-full items-center justify-center border-2 border-[#262626]">
              <Text className="text-[#262626] text-xs font-bold">{cartCount}</Text>
            </View>
          )}
        </View>
      </View>
      
      <FlatList 
        data={MOCK_PRODUCTS}
        numColumns={2}
        className="flex-1"
        contentContainerClassName="gap-4 pb-24"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
           <View className="p-1 w-full h-64">
             <ProductCard product={item} onAddToCart={handleAddToCart} />
           </View>
        )}
      />
    </View>
  );

  const CoachScreen = () => (
    <View className="flex-1 bg-[#262626] pb-20">
      <ScrollView className="flex-1 px-4 pt-4" contentContainerClassName="pb-4">
        {chatHistory.map((msg, idx) => (
          <View key={idx} className={`flex-row mb-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <View 
              className={`max-w-[85%] p-4 rounded-2xl
                ${msg.role === 'user' 
                  ? 'bg-[#adc935] rounded-tr-sm' 
                  : 'bg-[#333] border border-[#404040] rounded-tl-sm'
                }`}
            >
              <Text className={`text-sm leading-relaxed ${msg.role === 'user' ? 'text-[#262626]' : 'text-gray-100'}`}>
                {msg.text}
              </Text>
            </View>
          </View>
        ))}
        {aiLoading && (
           <View className="flex-row justify-start mb-4">
             <View className="bg-[#333] p-4 rounded-2xl rounded-tl-sm border border-[#404040]">
               <Loader2 className="w-5 h-5 text-[#adc935] animate-spin" />
             </View>
          </View>
        )}
      </ScrollView>

      {/* Controls */}
      <View className="p-4 bg-[#262626] border-t border-[#333]">
        {!aiLoading && (
          <View className="gap-3">
             <View className="flex-row gap-2">
                <select 
                  className="flex-1 bg-[#333] text-white text-xs rounded-lg px-2 h-10 border border-[#404040] focus:border-[#adc935] outline-none"
                  value={aiGoal} 
                  onChange={e => setAiGoal(e.target.value)}
                >
                  <option value="">Goal</option>
                  <option value="Cardio">Cardio</option>
                  <option value="Technique">Technique</option>
                  <option value="Power">Power</option>
                </select>
                <select 
                  className="flex-1 bg-[#333] text-white text-xs rounded-lg px-2 h-10 border border-[#404040] focus:border-[#adc935] outline-none"
                  value={aiExperience} 
                  onChange={e => setAiExperience(e.target.value)}
                >
                  <option value="">Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                <select 
                  className="flex-1 bg-[#333] text-white text-xs rounded-lg px-2 h-10 border border-[#404040] focus:border-[#adc935] outline-none"
                  value={aiTime} 
                  onChange={e => setAiTime(e.target.value)}
                >
                  <option value="">Time</option>
                  <option value="15 min">15m</option>
                  <option value="30 min">30m</option>
                  <option value="45 min">45m</option>
                </select>
             </div>

             <TouchableOpacity 
               onPress={handleAskAi}
               disabled={!aiGoal || !aiExperience || !aiTime}
               className={`h-12 rounded-xl items-center justify-center flex-row gap-2
                 ${(!aiGoal || !aiExperience || !aiTime) 
                   ? 'bg-[#333]' 
                   : 'bg-[#adc935] shadow-lg'
                 }`}
             >
               <Sparkles className={`w-4 h-4 ${(!aiGoal || !aiExperience || !aiTime) ? 'text-gray-500' : 'text-[#262626]'}`} />
               <Text className={`font-bold ${(!aiGoal || !aiExperience || !aiTime) ? 'text-gray-500' : 'text-[#262626]'}`}>
                 Generate Workout
               </Text>
             </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  const PremiumScreen = () => (
    <ScrollView className="flex-1 bg-[#262626]" contentContainerClassName="pb-24 px-4 pt-4">
      <View className="items-center mb-8 mt-4">
        <Text className="text-3xl font-bold text-white mb-2">Go Pro</Text>
        <Text className="text-gray-400 text-sm text-center">Upgrade your training with our premium tiers.</Text>
      </View>
      
      <View className="gap-6">
        {SUBSCRIPTION_PLANS.map(plan => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </View>
    </ScrollView>
  );

  // --- RENDER ---

  return (
    <SafeAreaView className="bg-[#1a1a1a]">
      {/* Header */}
      <View className="h-14 bg-[#1a1a1a] border-b border-[#333] items-center justify-center z-20 relative">
        <Text className="text-lg font-bold text-white tracking-wide">
          {activeTab === 'HOME' ? 'Training' : 
           activeTab === 'SHOP' ? 'Webshop' : 
           activeTab === 'COACH' ? 'AI Coach' : 'Premium'}
        </Text>
        {activeTab === 'HOME' && (
          <View className="absolute left-4">
            <Text className="font-black italic tracking-tighter text-[#adc935]">IG</Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View className="flex-1 bg-[#262626]">
        {activeTab === 'HOME' && <HomeScreen />}
        {activeTab === 'SHOP' && <ShopScreen />}
        {activeTab === 'COACH' && <CoachScreen />}
        {activeTab === 'PREMIUM' && <PremiumScreen />}
      </View>

      {/* Tab Bar */}
      <View className="h-20 bg-[#1a1a1a]/95 border-t border-[#333] flex-row items-start justify-around pt-1 absolute bottom-0 left-0 right-0">
        <TabBarIcon 
          icon={<Home />} 
          label="Home" 
          isActive={activeTab === 'HOME'} 
          onPress={() => setActiveTab('HOME')} 
        />
        <TabBarIcon 
          icon={<ShoppingBag />} 
          label="Shop" 
          isActive={activeTab === 'SHOP'} 
          onPress={() => setActiveTab('SHOP')} 
        />
        <TabBarIcon 
          icon={<Bot />} 
          label="Coach" 
          isActive={activeTab === 'COACH'} 
          onPress={() => setActiveTab('COACH')} 
        />
        <TabBarIcon 
          icon={<Trophy />} 
          label="Plans" 
          isActive={activeTab === 'PREMIUM'} 
          onPress={() => setActiveTab('PREMIUM')} 
        />
      </View>

      {/* Toast Notification */}
      <View 
        className={`absolute top-20 left-0 right-0 items-center z-[60] transition-all duration-300 pointer-events-none
          ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
      >
        <View className="bg-[#adc935] px-6 py-2 rounded-full shadow-xl flex-row items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-[#262626]" />
          <Text className="text-[#262626] font-bold text-sm">Added to cart</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
