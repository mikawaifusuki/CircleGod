import { ChatMessage } from '@/types/chat';

// LLM配置类型
interface LLMConfig {
  apiKey: string;
  model: string;
  temperature: number;
  maxTokens: number;
}

// 默认LLM配置
const defaultConfig: LLMConfig = {
  apiKey: process.env.OPENAI_API_KEY || '',
  model: 'gpt-4',
  temperature: 0.7,
  maxTokens: 2000,
};

// 查询处理结果类型
export interface QueryResult {
  answer: string;
  visualizationData?: any;
  visualizationType?: string;
  dataAnalysis?: any;
  suggestedFollowUps?: string[];
  error?: string;
}

/**
 * LLM服务类 - 处理与LLM的交互
 */
export class LLMService {
  private config: LLMConfig;
  
  constructor(config: Partial<LLMConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
  }
  
  /**
   * 发送查询到LLM
   * @param messages 聊天消息历史
   * @param context 数据上下文(可选)
   */
  async sendQuery(messages: ChatMessage[], context?: any): Promise<QueryResult> {
    try {
      // 这里实际应该调用OpenAI API
      // 由于这是演示，我们返回模拟数据
      return this.getMockResponse(messages);
    } catch (error) {
      console.error('LLM查询失败:', error);
      return {
        answer: '抱歉，我在处理您的请求时遇到了问题。请再试一次。',
        error: error instanceof Error ? error.message : '未知错误',
      };
    }
  }
  
  /**
   * 分析用户查询的意图
   * @param query 用户查询
   */
  analyzeQueryIntent(query: string): {
    dataOperation?: string;
    timeRange?: string;
    entities?: string[];
    visualization?: string;
  } {
    // 这里应该实现意图分析逻辑
    // 在实际项目中，这可能是一个复杂的NLP任务
    // 演示返回一个简单分析
    const hasTimeRange = /过去|最近|上个月|本周|今年|(\d+\s*(天|周|月|年))/i.test(query);
    const needsVisualization = /图表|可视化|趋势|图形|展示/i.test(query);
    
    const visualizationTypes = [
      { name: '折线图', keywords: ['趋势', '变化', '走势'] },
      { name: '柱状图', keywords: ['比较', '排名', '对比'] },
      { name: '饼图', keywords: ['占比', '分布', '构成'] },
      { name: '散点图', keywords: ['关系', '相关性', '分布'] },
    ];
    
    let visualization;
    for (const type of visualizationTypes) {
      if (type.keywords.some(keyword => query.includes(keyword))) {
        visualization = type.name;
        break;
      }
    }
    
    return {
      dataOperation: this.detectDataOperation(query),
      timeRange: hasTimeRange ? '提取的时间范围' : undefined,
      entities: this.extractEntities(query),
      visualization: needsVisualization ? visualization || '推荐可视化类型' : undefined,
    };
  }
  
  /**
   * 检测查询中的数据操作类型
   */
  private detectDataOperation(query: string): string {
    if (/分析|洞察|了解|查看/.test(query)) return '分析';
    if (/预测|预估|估计|未来/.test(query)) return '预测';
    if (/对比|比较|差异|区别/.test(query)) return '比较';
    if (/总结|概括|汇总/.test(query)) return '汇总';
    return '查询';
  }
  
  /**
   * 从查询中提取实体
   */
  private extractEntities(query: string): string[] {
    // 简化版实体提取
    // 实际项目中，应该使用更复杂的NER模型
    const entities = [];
    const patterns = [
      /销售额?/,
      /用户/,
      /客户/,
      /产品/,
      /收入/,
      /利润/,
      /成本/,
    ];
    
    for (const pattern of patterns) {
      if (pattern.test(query)) {
        entities.push(pattern.toString().replace(/[/\\^$*+?.()|[\]{}]/g, ''));
      }
    }
    
    return entities;
  }
  
  /**
   * 获取模拟响应(仅用于演示)
   */
  private getMockResponse(messages: ChatMessage[]): QueryResult {
    // 获取最后一条用户消息
    const lastMessage = messages[messages.length - 1];
    const query = lastMessage.content.toLowerCase();
    
    // 用户增长趋势的模拟响应
    if (query.includes('用户增长') || query.includes('用户趋势')) {
      return {
        answer: '根据分析，过去6个月用户增长呈现稳定上升趋势，平均月增长率为15.8%。3月份增长最为显著，达到22.5%。',
        visualizationType: '折线图',
        visualizationData: {
          labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
          datasets: [
            {
              label: '用户数',
              data: [1200, 1450, 1780, 1900, 2100, 2350],
              borderColor: '#0ea5e9',
              backgroundColor: 'rgba(14, 165, 233, 0.2)',
            },
            {
              label: '增长率',
              data: [null, 20.8, 22.5, 6.7, 10.5, 11.9],
              borderColor: '#8b5cf6',
              backgroundColor: 'rgba(139, 92, 246, 0.2)',
            }
          ]
        },
        dataAnalysis: {
          trend: '上升',
          averageGrowth: '15.8%',
          highestGrowth: {
            month: '3月',
            rate: '22.5%'
          },
          lowestGrowth: {
            month: '4月',
            rate: '6.7%'
          }
        },
        suggestedFollowUps: [
          '按地区细分用户增长情况',
          '分析用户留存率',
          '预测未来3个月的用户增长'
        ]
      };
    }
    
    // 销售数据的模拟响应
    if (query.includes('销售') || query.includes('营收')) {
      return {
        answer: '过去季度的销售数据显示，产品A的销售额占总销售额的42%，是表现最好的产品。整体销售额比上一季度增长了15%。',
        visualizationType: '饼图',
        visualizationData: {
          labels: ['产品A', '产品B', '产品C', '产品D'],
          datasets: [
            {
              data: [42, 28, 18, 12],
              backgroundColor: [
                '#0ea5e9',
                '#8b5cf6',
                '#22c55e',
                '#f59e0b'
              ]
            }
          ]
        },
        dataAnalysis: {
          topProduct: {
            name: '产品A',
            percentage: '42%'
          },
          quarterlyGrowth: '15%',
          bottomProduct: {
            name: '产品D',
            percentage: '12%'
          }
        },
        suggestedFollowUps: [
          '分析产品A的成功因素',
          '查看销售趋势的月度变化',
          '比较不同地区的销售表现'
        ]
      };
    }
    
    // 默认响应
    return {
      answer: '我理解您的问题，但需要更多具体信息才能提供详细分析。您可以询问有关销售数据、用户增长、产品性能等方面的问题。',
      suggestedFollowUps: [
        '分析过去30天的销售趋势',
        '查看用户增长情况',
        '分析产品性能数据',
        '预测下个季度的收入'
      ]
    };
  }
} 