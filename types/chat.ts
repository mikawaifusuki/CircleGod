/**
 * 聊天消息的角色
 */
export type ChatRole = 'user' | 'assistant' | 'system';

/**
 * 聊天消息
 */
export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: Date;
}

/**
 * 聊天会话
 */
export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 可视化数据
 */
export interface VisualizationData {
  type: string;
  data: any;
  config?: any;
}

/**
 * 带有可视化的聊天消息
 */
export interface VisualizationMessage extends ChatMessage {
  visualizations?: VisualizationData[];
}

/**
 * 创建聊天消息的参数
 */
export interface CreateMessageParams {
  role: ChatRole;
  content: string;
}

/**
 * 创建聊天会话的参数
 */
export interface CreateSessionParams {
  title: string;
  initialSystemMessage?: string;
} 