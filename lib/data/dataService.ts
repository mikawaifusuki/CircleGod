/**
 * 数据源类型
 */
export type DataSourceType = 'csv' | 'json' | 'api' | 'database' | 'mock';

/**
 * 数据源配置
 */
export interface DataSourceConfig {
  type: DataSourceType;
  name: string;
  connection?: {
    url?: string;
    apiKey?: string;
    credentials?: any;
  };
  options?: any;
}

/**
 * 数据集信息
 */
export interface DatasetInfo {
  id: string;
  name: string;
  description: string;
  source: DataSourceType;
  fields: {
    name: string;
    type: string;
    description?: string;
  }[];
  rowCount: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 查询参数
 */
export interface QueryParams {
  filters?: Record<string, any>;
  sort?: { field: string; order: 'asc' | 'desc' }[];
  limit?: number;
  offset?: number;
  groupBy?: string[];
  aggregations?: {
    field: string;
    function: 'sum' | 'avg' | 'min' | 'max' | 'count';
    alias?: string;
  }[];
}

/**
 * 数据服务 - 负责数据加载和处理
 */
export class DataService {
  private dataSources: Map<string, DataSourceConfig> = new Map();
  private datasets: Map<string, DatasetInfo> = new Map();
  
  /**
   * 初始化数据服务
   */
  constructor() {
    // 添加模拟数据源和数据集(真实应用中这些应该从配置或数据库加载)
    this.initializeMockData();
  }
  
  /**
   * 获取所有数据集信息
   */
  getDatasets(): DatasetInfo[] {
    return Array.from(this.datasets.values());
  }
  
  /**
   * 根据ID获取数据集信息
   */
  getDatasetInfo(datasetId: string): DatasetInfo | undefined {
    return this.datasets.get(datasetId);
  }
  
  /**
   * 查询数据集
   * @param datasetId 数据集ID
   * @param params 查询参数
   */
  async queryDataset(datasetId: string, params: QueryParams = {}): Promise<any[]> {
    const datasetInfo = this.datasets.get(datasetId);
    if (!datasetInfo) {
      throw new Error(`数据集不存在: ${datasetId}`);
    }
    
    // 从数据源加载数据(在真实应用中)
    // 这里返回模拟数据
    return this.getMockDataForDataset(datasetId, params);
  }
  
  /**
   * 处理自然语言查询
   * @param datasetId 数据集ID
   * @param query 自然语言查询
   */
  async processNaturalLanguageQuery(datasetId: string, query: string): Promise<{
    data: any[];
    explanation: string;
    suggestedVisualization?: string;
  }> {
    // 在实际应用中，应该使用LLM来分析自然语言查询
    // 并转换为结构化查询参数
    
    // 模拟响应
    const datasetInfo = this.datasets.get(datasetId);
    if (!datasetInfo) {
      throw new Error(`数据集不存在: ${datasetId}`);
    }
    
    // 基于关键词的简单分析
    let params: QueryParams = {};
    let explanation = '根据您的查询，我提取了以下数据：';
    let suggestedVisualization;
    
    if (query.includes('销售额') || query.includes('营收')) {
      params = {
        groupBy: ['month'],
        aggregations: [{ field: 'sales', function: 'sum', alias: 'totalSales' }]
      };
      explanation = '我已汇总每月的销售总额。';
      suggestedVisualization = '折线图';
    } else if (query.includes('用户增长') || query.includes('用户数')) {
      params = {
        groupBy: ['month'],
        aggregations: [{ field: 'users', function: 'count', alias: 'userCount' }]
      };
      explanation = '我已统计每月的用户数量。';
      suggestedVisualization = '折线图';
    } else if (query.includes('产品销售') || query.includes('商品销量')) {
      params = {
        groupBy: ['product'],
        aggregations: [{ field: 'sales', function: 'sum', alias: 'productSales' }],
        sort: [{ field: 'productSales', order: 'desc' }],
        limit: 5
      };
      explanation = '我已按产品类别汇总销售额，并展示销售额最高的5种产品。';
      suggestedVisualization = '柱状图';
    } else if (query.includes('占比') || query.includes('比例')) {
      params = {
        groupBy: ['category'],
        aggregations: [{ field: 'sales', function: 'sum', alias: 'categorySales' }]
      };
      explanation = '我已计算不同类别的销售额占比。';
      suggestedVisualization = '饼图';
    }
    
    const data = await this.getMockDataForDataset(datasetId, params);
    
    return {
      data,
      explanation,
      suggestedVisualization
    };
  }
  
  /**
   * 初始化模拟数据
   */
  private initializeMockData() {
    // 添加模拟数据源
    const mockSource: DataSourceConfig = {
      type: 'mock',
      name: '模拟数据源',
    };
    this.dataSources.set('mock1', mockSource);
    
    // 添加模拟数据集
    const salesDataset: DatasetInfo = {
      id: 'sales2025',
      name: '2025年销售数据',
      description: '包含产品销售、地区、客户等信息的销售数据',
      source: 'mock',
      fields: [
        { name: 'date', type: 'date', description: '销售日期' },
        { name: 'month', type: 'string', description: '销售月份' },
        { name: 'product', type: 'string', description: '产品名称' },
        { name: 'category', type: 'string', description: '产品类别' },
        { name: 'region', type: 'string', description: '销售地区' },
        { name: 'sales', type: 'number', description: '销售额' },
        { name: 'quantity', type: 'number', description: '销售数量' },
      ],
      rowCount: 1200,
      createdAt: new Date('2025-01-01'),
      updatedAt: new Date('2025-04-28'),
    };
    
    const userDataset: DatasetInfo = {
      id: 'users2025',
      name: '用户数据分析',
      description: '用户活动、注册和行为数据',
      source: 'mock',
      fields: [
        { name: 'date', type: 'date', description: '日期' },
        { name: 'month', type: 'string', description: '月份' },
        { name: 'userId', type: 'string', description: '用户ID' },
        { name: 'userType', type: 'string', description: '用户类型' },
        { name: 'region', type: 'string', description: '地区' },
        { name: 'device', type: 'string', description: '设备类型' },
        { name: 'sessionCount', type: 'number', description: '会话数' },
        { name: 'activeMinutes', type: 'number', description: '活跃分钟数' },
        { name: 'purchaseCount', type: 'number', description: '购买次数' },
      ],
      rowCount: 5000,
      createdAt: new Date('2025-01-15'),
      updatedAt: new Date('2025-04-20'),
    };
    
    this.datasets.set(salesDataset.id, salesDataset);
    this.datasets.set(userDataset.id, userDataset);
  }
  
