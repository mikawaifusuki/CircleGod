import { QueryResult } from '../llm/llmService';

// 图表类型
export type ChartType = 
  | 'line' 
  | 'bar' 
  | 'pie' 
  | 'scatter' 
  | 'area' 
  | 'heatmap' 
  | 'map'
  | 'table';

// 图表配置接口
export interface ChartConfig {
  type: ChartType;
  data: any;
  options?: any;
  theme?: 'light' | 'dark';
  width?: number;
  height?: number;
  animate?: boolean;
  responsive?: boolean;
}

/**
 * 可视化服务 - 处理数据可视化生成
 */
export class VisualizationService {
  /**
   * 从LLM结果生成可视化配置
   * @param result LLM查询结果
   */
  generateVisualization(result: QueryResult): ChartConfig | null {
    if (!result.visualizationData || !result.visualizationType) {
      return null;
    }
    
    // 根据LLM推荐的可视化类型映射到图表类型
    const chartType = this.mapVisualizationType(result.visualizationType);
    if (!chartType) {
      return null;
    }
    
    // 根据图表类型格式化数据
    const formattedData = this.formatDataForChartType(
      chartType, 
      result.visualizationData
    );
    
    // 返回图表配置
    return {
      type: chartType,
      data: formattedData,
      options: this.getDefaultOptionsForType(chartType),
      theme: 'light',
      responsive: true,
      animate: true,
    };
  }
  
  /**
   * 根据数据特征推荐可视化类型
   * @param data 数据
   */
  recommendVisualizationType(data: any): ChartType {
    // 在实际应用中，这里应该有复杂的逻辑来分析数据特征
    // 并推荐最合适的可视化类型
    
    // 简单实现：
    // 1. 如果数据有时间序列，推荐折线图
    // 2. 如果数据是分类比较，推荐柱状图
    // 3. 如果数据是占比，推荐饼图
    // 4. 默认返回表格
    
    if (data.labels && data.labels.length > 0) {
      // 检查标签是否可能是时间序列
      const possibleTimeLabels = data.labels.some((label: string) => 
        /^\d{4}[-/年]?\d{1,2}[-/月]?\d{1,2}日?$/.test(label) ||  // 日期格式 
        /^\d{1,2}[-/月]$/.test(label) ||                      // 月份格式
        /^(一|二|三|四|1|2|3|4)季度$/.test(label) ||          // 季度格式
        /^Q[1-4]$/.test(label)                               // Q格式季度
      );
      
      if (possibleTimeLabels) {
        return 'line';
      }
    }
    
    if (data.datasets && data.datasets.length === 1 && data.datasets[0].data.length <= 10) {
      return 'bar';
    }
    
    if (data.datasets && data.datasets.length === 1 && data.datasets[0].data.length <= 8) {
      const sum = data.datasets[0].data.reduce((a: number, b: number) => a + b, 0);
      const percentages = data.datasets[0].data.map((v: number) => (v / sum) * 100);
      if (percentages.every((p: number) => p >= 1)) { // 每个类别至少占1%
        return 'pie';
      }
    }
    
    if (data.datasets && data.datasets.length >= 2 && 
        data.datasets[0].data.length === data.datasets[1].data.length) {
      return 'scatter';
    }
    
    return 'table';
  }
  
  /**
   * 映射LLM返回的可视化类型到图表类型
   * @param visualizationType LLM返回的可视化类型
   */
  private mapVisualizationType(visualizationType: string): ChartType | null {
    const typeMap: Record<string, ChartType> = {
      '折线图': 'line',
      '柱状图': 'bar',
      '饼图': 'pie',
      '散点图': 'scatter',
      '面积图': 'area',
      '热力图': 'heatmap',
      '地图': 'map',
      '表格': 'table',
      // 英文映射
      'line chart': 'line',
      'bar chart': 'bar',
      'pie chart': 'pie',
      'scatter plot': 'scatter',
      'area chart': 'area',
      'heatmap': 'heatmap',
      'map': 'map',
      'table': 'table',
    };
    
    const normalizedType = visualizationType.toLowerCase();
    for (const [key, value] of Object.entries(typeMap)) {
      if (normalizedType.includes(key.toLowerCase())) {
        return value;
      }
    }
    
    return null;
  }
  
