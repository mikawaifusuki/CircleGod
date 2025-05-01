'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/app/components/Card';
import Button from '@/app/components/Button';
import { ConnectorType } from '@/lib/types';

interface Connector {
  id: string;
  name: string;
  type: ConnectorType;
  config: any;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

const getConnectorTypeLabel = (type: ConnectorType) => {
  const labels = {
    [ConnectorType.MYSQL]: 'MySQL',
    [ConnectorType.POSTGRESQL]: 'PostgreSQL',
    [ConnectorType.MONGODB]: 'MongoDB',
    [ConnectorType.REST_API]: 'REST API',
    [ConnectorType.GRAPHQL]: 'GraphQL',
    [ConnectorType.CSV]: 'CSV',
    [ConnectorType.EXCEL]: 'Excel',
  };
  return labels[type] || type;
};

const ConnectorList: React.FC = () => {
  const router = useRouter();
  const [connectors, setConnectors] = useState<Connector[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConnectors = async () => {
      try {
        const response = await fetch('/api/connectors');
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setConnectors(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load connectors');
      } finally {
        setLoading(false);
      }
    };

    fetchConnectors();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除此连接器吗？此操作不可恢复。')) {
      return;
    }

    try {
      const response = await fetch(`/api/connectors/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete connector');
      }

      setConnectors(connectors.filter(connector => connector.id !== id));
    } catch (err) {
      console.error('Error deleting connector:', err);
      alert('删除连接器失败');
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">正在加载数据连接器...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4 bg-red-50 rounded-md">加载出错: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-medium text-gray-900">数据连接器</h2>
          <p className="mt-1 text-sm text-gray-500">管理您的数据源连接</p>
        </div>
        <Button 
          onClick={() => router.push('/connectors/new')}
          size="md"
        >
          添加连接器
        </Button>
      </div>

      {connectors.length === 0 ? (
        <Card>
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">暂无数据连接器</p>
            <Button 
              onClick={() => router.push('/connectors/new')}
              variant="primary"
            >
              创建第一个连接器
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connectors.map((connector) => (
            <Card key={connector.id} className="h-full">
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{connector.name}</h3>
                  <div className="mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {getConnectorTypeLabel(connector.type)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    创建于: {new Date(connector.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/connectors/${connector.id}/edit`)}
                  >
                    编辑
                  </Button>
                  <Button 
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(connector.id)}
                  >
                    删除
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConnectorList; 