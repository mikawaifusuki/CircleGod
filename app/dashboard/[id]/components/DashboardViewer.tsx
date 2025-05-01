'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/Button';
import Card from '@/app/components/Card';
import DashboardGrid from '@/app/components/dashboard/DashboardGrid';
import { v4 as uuidv4 } from 'uuid';
import { ComponentType } from '@/lib/types';

interface Dashboard {
  id: string;
  name: string;
  description: string | null;
  layout: any;
  userId: string;
  createdAt: string;
  updatedAt: string;
  components: any[];
}

interface DashboardViewerProps {
  dashboardId: string;
}

const DashboardViewer: React.FC<DashboardViewerProps> = ({ dashboardId }) => {
  const router = useRouter();
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/dashboards/${dashboardId}`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setDashboard(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    if (dashboardId) {
      fetchDashboard();
    }
  }, [dashboardId]);

  // 示例数据 - 实际应用中应该来自API
  const exampleComponents = [
    {
      id: uuidv4(),
      type: ComponentType.CHART,
      title: '月度销售额',
      options: { chartType: 'bar' },
      w: 6,
      h: 8,
      x: 0,
      y: 0,
    },
    {
      id: uuidv4(),
      type: ComponentType.CHART,
      title: '用户增长趋势',
      options: { chartType: 'line' },
      w: 6,
      h: 8,
      x: 6,
      y: 0,
    },
    {
      id: uuidv4(),
      type: ComponentType.TABLE,
      title: '产品销售情况',
      options: {},
      w: 6,
      h: 7,
      x: 0,
      y: 8,
    },
    {
      id: uuidv4(),
      type: ComponentType.METRIC,
      title: '总收入',
      options: { 
        label: '总收入', 
        value: '¥ 2,850,456' 
      },
      w: 3,
      h: 7,
      x: 6,
      y: 8,
    },
    {
      id: uuidv4(),
      type: ComponentType.CHART,
      title: '销售类别分布',
      options: { chartType: 'pie' },
      w: 3,
      h: 7,
      x: 9,
      y: 8,
    },
  ];

  if (loading) {
    return (
      <Card className="p-8 text-center">
        <div className="animate-pulse flex justify-center">
          <div className="text-center">加载仪表盘中...</div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-8">
        <div className="text-red-500 mb-4">加载出错: {error}</div>
        <Button onClick={() => router.push('/dashboard')}>返回仪表盘列表</Button>
      </Card>
    );
  }

  // 使用API数据或示例数据
  const components = dashboard?.components?.length 
    ? dashboard.components
    : exampleComponents;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{dashboard?.name || '示例仪表盘'}</h1>
          {dashboard?.description && (
            <p className="mt-1 text-gray-500">{dashboard.description}</p>
          )}
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            onClick={() => router.push('/dashboard')}
          >
            返回列表
          </Button>
          <Button 
            variant="outline"
            onClick={() => router.push(`/dashboard/${dashboardId}/analyze`)}
          >
            AI分析
          </Button>
          <Button 
            onClick={() => router.push(`/dashboard/${dashboardId}/edit`)}
          >
            编辑仪表盘
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <DashboardGrid components={components} />
      </div>
    </div>
  );
};

export default DashboardViewer; 