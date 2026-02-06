// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Home, Plus, User } from 'lucide-react';
// @ts-ignore;
import { Button } from '@/components/ui';

export default function TabBar({
  activeTab,
  onTabClick
}) {
  const tabs = [{
    id: 'home',
    label: '首页',
    icon: Home
  }, {
    id: 'publish',
    label: '发布',
    icon: Plus
  }, {
    id: 'profile',
    label: '我的',
    icon: User
  }];
  return <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-around py-2">
          {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return <Button key={tab.id} variant="ghost" onClick={() => onTabClick && onTabClick(tab.id)} className={`flex-1 flex flex-col items-center gap-1 py-2 h-auto ${isActive ? 'text-[#F97316]' : 'text-[#64748B]'}`}>
                <Icon className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} />
                <span className="text-xs font-medium">{tab.label}</span>
              </Button>;
        })}
        </div>
      </div>
    </div>;
}