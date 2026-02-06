// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { ArrowLeft, Heart, Share2, MapPin, Star, Phone, MessageCircle, Shield, CheckCircle, ChevronRight } from 'lucide-react';
// @ts-ignore;
import { useToast, Button, Badge, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';

import TabBar from '@/components/TabBar';
export default function Detail(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const {
    params
  } = $w.page.dataset;
  const phoneId = params.id;
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock data - 在实际应用中应该从数据模型获取
  const phoneData = {
    id: phoneId,
    title: 'iPhone 13 Pro Max 256GB',
    brand: 'Apple',
    price: 5999,
    originalPrice: 8999,
    condition: '95新',
    storage: '256GB',
    color: '远峰蓝',
    location: '北京朝阳区',
    seller: {
      name: '张先生',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      rating: 4.8,
      sales: 128,
      responseRate: '98%',
      responseTime: '10分钟内'
    },
    views: 234,
    favorites: 56,
    publishTime: '2天前',
    images: ['https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=600', 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600', 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600'],
    tags: ['面交', '验机', '保修'],
    description: `本人自用iPhone 13 Pro Max，256GB远峰蓝，购买于2022年3月，一直带壳使用，屏幕完美无划痕，电池健康96%，配件齐全（原装充电器、数据线、耳机、说明书）。

手机功能一切正常，无任何维修记录，支持验机。因换新机所以出售，诚心要的来，可小刀。

交易方式：
1. 北京朝阳区可面交验机
2. 支持顺丰包邮，签收后24小时内可退货
3. 可提供购买发票和保修卡`,
    specifications: [{
      label: '品牌',
      value: 'Apple'
    }, {
      label: '型号',
      value: 'iPhone 13 Pro Max'
    }, {
      label: '存储容量',
      value: '256GB'
    }, {
      label: '颜色',
      value: '远峰蓝'
    }, {
      label: '成色',
      value: '95新'
    }, {
      label: '电池健康',
      value: '96%'
    }, {
      label: '购买时间',
      value: '2022年3月'
    }, {
      label: '保修期',
      value: '至2025年3月'
    }]
  };
  const handleBack = () => {
    $w.utils.navigateBack();
  };
  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? '已取消收藏' : '已收藏',
      description: isLiked ? '该手机已从收藏中移除' : '该手机已添加到收藏'
    });
  };
  const handleShare = () => {
    toast({
      title: '分享成功',
      description: '链接已复制到剪贴板'
    });
  };
  const handleContact = type => {
    if (type === 'phone') {
      toast({
        title: '拨打电话',
        description: '正在拨打卖家电话...'
      });
    } else if (type === 'message') {
      toast({
        title: '发送消息',
        description: '正在打开聊天窗口...'
      });
    }
  };
  const handleBuy = () => {
    toast({
      title: '购买意向',
      description: '已向卖家发送购买意向，请等待回复'
    });
  };
  return <div className="min-h-screen bg-[#F8FAFC] font-['Inter']">
      {/* Header */}
      <div className="bg-[#1E293B] text-white px-4 py-4 flex items-center justify-between sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={handleBack} className="text-white hover:bg-white/10">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-lg font-semibold font-['JetBrains Mono']">商品详情</h1>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={handleLike} className={`text-white hover:bg-white/10 ${isLiked ? 'text-red-500' : ''}`}>
            <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleShare} className="text-white hover:bg-white/10">
            <Share2 className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative bg-[#1E293B]">
        <div className="max-w-6xl mx-auto">
          <img src={phoneData.images[currentImageIndex]} alt={phoneData.title} className="w-full h-80 object-cover" />
          {/* Image Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {phoneData.images.map((_, index) => <button key={index} onClick={() => setCurrentImageIndex(index)} className={`w-2 h-2 rounded-full transition-all ${currentImageIndex === index ? 'bg-[#F97316] w-6' : 'bg-white/50'}`} />)}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6 pb-32">
        {/* Price and Title */}
        <div className="bg-white rounded-lg p-6 border border-[#E2E8F0] mb-4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-[#1E293B] mb-2">
                {phoneData.title}
              </h1>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-[#F97316] font-['JetBrains Mono']">
                  ¥{phoneData.price.toLocaleString()}
                </span>
                <span className="text-lg text-[#94A3B8] line-through">
                  ¥{phoneData.originalPrice.toLocaleString()}
                </span>
                <Badge className="bg-[#F97316] text-white">
                  省¥{(phoneData.originalPrice - phoneData.price).toLocaleString()}
                </Badge>
              </div>
            </div>
            <Badge className="bg-green-500 text-white">
              {phoneData.condition}
            </Badge>
          </div>

          <div className="flex items-center gap-4 text-sm text-[#64748B]">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {phoneData.location}
            </span>
            <span>•</span>
            <span>{phoneData.views}次浏览</span>
            <span>•</span>
            <span>{phoneData.favorites}人收藏</span>
            <span>•</span>
            <span>{phoneData.publishTime}</span>
          </div>

          <div className="flex gap-2 mt-4">
            {phoneData.tags.map((tag, index) => <Badge key={index} variant="outline" className="border-[#E2E8F0] text-[#64748B]">
                {tag}
              </Badge>)}
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="description" className="mb-4">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-[#E2E8F0]">
            <TabsTrigger value="description" className="data-[state=active]:bg-[#F97316] data-[state=active]:text-white">
              商品描述
            </TabsTrigger>
            <TabsTrigger value="specs" className="data-[state=active]:bg-[#F97316] data-[state=active]:text-white">
              规格参数
            </TabsTrigger>
            <TabsTrigger value="seller" className="data-[state=active]:bg-[#F97316] data-[state=active]:text-white">
              卖家信息
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="bg-white rounded-lg border border-[#E2E8F0] p-6 mt-2">
            <div className="prose prose-sm max-w-none">
              <p className="text-[#334155] whitespace-pre-line leading-relaxed">
                {phoneData.description}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="specs" className="bg-white rounded-lg border border-[#E2E8F0] p-6 mt-2">
            <div className="grid grid-cols-2 gap-4">
              {phoneData.specifications.map((spec, index) => <div key={index} className="flex justify-between py-2 border-b border-[#E2E8F0]">
                  <span className="text-[#64748B]">{spec.label}</span>
                  <span className="text-[#1E293B] font-medium">{spec.value}</span>
                </div>)}
            </div>
          </TabsContent>

          <TabsContent value="seller" className="bg-white rounded-lg border border-[#E2E8F0] p-6 mt-2">
            <div className="flex items-start gap-4">
              <img src={phoneData.seller.avatar} alt={phoneData.seller.name} className="w-16 h-16 rounded-full object-cover" />
              <div className="flex-1">
                <h3 className="font-semibold text-[#1E293B] mb-1">
                  {phoneData.seller.name}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{phoneData.seller.rating}</span>
                  </div>
                  <span className="text-sm text-[#64748B]">
                    已售{phoneData.seller.sales}件
                  </span>
                </div>
                <div className="flex gap-4 text-sm text-[#64748B]">
                  <span>回复率 {phoneData.seller.responseRate}</span>
                  <span>{phoneData.seller.responseTime}回复</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-[#F8FAFC] rounded-lg">
              <div className="flex items-center gap-2 text-[#1E293B] mb-2">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="font-semibold">交易保障</span>
              </div>
              <div className="space-y-2 text-sm text-[#64748B]">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>支持验机，7天无理由退货</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>平台担保交易，资金安全</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>卖家实名认证，可追溯</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Contact Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button onClick={() => handleContact('message')} className="bg-white border-2 border-[#F97316] text-[#F97316] hover:bg-[#F97316] hover:text-white py-6">
            <MessageCircle className="w-5 h-5 mr-2" />
            在线咨询
          </Button>
          <Button onClick={() => handleContact('phone')} className="bg-[#F97316] hover:bg-[#EA580C] text-white py-6">
            <Phone className="w-5 h-5 mr-2" />
            电话联系
          </Button>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-[#E2E8F0] px-4 py-3">
        <div className="max-w-6xl mx-auto flex gap-3">
          <Button onClick={handleBuy} className="flex-1 bg-[#F97316] hover:bg-[#EA580C] text-white py-6 text-lg font-semibold">
            我想要
          </Button>
        </div>
      </div>

      {/* Tab Bar */}
      <TabBar activeTab="home" />
    </div>;
}