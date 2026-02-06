// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { User, Heart, Package, Settings, LogOut, ChevronRight, MapPin, Phone, Mail, Edit } from 'lucide-react';
// @ts-ignore;
import { useToast, Button, Avatar, AvatarFallback, AvatarImage, Badge, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';

import TabBar from '@/components/TabBar';
export default function Profile(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('mylistings');

  // 获取当前用户信息
  const currentUser = $w.auth.currentUser || {
    name: '未登录',
    avatarUrl: '',
    type: 'anonymous'
  };
  const myListings = [{
    id: 1,
    title: 'iPhone 13 Pro Max 256GB',
    price: 5999,
    status: '在售',
    views: 234,
    favorites: 56,
    image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=200'
  }, {
    id: 2,
    title: '华为 Mate 50 Pro 512GB',
    price: 4999,
    status: '已售出',
    views: 189,
    favorites: 34,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200'
  }];
  const favorites = [{
    id: 3,
    title: '小米 14 Ultra 1TB',
    price: 5499,
    seller: '王先生',
    location: '广州',
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=200'
  }, {
    id: 4,
    title: '三星 Galaxy S24 Ultra',
    price: 7299,
    seller: '赵先生',
    location: '深圳',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=200'
  }];
  const menuItems = [{
    icon: Package,
    label: '我的发布',
    count: myListings.length
  }, {
    icon: Heart,
    label: '我的收藏',
    count: favorites.length
  }, {
    icon: Settings,
    label: '设置'
  }, {
    icon: LogOut,
    label: '退出登录'
  }];
  const handleMenuClick = item => {
    if (item.label === '退出登录') {
      toast({
        title: '退出成功',
        description: '您已成功退出登录'
      });
    } else if (item.label === '我的发布') {
      setActiveTab('mylistings');
    } else if (item.label === '我的收藏') {
      setActiveTab('favorites');
    } else if (item.label === '设置') {
      toast({
        title: '设置',
        description: '设置功能开发中...'
      });
    }
  };
  const handleListingClick = listingId => {
    $w.utils.navigateTo({
      pageId: 'detail',
      params: {
        id: listingId
      }
    });
  };
  const handleFavoriteClick = favoriteId => {
    $w.utils.navigateTo({
      pageId: 'detail',
      params: {
        id: favoriteId
      }
    });
  };
  return <div className="min-h-screen bg-[#F8FAFC] font-['Inter']">
      {/* Header */}
      <div className="bg-[#1E293B] text-white px-4 pt-12 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20 border-4 border-[#F97316]">
              <AvatarImage src={currentUser.avatarUrl} />
              <AvatarFallback className="bg-[#F97316] text-white text-2xl font-bold">
                {currentUser.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-bold font-['JetBrains Mono'] mb-1">
                {currentUser.name || '未登录'}
              </h1>
              <p className="text-sm text-gray-400">
                {currentUser.type === 'anonymous' ? '点击登录体验更多功能' : '诚信卖家，好评如潮'}
              </p>
            </div>
            <Button variant="outline" size="icon" className="border-white/20 text-white hover:bg-white/10">
              <Edit className="w-5 h-5" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#F97316] font-['JetBrains Mono']">
                {myListings.length}
              </div>
              <div className="text-sm text-gray-400">发布</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#F97316] font-['JetBrains Mono']">
                {favorites.length}
              </div>
              <div className="text-sm text-gray-400">收藏</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#F97316] font-['JetBrains Mono']">
                4.9
              </div>
              <div className="text-sm text-gray-400">评分</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6 pb-24">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg border border-[#E2E8F0] mb-4">
          {menuItems.map((item, index) => <button key={index} onClick={() => handleMenuClick(item)} className={`w-full flex items-center justify-between p-4 hover:bg-[#F8FAFC] transition-colors ${index !== menuItems.length - 1 ? 'border-b border-[#E2E8F0]' : ''}`}>
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-[#64748B]" />
                <span className="text-[#1E293B] font-medium">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.count !== undefined && <Badge variant="secondary" className="bg-[#F97316] text-white">
                    {item.count}
                  </Badge>}
                <ChevronRight className="w-5 h-5 text-[#64748B]" />
              </div>
            </button>)}
        </div>

        {/* Tabs Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 bg-white border border-[#E2E8F0] mb-4">
            <TabsTrigger value="mylistings" className="data-[state=active]:bg-[#F97316] data-[state=active]:text-white">
              我的发布
            </TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:bg-[#F97316] data-[state=active]:text-white">
              我的收藏
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mylistings">
            <div className="space-y-4">
              {myListings.map(listing => <div key={listing.id} onClick={() => handleListingClick(listing.id)} className="bg-white rounded-lg border border-[#E2E8F0] overflow-hidden cursor-pointer hover:shadow-lg transition-all">
                  <div className="flex">
                    <img src={listing.image} alt={listing.title} className="w-24 h-24 object-cover" />
                    <div className="flex-1 p-4">
                      <h3 className="font-semibold text-[#1E293B] mb-2 line-clamp-1">
                        {listing.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-[#F97316] font-['JetBrains Mono']">
                          ¥{listing.price.toLocaleString()}
                        </span>
                        <Badge className={`${listing.status === '在售' ? 'bg-green-500' : 'bg-gray-500'} text-white`}>
                          {listing.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-xs text-[#64748B]">
                        <span>{listing.views}次浏览</span>
                        <span>{listing.favorites}人收藏</span>
                      </div>
                    </div>
                  </div>
                </div>)}

              {myListings.length === 0 && <div className="text-center py-12 text-[#64748B]">
                  <Package className="w-12 h-12 mx-auto mb-4 text-[#94A3B8]" />
                  <p className="text-lg">暂无发布</p>
                  <p className="text-sm mt-2">快去发布你的第一个商品吧</p>
                </div>}
            </div>
          </TabsContent>

          <TabsContent value="favorites">
            <div className="space-y-4">
              {favorites.map(favorite => <div key={favorite.id} onClick={() => handleFavoriteClick(favorite.id)} className="bg-white rounded-lg border border-[#E2E8F0] overflow-hidden cursor-pointer hover:shadow-lg transition-all">
                  <div className="flex">
                    <img src={favorite.image} alt={favorite.title} className="w-24 h-24 object-cover" />
                    <div className="flex-1 p-4">
                      <h3 className="font-semibold text-[#1E293B] mb-2 line-clamp-1">
                        {favorite.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-[#F97316] font-['JetBrains Mono']">
                          ¥{favorite.price.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-xs text-[#64748B]">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {favorite.seller}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {favorite.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>)}

              {favorites.length === 0 && <div className="text-center py-12 text-[#64748B]">
                  <Heart className="w-12 h-12 mx-auto mb-4 text-[#94A3B8]" />
                  <p className="text-lg">暂无收藏</p>
                  <p className="text-sm mt-2">去发现心仪的商品吧</p>
                </div>}
            </div>
          </TabsContent>
        </Tabs>

        {/* Contact Info */}
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-6 mt-4">
          <h3 className="font-semibold text-[#1E293B] mb-4">联系方式</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-[#64748B]">
              <Phone className="w-5 h-5" />
              <span>138****8888</span>
            </div>
            <div className="flex items-center gap-3 text-[#64748B]">
              <Mail className="w-5 h-5" />
              <span>user***@example.com</span>
            </div>
            <div className="flex items-center gap-3 text-[#64748B]">
              <MapPin className="w-5 h-5" />
              <span>北京市朝阳区</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <TabBar activeTab="profile" onTabClick={tabId => {
      if (tabId === 'home') {
        $w.utils.navigateTo({
          pageId: 'home',
          params: {}
        });
      } else if (tabId === 'publish') {
        $w.utils.navigateTo({
          pageId: 'publish',
          params: {}
        });
      }
    }} />
    </div>;
}