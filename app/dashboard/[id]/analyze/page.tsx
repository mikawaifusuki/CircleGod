'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/app/components/Card';
import Button from '@/app/components/Button';
import { DashboardComponentConfig } from '@/lib/types';

export default function DashboardAnalyze({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [dashboard, setDashboard] = useState<any>(null);
  const [components, setComponents] = useState<DashboardComponentConfig[]>([]);
  const [analysis, setAnalysis] = useState<any>(null);
  const [userFeedback, setUserFeedback] = useState<string>('');
  
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        
        // 获取仪表盘信息
        const dashboardResponse = await fetch(`/api/dashboards/${params.id}`);
        if (!dashboardResponse.ok) {
          throw new Error(`获取仪表盘失败: ${dashboardResponse.status}`);
        }
        const dashboardData = await dashboardResponse.json();
        setDashboard(dashboardData);
        
        // 获取组件信息
        const componentsResponse = await fetch(`/api/dashboards/${params.id}/components`);
        if (!componentsResponse.ok) {
          throw new Error(`获取组件失败: ${componentsResponse.status}`);
        }
        const componentsData = await componentsResponse.json();
        
        // 转换组件格式以适应DashboardComponentConfig
        const formattedComponents = componentsData.map((component: any) => ({
          id: component.id,
          type: component.type,
          title: component.name,
          options: component.config,
          x: 0, // 这些值可能需要从布局中获取
          y: 0,
          w: 6,
          h: 8,
        }));
        
        setComponents(formattedComponents);
      } catch (err) {
        setError(err instanceof Error ? err.message : '加载数据时出错');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboard();
  }, [params.id]);
  
  const handleAnalyze = async () => {
    setAnalyzing(true);
    setError(null);
    
    try {
      const response = await fetch('/api/dashboards/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          components,
          userFeedback: userFeedback.trim() || undefined,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`分析失败: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success && result.analysis) {
        setAnalysis(result.analysis);
      } else {
        throw new Error(result.message || '分析仪表盘失败');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '分析仪表盘时出错');
    } finally {
      setAnalyzing(false);
    }
  };
  
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Card className="p-8 text-center">
          <div className="animate-pulse flex justify-center">
            <p>加载仪表盘数据中...</p>
          </div>
        </Card>
      </div>
    );
  }
  
  if (error && !dashboard) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Card className="p-8">
          <div className="text-red-500 mb-4">出错: {error}</div>
          <Button onClick={() => router.push('/dashboard')}>返回仪表盘列表</Button>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">仪表盘分析与优化</h1>
          <p className="mt-1 text-sm text-gray-500">
            {dashboard?.name} - 智能分析仪表盘的有效性并提供优化建议
          </p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            onClick={() => router.push(`/dashboard/${params.id}`)}
          >
            返回仪表盘
          </Button>
          <Button 
            onClick={() => router.push(`/dashboard/${params.id}/edit`)}
          >
            编辑仪表盘
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">反馈与分析</h2>
          <p className="text-gray-500 mb-4">
            提供您对仪表盘的反馈，AI将分析仪表盘的有效性并提供优化建议。
          </p>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              您的反馈 (可选)
            </label>
            <textarea
              value={userFeedback}
              onChange={(e) => setUserFeedback(e.target.value)}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="描述您对仪表盘的使用体验、期望改进的方面，或者您想要解决的特定问题..."
            />
          </div>
          
          {error && (
            <div className="p-4 mb-6 bg-red-50 text-red-600 rounded-md">
              {error}
            </div>
          )}
          
          <div className="flex justify-end">
            <Button
              onClick={handleAnalyze}
              disabled={analyzing || components.length === 0}
            >
              {analyzing ? '分析中...' : '分析仪表盘'}
            </Button>
          </div>
        </Card>
        
        {analysis && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">分析结果</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-3">仪表盘评估</h3>
              <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: analysis.dashboardAnalysis.replace(/\n/g, '<br />') }} />
              </div>
              
              <div className="mt-6 text-sm text-gray-500">
                分析时间: {new Date(analysis.timestamp).toLocaleString()}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
} 