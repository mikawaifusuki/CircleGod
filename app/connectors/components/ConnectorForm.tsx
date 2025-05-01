'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/app/components/Card';
import Button from '@/app/components/Button';
import { ConnectorType, DataConnectorConfig } from '@/lib/types';

interface ConnectorFormProps {
  connectorId?: string;
}

const connectorTypeOptions = [
  { value: ConnectorType.MYSQL, label: 'MySQL' },
  { value: ConnectorType.POSTGRESQL, label: 'PostgreSQL' },
  { value: ConnectorType.MONGODB, label: 'MongoDB' },
  { value: ConnectorType.REST_API, label: 'REST API' },
  { value: ConnectorType.GRAPHQL, label: 'GraphQL' },
  { value: ConnectorType.CSV, label: 'CSV' },
  { value: ConnectorType.EXCEL, label: 'Excel' },
];

const ConnectorForm: React.FC<ConnectorFormProps> = ({ connectorId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [name, setName] = useState('');
  const [type, setType] = useState<ConnectorType>(ConnectorType.MYSQL);
  const [config, setConfig] = useState<DataConnectorConfig>({
    type: ConnectorType.MYSQL,
    connection: {
      host: '',
      port: 3306,
      database: '',
      username: '',
      password: '',
    }
  });

  useEffect(() => {
    if (connectorId) {
      fetchConnector();
    }
  }, [connectorId]);

  const fetchConnector = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/connectors/${connectorId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch connector');
      }
      const data = await response.json();
      setName(data.name);
      setType(data.type);
      setConfig(data.config);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const url = connectorId 
        ? `/api/connectors/${connectorId}` 
        : '/api/connectors';
      
      const method = connectorId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          type,
          config,
          userId: 'temp-user-id', // 临时用户ID，实际应用中应该从会话获取
        }),
      });

      if (!response.ok) {
        throw new Error('操作失败');
      }

      setSuccess('保存成功！');
      
      // 如果是新建，保存成功后跳转到列表页
      if (!connectorId) {
        setTimeout(() => {
          router.push('/connectors');
        }, 1500);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '发生错误');
    } finally {
      setLoading(false);
    }
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as ConnectorType;
    setType(newType);
    
    // 根据连接器类型更新默认配置
    let defaultConfig: DataConnectorConfig = {
      type: newType,
      connection: {}
    };
    
    switch (newType) {
      case ConnectorType.MYSQL:
        defaultConfig.connection = {
          host: '',
          port: 3306,
          database: '',
          username: '',
          password: '',
        };
        break;
      case ConnectorType.POSTGRESQL:
        defaultConfig.connection = {
          host: '',
          port: 5432,
          database: '',
          username: '',
          password: '',
        };
        break;
      case ConnectorType.MONGODB:
        defaultConfig.connection = {
          url: '',
          database: '',
        };
        break;
      case ConnectorType.REST_API:
      case ConnectorType.GRAPHQL:
        defaultConfig.connection = {
          url: '',
          apiKey: '',
        };
        break;
      case ConnectorType.CSV:
      case ConnectorType.EXCEL:
        defaultConfig.connection = {
          file: '',
        };
        break;
    }
    
    setConfig(defaultConfig);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 p-4 rounded-md text-red-500">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 p-4 rounded-md text-green-500">
            {success}
          </div>
        )}
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            连接器名称
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
            连接器类型
          </label>
          <select
            id="type"
            value={type}
            onChange={handleTypeChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            {connectorTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-3">连接配置</h3>
          
          {(type === ConnectorType.MYSQL || type === ConnectorType.POSTGRESQL) && (
            <>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="host" className="block text-sm font-medium text-gray-700 mb-1">
                    主机
                  </label>
                  <input
                    type="text"
                    id="host"
                    value={config.connection.host || ''}
                    onChange={(e) => setConfig({
                      ...config,
                      connection: { ...config.connection, host: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="port" className="block text-sm font-medium text-gray-700 mb-1">
                    端口
                  </label>
                  <input
                    type="number"
                    id="port"
                    value={config.connection.port || ''}
                    onChange={(e) => setConfig({
                      ...config,
                      connection: { ...config.connection, port: parseInt(e.target.value) }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="database" className="block text-sm font-medium text-gray-700 mb-1">
                  数据库名
                </label>
                <input
                  type="text"
                  id="database"
                  value={config.connection.database || ''}
                  onChange={(e) => setConfig({
                    ...config,
                    connection: { ...config.connection, database: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    用户名
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={config.connection.username || ''}
                    onChange={(e) => setConfig({
                      ...config,
                      connection: { ...config.connection, username: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    密码
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={config.connection.password || ''}
                    onChange={(e) => setConfig({
                      ...config,
                      connection: { ...config.connection, password: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            </>
          )}
          
          {type === ConnectorType.MONGODB && (
            <>
              <div className="mb-4">
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                  连接URL
                </label>
                <input
                  type="text"
                  id="url"
                  value={config.connection.url || ''}
                  onChange={(e) => setConfig({
                    ...config,
                    connection: { ...config.connection, url: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="mongodb://username:password@host:port"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="database" className="block text-sm font-medium text-gray-700 mb-1">
                  数据库名
                </label>
                <input
                  type="text"
                  id="database"
                  value={config.connection.database || ''}
                  onChange={(e) => setConfig({
                    ...config,
                    connection: { ...config.connection, database: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </>
          )}
          
          {(type === ConnectorType.REST_API || type === ConnectorType.GRAPHQL) && (
            <>
              <div className="mb-4">
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                  API URL
                </label>
                <input
                  type="text"
                  id="url"
                  value={config.connection.url || ''}
                  onChange={(e) => setConfig({
                    ...config,
                    connection: { ...config.connection, url: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
                  API Key (可选)
                </label>
                <input
                  type="text"
                  id="apiKey"
                  value={config.connection.apiKey || ''}
                  onChange={(e) => setConfig({
                    ...config,
                    connection: { ...config.connection, apiKey: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </>
          )}
          
          {(type === ConnectorType.CSV || type === ConnectorType.EXCEL) && (
            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
                文件路径或URL
              </label>
              <input
                type="text"
                id="file"
                value={config.connection.file || ''}
                onChange={(e) => setConfig({
                  ...config,
                  connection: { ...config.connection, file: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          )}
        </div>
        
        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/connectors')}
          >
            返回
          </Button>
          
          <Button
            type="submit"
            disabled={loading}
          >
            {loading ? '保存中...' : (connectorId ? '更新连接器' : '创建连接器')}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ConnectorForm; 