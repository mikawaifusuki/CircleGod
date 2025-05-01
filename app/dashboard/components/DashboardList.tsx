'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/app/components/Card';
import Button from '@/app/components/Button';
import { RiPieChartLine, RiBarChartBoxLine, RiFileList3Line } from 'react-icons/ri';

interface Dashboard {
  id: string;
  name: string;
  description: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

const DashboardList: React.FC = () => {
  const router = useRouter();
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboards = async () => {
      try {
        const response = await fetch('/api/dashboards');
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setDashboards(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboards');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboards();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除此仪表盘吗？此操作不可恢复。')) {
      return;
    }

    try {
      const response = await fetch(`/api/dashboards/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete dashboard');
      }

      setDashboards(dashboards.filter(dashboard => dashboard.id !== id));
    } catch (err) {
      console.error('Error deleting dashboard:', err);
      alert('删除仪表盘失败');
    }
  };

  // 仪表盘样式图标
  const dashboardIcons = [
    <RiPieChartLine key="pie" size={40} className="text-blue-500" />,
    <RiBarChartBoxLine key="bar" size={40} className="text-indigo-500" />,
    <RiFileList3Line key="list" size={40} className="text-purple-500" />,
  ];

  if (loading) {
    return <div className="flex justify-center p-8">正在加载仪表盘...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4 bg-red-50 rounded-md">加载出错: {error}</div>;
  }

  // 模拟一些示例数据，实际应用中应该从API获取
  const sampleDashboards: Dashboard[] = [
    {
      id: '1',
      name: '销售业绩分析',
      description: '按季度的销售数据分析和趋势预测',
      userId: 'user1',
      createdAt: '2024-05-01T12:00:00Z',
      updatedAt: '2024-05-10T14:30:00Z',
    },
    {
      id: '2',
      name: '用户行为分析',
      description: '用户活跃度和转化率监控仪表盘',
      userId: 'user1',
      createdAt: '2024-04-15T09:20:00Z',
      updatedAt: '2024-05-05T11:15:00Z',
    },
    {
      id: '3',
      name: '财务报表',
      description: '月度收支和利润分析',
      userId: 'user1',
      createdAt: '2024-03-20T15:45:00Z',
      updatedAt: '2024-04-25T16:30:00Z',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-medium text-gray-900">我的仪表盘</h2>
          <p className="mt-1 text-sm text-gray-500">创建和管理您的数据仪表盘</p>
        </div>
        <Button 
          onClick={() => router.push('/dashboard/new')}
          size="md"
        >
          创建仪表盘
        </Button>
      </div>

      {dashboards.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 使用示例数据 */}
          {sampleDashboards.map((dashboard, index) => (
            <Card key={dashboard.id} className="h-full">
              <div className="flex flex-col h-full">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 mr-4">
                    {dashboardIcons[index % dashboardIcons.length]}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{dashboard.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{dashboard.description}</p>
                    <p className="text-xs text-gray-400">
                      创建于: {new Date(dashboard.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between mt-auto pt-4 border-t border-gray-200">
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/dashboard/${dashboard.id}`)}
                  >
                    查看
                  </Button>
                  <Button 
                    variant="primary"
                    size="sm"
                    onClick={() => router.push(`/dashboard/${dashboard.id}/edit`)}
                  >
                    编辑
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboards.map((dashboard, index) => (
            <Card key={dashboard.id} className="h-full">
              <div className="flex flex-col h-full">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 mr-4">
                    {dashboardIcons[index % dashboardIcons.length]}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{dashboard.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{dashboard.description}</p>
                    <p className="text-xs text-gray-400">
                      创建于: {new Date(dashboard.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between mt-auto pt-4 border-t border-gray-200">
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/dashboard/${dashboard.id}`)}
                  >
                    查看
                  </Button>
                  <div className="space-x-2">
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/dashboard/${dashboard.id}/edit`)}
                    >
                      编辑
                    </Button>
                    <Button 
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(dashboard.id)}
                    >
                      删除
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardList; 