import { NextRequest, NextResponse } from 'next/server';
import { AIService } from '@/lib/services/aiService';
import { VisualizationService } from '@/lib/viz/visualizationService';
import { DataService } from '@/lib/data/dataService';
import { ChatMessage } from '@/types/chat';

// 初始化服务
const aiService = new AIService();
const vizService = new VisualizationService();
const dataService = new DataService();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, datasetId } = body;
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: '请提供有效的消息数组' },
        { status: 400 }
      );
    }
    
    // 获取最后一条用户消息
    const lastMessage = messages[messages.length - 1];
    const query = lastMessage.content;
    
    // 如果指定了数据集ID，则使用数据服务处理查询
    let dataContext;
    if (datasetId) {
      try {
        const { data, explanation } = await dataService.processNaturalLanguageQuery(
          datasetId,
          query
        );
        dataContext = { data, explanation, datasetId };
      } catch (error) {
        console.error('数据处理失败:', error);
        // 继续处理，但没有数据上下文
      }
    }
    
    // 调用 AI 服务进行处理
    const result = await aiService.processChat(messages, dataContext);
    
    // 返回响应
    return NextResponse.json({
      answer: result.answer,
      visualization: result.visualizationData ? {
        data: result.visualizationData,
        type: result.visualizationType
      } : null,
      suggestedFollowUps: result.suggestedFollowUps || [],
      dataAnalysis: result.dataAnalysis || null,
    });
    
  } catch (error) {
    console.error('处理聊天请求时出错:', error);
    return NextResponse.json(
      { error: '处理请求时出错' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // 提供聊天服务的基本信息
  return NextResponse.json({
    service: 'CircleGod Chat API',
    status: 'available',
    supported_datasets: dataService.getDatasets().map(ds => ({
      id: ds.id,
      name: ds.name,
      description: ds.description,
    })),
  });
} 