/**
 * AI 配置和类型定义
 */

/**
 * AI 提供商枚举
 */
export enum AIProvider {
  OPENAI = "openai",
  ANTHROPIC = "anthropic",
  GEMINI = "gemini",
}

/**
 * AI 配置接口
 */
export interface AIConfig {
  /** AI 提供商 */
  provider: AIProvider;
  /** API 密钥 */
  apiKey: string;
  /** 使用的模型 */
  model: string;
  /** API 基础 URL（可选，用于自定义端点） */
  baseURL?: string;
}

/**
 * 消息角色
 */
export type MessageRole = "system" | "user" | "assistant";

/**
 * AI 消息接口
 */
export interface AIMessage {
  /** 消息角色 */
  role: MessageRole;
  /** 消息内容 */
  content: string;
}

/**
 * AI 响应接口
 */
export interface AIResponse {
  /** 响应内容 */
  content: string;
  /** 是否成功 */
  success: boolean;
  /** 错误信息（如果失败） */
  error?: string;
}

/**
 * 每个 AI 提供商的默认模型
 */
export const DEFAULT_MODELS: Record<AIProvider, string[]> = {
  [AIProvider.OPENAI]: [
    "gpt-4o",
    "gpt-4o-mini",
    "gpt-4-turbo",
    "gpt-3.5-turbo",
  ],
  [AIProvider.ANTHROPIC]: [
    "claude-3-5-sonnet-20241022",
    "claude-3-5-haiku-20241022",
    "claude-3-opus-20240229",
  ],
  [AIProvider.GEMINI]: [
    "gemini-2.0-flash-exp",
    "gemini-1.5-pro",
    "gemini-1.5-flash",
  ],
};

/**
 * 提供商显示名称
 */
/**
 * 提供商显示名称
 */
export const PROVIDER_NAMES: Record<AIProvider, string> = {
  [AIProvider.OPENAI]: "OpenAI / Compatible (DeepSeek etc.)",
  [AIProvider.ANTHROPIC]: "Anthropic / Claude",
  [AIProvider.GEMINI]: "Google Gemini",
};