  /**
   * 获取模拟数据集的数据
   */
  private getMockDataForDataset(datasetId: string, params: QueryParams): any[] {
    switch (datasetId) {
      case 'sales2025':
        return this.getMockSalesData(params);
      case 'users2025':
        return this.getMockUserData(params);
      default:
        return [];
    }
  }
  
  /**
   * 获取模拟销售数据
   */
  private getMockSalesData(params: QueryParams): any[] {
    // 销售数据的模拟数据生成
    if (params.groupBy?.includes('month')) {
      // 按月份分组的销售数据
      return [
        { month: '1月', totalSales: 125000, growth: null },
        { month: '2月', totalSales: 145000, growth: 16.0 },
        { month: '3月', totalSales: 165000, growth: 13.8 },
        { month: '4月', totalSales: 185000, growth: 12.1 },
        { month: '5月', totalSales: 195000, growth: 5.4 },
        { month: '6月', totalSales: 210000, growth: 7.7 }
      ];
    } else if (params.groupBy?.includes('product')) {
      // 按产品分组的销售数据
      return [
        { product: '产品A', productSales: 450000 },
        { product: '产品B', productSales: 350000 },
        { product: '产品C', productSales: 200000 },
        { product: '产品D', productSales: 120000 },
        { product: '产品E', productSales: 80000 }
      ];
    } else if (params.groupBy?.includes('category')) {
      // 按类别分组的销售数据
      return [
        { category: '电子产品', categorySales: 500000 },
        { category: '家居用品', categorySales: 300000 },
        { category: '办公用品', categorySales: 200000 },
        { category: '食品饮料', categorySales: 100000 }
      ];
    } else if (params.groupBy?.includes('region')) {
      // 按地区分组的销售数据
      return [
        { region: '华东', regionSales: 400000 },
        { region: '华北', regionSales: 300000 },
        { region: '华南', regionSales: 250000 },
        { region: '西部', regionSales: 150000 },
        { region: '其他', regionSales: 50000 }
      ];
    } else {
      // 默认返回一些示例数据
      return [
        { month: '1月', product: '产品A', sales: 50000, quantity: 500 },
        { month: '1月', product: '产品B', sales: 35000, quantity: 300 },
        { month: '2月', product: '产品A', sales: 60000, quantity: 600 },
        { month: '2月', product: '产品B', sales: 40000, quantity: 350 },
        { month: '3月', product: '产品A', sales: 70000, quantity: 700 },
        { month: '3月', product: '产品B', sales: 45000, quantity: 400 }
      ];
    }
  }
  
  /**
   * 获取模拟用户数据
   */
  private getMockUserData(params: QueryParams): any[] {
    // 用户数据的模拟数据生成
    if (params.groupBy?.includes('month')) {
      // 按月份分组的用户数据
      return [
        { month: '1月', userCount: 1200, activeUsers: 900, retention: 75 },
        { month: '2月', userCount: 1450, activeUsers: 1100, retention: 76 },
        { month: '3月', userCount: 1780, activeUsers: 1350, retention: 76 },
        { month: '4月', userCount: 1900, activeUsers: 1450, retention: 76 },
        { month: '5月', userCount: 2100, activeUsers: 1600, retention: 76 },
        { month: '6月', userCount: 2350, activeUsers: 1800, retention: 77 }
      ];
    } else if (params.groupBy?.includes('device')) {
      // 按设备类型分组的用户数据
      return [
        { device: '移动端', deviceUsers: 3500, percentage: 70 },
        { device: '桌面端', deviceUsers: 1200, percentage: 24 },
        { device: '平板', deviceUsers: 300, percentage: 6 }
      ];
    } else if (params.groupBy?.includes('userType')) {
      // 按用户类型分组的数据
      return [
        { userType: '新用户', typeCount: 950, percentage: 40 },
        { userType: '回访用户', typeCount: 700, percentage: 30 },
        { userType: '忠诚用户', typeCount: 500, percentage: 21 },
        { userType: 'VIP用户', typeCount: 200, percentage: 9 }
      ];
    } else {
      // 默认返回一些示例数据
      return [
        { month: '1月', userType: '新用户', activeMinutes: 25, sessionCount: 3 },
        { month: '1月', userType: '忠诚用户', activeMinutes: 45, sessionCount: 5 },
        { month: '2月', userType: '新用户', activeMinutes: 22, sessionCount: 3 },
        { month: '2月', userType: '忠诚用户', activeMinutes: 48, sessionCount: 6 },
        { month: '3月', userType: '新用户', activeMinutes: 26, sessionCount: 3 },
        { month: '3月', userType: '忠诚用户', activeMinutes: 52, sessionCount: 6 }
      ];
    }
  }
} 