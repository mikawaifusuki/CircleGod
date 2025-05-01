'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/app/components/Card';
import Button from '@/app/components/Button';
import { DashboardComponentConfig } from '@/lib/types';

interface AIDashboardGeneratorProps {
  onComponentsGenerated: (components: DashboardComponentConfig[]) => void;
}

const AIDashboardGenerator: React.FC<AIDashboardGeneratorProps> = ({
  onComponentsGenerated,
}) => {
  const [dataDescription, setDataDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generationComplete, setGenerationComplete] = useState<boolean>(false);
  
  // 示例数据模板
  const dataTemplates = [
    {
      name: '销售数据',
      description: '按季度和产品类别划分的销售数据，包括收入、销量和利润率',
      sample: {
        quarters: ['Q1', 'Q2', 'Q3', 'Q4'],
        categories: ['电子产品', '家居用品', '服装', '食品'],
        revenue: [250000, 310000, 290000, 380000],
        units: [1200, 1450, 1350, 1800],
        profit_margin: [0.15, 0.18, 0.16, 0.21]
      }
    },
    {
      name: '用户行为',
      description: '网站用户行为数据，包括访问量、停留时间、转化率和跳出率',
      sample: {
        months: ['一月', '二月', '三月', '四月', '五月', '六月'],
        visits: [12500, 13200, 15800, 16400, 18900, 17500],
        avg_time: [2.3, 2.5, 2.8, 2.6, 3.0, 2.9],
        conversion: [0.032, 0.035, 0.041, 0.038, 0.045, 0.042],
        bounce_rate: [0.58, 0.54, 0.49, 0.51, 0.47, 0.48]
      }
    },
    {
      name: '财务报表',
      description: '包含收入、支出、利润和现金流的财务数据',
      sample: {
        months: ['一月', '二月', '三月', '四月', '五月', '六月'],
        revenue: [850000, 920000, 880000, 1050000, 1120000, 1080000],
        expenses: [520000, 540000, 510000, 580000, 620000, 590000],
        profit: [330000, 380000, 370000, 470000, 500000, 490000],
        cash_flow: [290000, 350000, 320000, 430000, 460000, 450000]
      }
    }
  ];
  
  // 选择数据模板
  const [selectedTemplate, setSelectedTemplate] = useState<number>(-1);
  const [data, setData] = useState<any>(null);
  
  const handleTemplateSelect = (index: number) => {
    setSelectedTemplate(index);
    setData(dataTemplates[index].sample);
    setDataDescription(dataTemplates[index].description);
  };
  
  // 生成组件
  const handleGenerate = async () => {
    if (!data || !dataDescription.trim()) {
      setError('请提供数据描述和选择数据模板');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/dashboards/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data,
          dataDescription,
          count: 5,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`生成失败: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success && result.components) {
        onComponentsGenerated(result.components);
        setGenerationComplete(true);
      } else {
        // 即使非成功，如果返回了备用组件，也使用它们
        if (result.components) {
          onComponentsGenerated(result.components);
          setGenerationComplete(true);
        } else {
          setError(result.message || '生成组件失败');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成仪表盘组件时出错');
    } finally {
      setLoading(false);
    }
  };
  
  // 重新开始
  const handleReset = () => {
    setData(null);
    setDataDescription('');
    setSelectedTemplate(-1);
    setGenerationComplete(false);
    setError(null);
  };
  
  if (generationComplete) {
    return (
      <Card className="p-6 mb-6">
        <div className="text-center">
          <h3 className="text-lg font-medium text-green-600 mb-4">仪表盘组件已生成！</h3>
          <p className="mb-4">您可以在下方预览和编辑这些组件。</p>
          <Button onClick={handleReset}>
            重新生成
          </Button>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">AI 仪表盘生成助手</h2>
      <p className="text-gray-500 mb-6">
        描述您的数据和需求，我们的AI将为您生成最合适的仪表盘组件。
      </p>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          选择数据模板
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dataTemplates.map((template, index) => (
            <div 
              key={index}
              className={`border rounded-lg p-4 cursor-pointer transition ${
                selectedTemplate === index 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => handleTemplateSelect(index)}
            >
              <h3 className="font-medium mb-2">{template.name}</h3>
              <p className="text-sm text-gray-500">{template.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          数据描述
        </label>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          rows={4}
          value={dataDescription}
          onChange={(e) => setDataDescription(e.target.value)}
          placeholder="描述您的数据和分析需求，例如：'销售数据包含过去12个月的产品类别销售情况，需要展示趋势和类别对比'"
        />
      </div>
      
      {selectedTemplate !== -1 && (
        <div className="mb-6 bg-gray-50 p-4 rounded-md">
          <h3 className="text-sm font-medium text-gray-700 mb-2">样例数据预览</h3>
          <pre className="text-xs overflow-x-auto p-2 bg-gray-100 rounded">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
      
      {error && (
        <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}
      
      <div className="flex justify-end">
        <Button 
          variant="outline" 
          className="mr-2"
          onClick={handleReset}
        >
          重置
        </Button>
        <Button 
          onClick={handleGenerate}
          disabled={loading || !data}
        >
          {loading ? '生成中...' : '生成仪表盘组件'}
        </Button>
      </div>
    </Card>
  );
};

export default AIDashboardGenerator; 