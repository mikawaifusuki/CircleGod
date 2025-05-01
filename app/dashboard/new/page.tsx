'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { DashboardComponentConfig } from '@/lib/types';
import Button from '@/app/components/Button';
import Card from '@/app/components/Card';
import DashboardGrid from '@/app/components/dashboard/DashboardGrid';
import AIDashboardGenerator from './components/AIDashboardGenerator';

export default function NewDashboard() {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [components, setComponents] = useState<DashboardComponentConfig[]>([]);
  
  // 创建仪表盘
  const handleCreateDashboard = async () => {
    if (!name.trim()) {
      setError('请输入仪表盘名称');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // 构建布局JSON
      const layout = components.map(component => ({
        i: component.id,
        x: component.x,
        y: component.y,
        w: component.w,
        h: component.h,
      }));
      
      // 调用API创建仪表盘
      const response = await fetch('/api/dashboards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          layout: { items: layout },
          userId: 'user1', // 这应该是实际登录用户的ID，这里为示例
        }),
      });
      
      if (!response.ok) {
        throw new Error(`创建失败: ${response.status}`);
      }
      
      // 获取创建的仪表盘ID
      const dashboard = await response.json();
      
      // 为每个组件创建关联
      if (components.length > 0) {
        await Promise.all(components.map(async (component) => {
          await fetch(`/api/dashboards/${dashboard.id}/components`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: component.title,
              type: component.type,
              config: component.options,
              dashboardId: dashboard.id,
            }),
          });
        }));
      }
      
      // 跳转到仪表盘查看页面
      router.push(`/dashboard/${dashboard.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : '创建仪表盘时出错');
      setIsSubmitting(false);
    }
  };
  
  // 处理从AI生成的组件
  const handleComponentsGenerated = (generatedComponents: DashboardComponentConfig[]) => {
    setComponents(generatedComponents);
  };
  
  // 处理布局变化
  const handleLayoutChange = (layout: any[]) => {
    const updatedComponents = [...components];
    
    layout.forEach(item => {
      const index = updatedComponents.findIndex(comp => comp.id === item.i);
      if (index !== -1) {
        updatedComponents[index] = {
          ...updatedComponents[index],
          x: item.x,
          y: item.y,
          w: item.w,
          h: item.h,
        };
      }
    });
    
    setComponents(updatedComponents);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">创建新仪表盘</h1>
          <p className="mt-1 text-sm text-gray-500">
            使用AI助手快速生成仪表盘，或自定义创建您的分析视图
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => router.push('/dashboard')}
        >
          返回列表
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">基本信息</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                仪表盘名称 *
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="输入仪表盘名称"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                描述 (可选)
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="输入仪表盘描述"
              />
            </div>
          </div>
        </Card>
        
        <AIDashboardGenerator onComponentsGenerated={handleComponentsGenerated} />
        
        {components.length > 0 && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">仪表盘预览</h2>
            <div className="bg-gray-50 border rounded-lg p-4">
              <DashboardGrid 
                components={components} 
                isEditable={true}
                onLayoutChange={handleLayoutChange}
              />
            </div>
          </Card>
        )}
        
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-md">
            {error}
          </div>
        )}
        
        <div className="flex justify-end mt-4">
          <Button 
            variant="outline" 
            className="mr-2"
            onClick={() => router.push('/dashboard')}
          >
            取消
          </Button>
          <Button 
            onClick={handleCreateDashboard}
            disabled={isSubmitting || !name.trim() || components.length === 0}
          >
            {isSubmitting ? '创建中...' : '创建仪表盘'}
          </Button>
        </div>
      </div>
    </div>
  );
} 