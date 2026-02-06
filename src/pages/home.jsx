// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Search, Filter, Star, MapPin, Phone, ChevronRight } from 'lucide-react';
// @ts-ignore;
import { useToast, Button, Input, Badge, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';

import TabBar from '@/components/TabBar';
export default function Home(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [phones, setPhones] = useState([{
    id: 1,
    title: 'iPhone 13 Pro Max 256GB',
    brand: 'Apple',
    price: 5999,
    originalPrice: 8999,
    condition: '95新',
    storage: '256GB',
    color: '远峰蓝',
    location: '北京',
    seller: '张先生',
    rating: 4.8,
    views: 234,
    images: ['https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400', 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400'],
    tags: ['面交', '验机', '保修']
  }, {
    id: 2,
    title: '华为 Mate 50 Pro 512GB',
    brand: '华为',
    price: 4999,
    originalPrice: 6999,
    condition: '99新',
    storage: '512GB',
    color: '冰霜银',
    location: '上海',
    seller: '李女士',
    rating: 4.9,
    views: 189,
    images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400'],
    tags: ['包邮', '原装']
  }, {
    id: 3,
    title: '小米 14 Ultra 1TB',
    brand: '小米',
    price: 5499,
    originalPrice: 6499,
    condition: '9成新',
    storage: '1TB',
    color: '黑色',
    location: '广州',
    seller: '王先生',
    rating: 4.7,
    views: 312,
    images: ['https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400'],
    tags: ['面交', '发票']
  }, {
    id: 4,
    title: '三星 Galaxy S24 Ultra',
    brand: '三星',
    price: 7299,
    originalPrice: 9699,
    condition: '95新',
    storage: '512GB',
    color: '钛灰色',
    location: '深圳',
    seller: '赵先生',
    rating: 4.6,
    views: 156,
    images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400'],
    tags: ['验机', '保修']
  }, {
    id: 5,
    title: 'OPPO Find X7 Ultra',
    brand: 'OPPO',
    price: 4299,
    originalPrice: 5999,
    condition: '9成新',
    storage: '256GB',
    color: '大漠银',
    location: '杭州',
    seller: '陈女士',
    rating: 4.8,
    views: 98,
    images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400'],
    tags: ['包邮', '原装']
  }, {
    id: 6,
    title: 'vivo X100 Pro',
    brand: 'vivo',
    price: 3999,
    originalPrice: 5499,
    condition: '99新',
    storage: '512GB',
    color: '落日橙',
    location: '成都',
    seller: '刘先生',
    rating: 4.9,
    views: 267,
    images: ['https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400'],
    tags: ['面交', '发票']
  }]);
  const categories = [{
    id: 'all',
    name: '全部'
  }, {
    id: 'apple',
    name: 'Apple'
  }, {
    id: 'huawei',
    name: '华为'
  }, {
    id: 'xiaomi',
    name: '小米'
  }, {
    id: 'samsung',
    name: '三星'
  }, {
    id: 'oppo',
    name: 'OPPO'
  }, {
    id: 'vivo',
    name: 'vivo'
  }];
  const filteredPhones = phones.filter(phone => {
    const matchesSearch = phone.title.toLowerCase().includes(searchQuery.toLowerCase()) || phone.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || phone.brand.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });
  const handleSearch = value => {
    setSearchQuery(value);
  };
  const handlePhoneClick = phoneId => {
    $w.utils.navigateTo({
      pageId: 'detail',
      params: {
        id: phoneId
      }
    });
  };
  const handlePublish = () => {
    $w.utils.navigateTo({
      pageId: 'publish',
      params: {}
    });
  };
  return <div className="min-h-screen bg-[#F8FAFC] font-['Inter']">
      {/* Header */}
      <div className="bg-[#1E293B] text-white px-4 pt-12 pb-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold font-['JetBrains Mono'] mb-4">二手手机交易</h1>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input type="text" placeholder="搜索手机品牌、型号..." value={searchQuery} onChange={e => handleSearch(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white/10 border-white/20 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F97316]" />
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(category => <Button key={category.id} variant={selectedCategory === category.id ? 'default' : 'outline'} onClick={() => setSelectedCategory(category.id)} className={`whitespace-nowrap ${selectedCategory === category.id ? 'bg-[#F97316] hover:bg-[#EA580C] text-white border-[#F97316]' : 'bg-white/10 hover:bg-white/20 text-white border-white/20'}`}>
                {category.name}
              </Button>)}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6 pb-24">
        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-[#E2E8F0]">
            <div className="text-2xl font-bold text-[#1E293B] font-['JetBrains Mono']">1,234</div>
            <div className="text-sm text-[#64748B]">在售手机</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-[#E2E8F0]">
            <div className="text-2xl font-bold text-[#1E293B] font-['JetBrains Mono']">5,678</div>
            <div className="text-sm text-[#64748B]">成功交易</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-[#E2E8F0]">
            <div className="text-2xl font-bold text-[#1E293B] font-['JetBrains Mono']">98%</div>
            <div className="text-sm text-[#64748B]">好评率</div>
          </div>
        </div>

        {/* Phone List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPhones.map((phone, index) => <div key={phone.id} onClick={() => handlePhoneClick(phone.id)} className={`bg-white rounded-lg border border-[#E2E8F0] overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 ${index % 2 === 0 ? 'md:col-span-1' : 'md:col-span-1'}`}>
              <div className="flex">
                {/* Image */}
                <div className="w-32 h-32 flex-shrink-0 relative">
                  <img src={phone.images[0]} alt={phone.title} className="w-full h-full object-cover" />
                  <Badge className="absolute top-2 left-2 bg-[#F97316] text-white text-xs">
                    {phone.condition}
                  </Badge>
                </div>

                {/* Content */}
                <div className="flex-1 p-4">
                  <h3 className="font-semibold text-[#1E293B] mb-2 line-clamp-2">
                    {phone.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl font-bold text-[#F97316] font-['JetBrains Mono']">
                      ¥{phone.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-[#94A3B8] line-through">
                      ¥{phone.originalPrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#64748B] mb-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {phone.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {phone.rating}
                    </span>
                    <span>{phone.views}次浏览</span>
                  </div>

                  <div className="flex gap-1 flex-wrap">
                    {phone.tags.map((tag, tagIndex) => <Badge key={tagIndex} variant="outline" className="text-xs border-[#E2E8F0] text-[#64748B]">
                        {tag}
                      </Badge>)}
                  </div>
                </div>
              </div>
            </div>)}
        </div>

        {filteredPhones.length === 0 && <div className="text-center py-12 text-[#64748B]">
            <p className="text-lg">暂无相关手机</p>
            <p className="text-sm mt-2">试试其他搜索条件</p>
          </div>}
      </div>

      {/* Floating Publish Button */}
      <Button onClick={handlePublish} className="fixed bottom-24 right-4 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center">
        <span className="text-2xl font-bold">+</span>
      </Button>

      {/* Tab Bar */}
      <TabBar activeTab="home" onTabClick={tabId => {
      if (tabId === 'publish') {
        $w.utils.navigateTo({
          pageId: 'publish',
          params: {}
        });
      } else if (tabId === 'profile') {
        $w.utils.navigateTo({
          pageId: 'profile',
          params: {}
        });
      }
    }} />
    </div>;
}