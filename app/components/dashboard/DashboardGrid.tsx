'use client';

import React, { useState } from 'react';
import GridLayout, { Layout } from 'react-grid-layout';
import { DashboardComponentConfig } from '@/lib/types';
import Card from '../Card';
import BarChart from '../charts/BarChart';
import LineChart from '../charts/LineChart';
import PieChart from '../charts/PieChart';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

interface DashboardGridProps {
  components: DashboardComponentConfig[];
  onLayoutChange?: (layout: Layout[]) => void;
  isEditable?: boolean;
  className?: string;
}

const DashboardGrid: React.FC<DashboardGridProps> = ({
  components,
  onLayoutChange,
  isEditable = false,
  className = '',
}) => {
  const [layouts, setLayouts] = useState<Layout[]>(
    components.map((component) => ({
      i: component.id,
      x: component.x,
      y: component.y,
      w: component.w,
      h: component.h,
      minW: component.minW || 2,
      minH: component.minH || 2,
    }))
  );

  const handleLayoutChange = (newLayout: Layout[]) => {
    setLayouts(newLayout);
    if (onLayoutChange) {
      onLayoutChange(newLayout);
    }
  };

  // 示例数据
  const chartData = {
    bar: {
      labels: ['一月', '二月', '三月', '四月', '五月', '六月'],
      datasets: [
        {
          label: '销售额',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    },
    line: {
      labels: ['一月', '二月', '三月', '四月', '五月', '六月'],
      datasets: [
        {
          label: '用户增长',
          data: [100, 120, 115, 134, 168, 180],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          tension: 0.2,
        },
      ],
    },
    pie: {
      labels: ['红色', '蓝色', '黄色', '绿色', '紫色'],
      datasets: [
        {
          label: '颜色偏好',
          data: [12, 19, 3, 5, 2],
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
          ],
          borderWidth: 1,
        },
      ],
    },
  };

  const renderComponent = (component: DashboardComponentConfig) => {
    const { type, title, options } = component;

    switch (type) {
      case 'CHART':
        if (options.chartType === 'bar') {
          return <BarChart data={chartData.bar} />;
        } else if (options.chartType === 'line') {
          return <LineChart data={chartData.line} />;
        } else if (options.chartType === 'pie') {
          return <PieChart data={chartData.pie} />;
        }
        return <div>不支持的图表类型: {options.chartType}</div>;
      case 'TABLE':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">名称</th>
                  <th className="px-4 py-2 text-left">值</th>
                  <th className="px-4 py-2 text-left">变化</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2">产品A</td>
                  <td className="px-4 py-2">1,245</td>
                  <td className="px-4 py-2 text-green-600">+12%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">产品B</td>
                  <td className="px-4 py-2">864</td>
                  <td className="px-4 py-2 text-red-600">-5%</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">产品C</td>
                  <td className="px-4 py-2">2,584</td>
                  <td className="px-4 py-2 text-green-600">+25%</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case 'METRIC':
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-sm text-gray-500">{options.label || '指标'}</div>
            <div className="text-3xl font-bold mt-2">{options.value || '128,560'}</div>
            <div className="text-sm text-green-600 mt-1">+14% vs 上月</div>
          </div>
        );
      case 'TEXT':
        return (
          <div className="prose">
            <div dangerouslySetInnerHTML={{ __html: options.content || '<p>文本内容</p>' }} />
          </div>
        );
      default:
        return <div>未知组件类型: {type}</div>;
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <GridLayout
        className="layout"
        layout={layouts}
        cols={12}
        rowHeight={30}
        width={1200}
        onLayoutChange={handleLayoutChange}
        isDraggable={isEditable}
        isResizable={isEditable}
        compactType="vertical"
        margin={[12, 12]}
      >
        {components.map((component) => (
          <div key={component.id}>
            <Card title={component.title} className="h-full">
              <div className="p-2 h-full">
                {renderComponent(component)}
              </div>
            </Card>
          </div>
        ))}
      </GridLayout>
    </div>
  );
};

export default DashboardGrid; 