  /**
   * 为不同图表类型格式化数据
   */
  private formatDataForChartType(chartType: ChartType, data: any): any {
    // 数据已经是正确格式，直接返回
    if (data.labels && data.datasets) {
      return data;
    }
    
    switch (chartType) {
      case 'line':
      case 'bar':
        // 转换为标准折线图/柱状图格式
        return this.formatDataForCartesianChart(data);
      
      case 'pie':
        // 转换为标准饼图格式
        return this.formatDataForPieChart(data);
      
      case 'scatter':
        // 转换为标准散点图格式
        return this.formatDataForScatterChart(data);
      
      default:
        // 默认处理
        return data;
    }
  }
  
  /**
   * 格式化笛卡尔坐标系图表数据(折线图、柱状图等)
   */
  private formatDataForCartesianChart(data: any): any {
    // 如果数据已经符合格式要求，直接返回
    if (data.labels && data.datasets) {
      return data;
    }
    
    // 尝试从各种常见格式转换
    // 例如从对象数组转换为图表数据
    if (Array.isArray(data)) {
      if (data.length > 0 && typeof data[0] === 'object') {
        const firstItem = data[0];
        const keys = Object.keys(firstItem);
        
        if (keys.length >= 2) {
          // 假设第一个键是标签，其余是数据系列
          const labelKey = keys[0];
          const dataKeys = keys.slice(1);
          
          const labels = data.map(item => item[labelKey]);
          const datasets = dataKeys.map(key => ({
            label: key,
            data: data.map(item => item[key]),
            // 随机生成颜色(实际应用中应使用主题颜色)
            borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
            backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`,
          }));
          
          return { labels, datasets };
        }
      }
    }
    
    // 默认处理：创建一个空的数据结构
    return {
      labels: ['数据1', '数据2', '数据3', '数据4', '数据5'],
      datasets: [
        {
          label: '系列1',
          data: [0, 0, 0, 0, 0],
          borderColor: '#0ea5e9',
          backgroundColor: 'rgba(14, 165, 233, 0.2)',
        }
      ]
    };
  }
  
  /**
   * 格式化饼图数据
   */
  private formatDataForPieChart(data: any): any {
    // 如果数据已经符合格式要求，直接返回
    if (data.labels && data.datasets && data.datasets[0].data) {
      return data;
    }
    
    // 从对象转换为饼图格式
    if (typeof data === 'object' && !Array.isArray(data)) {
      const labels = Object.keys(data);
      const values = Object.values(data) as number[];
      
      return {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: [
              '#0ea5e9',
              '#8b5cf6',
              '#22c55e',
              '#f59e0b',
              '#ef4444',
              '#06b6d4',
              '#ec4899',
              '#14b8a6'
            ]
          }
        ]
      };
    }
    
    // 默认处理：创建一个空的数据结构
    return {
      labels: ['类别1', '类别2', '类别3', '类别4'],
      datasets: [
        {
          data: [25, 25, 25, 25],
          backgroundColor: [
            '#0ea5e9',
            '#8b5cf6',
            '#22c55e',
            '#f59e0b'
          ]
        }
      ]
    };
  }
  
  /**
   * 格式化散点图数据
   */
  private formatDataForScatterChart(data: any): any {
    // 处理散点图特定格式
    // 在实际应用中，这部分会更复杂
    return data;
  }
  
  /**
   * 获取图表类型的默认配置选项
   */
  private getDefaultOptionsForType(chartType: ChartType): any {
    const commonOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: '数据可视化',
        },
      },
    };
    
    switch (chartType) {
      case 'line':
        return {
          ...commonOptions,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        };
      
      case 'bar':
        return {
          ...commonOptions,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        };
      
      case 'pie':
        return {
          ...commonOptions,
          plugins: {
            ...commonOptions.plugins,
            legend: {
              position: 'right' as const,
            },
          },
        };
      
      case 'scatter':
        return {
          ...commonOptions,
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
            },
            y: {
              beginAtZero: true,
            },
          },
        };
      
      default:
        return commonOptions;
    }
  }
} 