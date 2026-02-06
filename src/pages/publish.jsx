// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Camera, Upload, X, Plus, Info } from 'lucide-react';
// @ts-ignore;
import { useToast, Button, Input, Textarea, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';

import { useForm } from 'react-hook-form';
import TabBar from '@/components/TabBar';
export default function Publish(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const form = useForm({
    defaultValues: {
      brand: '',
      model: '',
      storage: '',
      color: '',
      condition: '',
      price: '',
      originalPrice: '',
      location: '',
      description: '',
      tags: []
    }
  });
  const brands = [{
    value: 'apple',
    label: 'Apple'
  }, {
    value: 'huawei',
    label: '华为'
  }, {
    value: 'xiaomi',
    label: '小米'
  }, {
    value: 'samsung',
    label: '三星'
  }, {
    value: 'oppo',
    label: 'OPPO'
  }, {
    value: 'vivo',
    label: 'vivo'
  }, {
    value: 'other',
    label: '其他'
  }];
  const storageOptions = [{
    value: '64GB',
    label: '64GB'
  }, {
    value: '128GB',
    label: '128GB'
  }, {
    value: '256GB',
    label: '256GB'
  }, {
    value: '512GB',
    label: '512GB'
  }, {
    value: '1TB',
    label: '1TB'
  }];
  const conditionOptions = [{
    value: '99新',
    label: '99新（几乎全新）'
  }, {
    value: '95新',
    label: '95新（轻微使用）'
  }, {
    value: '9成新',
    label: '9成新（正常使用）'
  }, {
    value: '8成新',
    label: '8成新（明显使用痕迹）'
  }];
  const tagOptions = [{
    value: '面交',
    label: '支持面交'
  }, {
    value: '包邮',
    label: '包邮'
  }, {
    value: '验机',
    label: '支持验机'
  }, {
    value: '保修',
    label: '有保修'
  }, {
    value: '发票',
    label: '有发票'
  }, {
    value: '原装',
    label: '原装未拆'
  }];
  const handleImageUpload = e => {
    const files = Array.from(e.target.files);
    if (uploadedImages.length + files.length > 9) {
      toast({
        title: '图片数量超限',
        description: '最多上传9张图片',
        variant: 'destructive'
      });
      return;
    }
    setIsUploading(true);
    // 模拟上传过程
    setTimeout(() => {
      const newImages = files.map(file => ({
        url: URL.createObjectURL(file),
        file: file
      }));
      setUploadedImages([...uploadedImages, ...newImages]);
      setIsUploading(false);
      toast({
        title: '上传成功',
        description: `成功上传${files.length}张图片`
      });
    }, 1000);
  };
  const handleRemoveImage = index => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
  };
  const onSubmit = data => {
    if (uploadedImages.length === 0) {
      toast({
        title: '请上传图片',
        description: '至少需要上传1张商品图片',
        variant: 'destructive'
      });
      return;
    }

    // 模拟提交
    console.log('提交数据:', {
      ...data,
      images: uploadedImages
    });
    toast({
      title: '发布成功',
      description: '您的商品已成功发布'
    });

    // 重置表单
    form.reset();
    setUploadedImages([]);
  };
  return <div className="min-h-screen bg-[#F8FAFC] font-['Inter']">
      {/* Header */}
      <div className="bg-[#1E293B] text-white px-4 py-4">
        <h1 className="text-xl font-bold font-['JetBrains Mono']">发布二手手机</h1>
        <p className="text-sm text-gray-400 mt-1">填写详细信息，快速出售</p>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Image Upload */}
            <div className="bg-white rounded-lg p-6 border border-[#E2E8F0]">
              <div className="flex items-center gap-2 mb-4">
                <Camera className="w-5 h-5 text-[#F97316]" />
                <h2 className="font-semibold text-[#1E293B]">商品图片</h2>
                <span className="text-sm text-[#64748B]">（最多9张）</span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {uploadedImages.map((image, index) => <div key={index} className="relative aspect-square">
                    <img src={image.url} alt={`上传${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                    <Button type="button" variant="destructive" size="icon" onClick={() => handleRemoveImage(index)} className="absolute top-1 right-1 w-6 h-6 rounded-full">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>)}
                
                {uploadedImages.length < 9 && <label className="aspect-square border-2 border-dashed border-[#E2E8F0] rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#F97316] transition-colors">
                    <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" disabled={isUploading} />
                    {isUploading ? <div className="text-[#64748B]">上传中...</div> : <>
                        <Upload className="w-8 h-8 text-[#64748B] mb-2" />
                        <span className="text-sm text-[#64748B]">点击上传</span>
                      </>}
                  </label>}
              </div>
            </div>

            {/* Basic Info */}
            <div className="bg-white rounded-lg p-6 border border-[#E2E8F0]">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-[#F97316]" />
                <h2 className="font-semibold text-[#1E293B]">基本信息</h2>
              </div>

              <div className="space-y-4">
                <FormField control={form.control} name="brand" render={({
                field
              }) => <FormItem>
                      <FormLabel>品牌 *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="请选择品牌" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {brands.map(brand => <SelectItem key={brand.value} value={brand.value}>
                              {brand.label}
                            </SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>} />

                <FormField control={form.control} name="model" render={({
                field
              }) => <FormItem>
                      <FormLabel>型号 *</FormLabel>
                      <FormControl>
                        <Input placeholder="例如：iPhone 13 Pro Max" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />

                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="storage" render={({
                  field
                }) => <FormItem>
                        <FormLabel>存储容量 *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="请选择" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {storageOptions.map(option => <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>} />

                  <FormField control={form.control} name="color" render={({
                  field
                }) => <FormItem>
                        <FormLabel>颜色 *</FormLabel>
                        <FormControl>
                          <Input placeholder="例如：远峰蓝" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                </div>

                <FormField control={form.control} name="condition" render={({
                field
              }) => <FormItem>
                      <FormLabel>成色 *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="请选择成色" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {conditionOptions.map(option => <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>} />
              </div>
            </div>

            {/* Price Info */}
            <div className="bg-white rounded-lg p-6 border border-[#E2E8F0]">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-[#F97316]" />
                <h2 className="font-semibold text-[#1E293B]">价格信息</h2>
              </div>

              <div className="space-y-4">
                <FormField control={form.control} name="price" render={({
                field
              }) => <FormItem>
                      <FormLabel>出售价格 *</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="请输入出售价格" {...field} />
                      </FormControl>
                      <FormDescription>建议价格合理，更容易成交</FormDescription>
                      <FormMessage />
                    </FormItem>} />

                <FormField control={form.control} name="originalPrice" render={({
                field
              }) => <FormItem>
                      <FormLabel>原价（选填）</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="请输入原价" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-lg p-6 border border-[#E2E8F0]">
              <FormField control={form.control} name="location" render={({
              field
            }) => <FormItem>
                    <FormLabel>交易地点 *</FormLabel>
                    <FormControl>
                      <Input placeholder="例如：北京市朝阳区" {...field} />
                    </FormControl>
                    <FormDescription>方便买家了解交易地点</FormDescription>
                    <FormMessage />
                  </FormItem>} />
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg p-6 border border-[#E2E8F0]">
              <FormField control={form.control} name="description" render={({
              field
            }) => <FormItem>
                    <FormLabel>商品描述 *</FormLabel>
                    <FormControl>
                      <Textarea placeholder="请详细描述手机的使用情况、购买时间、配件情况等..." className="min-h-[150px]" {...field} />
                    </FormControl>
                    <FormDescription>详细的描述可以提高成交率</FormDescription>
                    <FormMessage />
                  </FormItem>} />
            </div>

            {/* Tags */}
            <div className="bg-white rounded-lg p-6 border border-[#E2E8F0]">
              <FormLabel className="block mb-3">交易标签</FormLabel>
              <div className="flex flex-wrap gap-2">
                {tagOptions.map(tag => <Button key={tag.value} type="button" variant="outline" onClick={() => {
                const currentTags = form.getValues('tags') || [];
                if (currentTags.includes(tag.value)) {
                  form.setValue('tags', currentTags.filter(t => t !== tag.value));
                } else {
                  form.setValue('tags', [...currentTags, tag.value]);
                }
              }} className={`${(form.getValues('tags') || []).includes(tag.value) ? 'bg-[#F97316] text-white border-[#F97316]' : ''}`}>
                    {tag.label}
                  </Button>)}
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white py-6 text-lg font-semibold">
              立即发布
            </Button>
          </form>
        </Form>
      </div>

      {/* Tab Bar */}
      <TabBar activeTab="publish" onTabClick={tabId => {
      if (tabId === 'home') {
        $w.utils.navigateTo({
          pageId: 'home',
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