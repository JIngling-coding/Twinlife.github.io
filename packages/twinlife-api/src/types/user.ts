/**
 * 用户信息
 */
export interface User {
  /** 用户ID */
  id: number;
  /** 邮箱 */
  email: string | undefined;
  /** 手机号 */
  phone: string | undefined;
  /** 密码哈希 */
  password: string;
  /** 昵称 */
  nickname: string;
  /** 头像URL */
  avatar: string | undefined;
  /** 创建时间 */
  created_at: Date;
  /** 更新时间 */
  updated_at: Date;
}

/**
 * 安全的用户信息（不包含敏感信息）
 */
export interface SafeUser {
  /** 用户ID */
  id: number;
  /** 邮箱 */
  email?: string;
  /** 手机号 */
  phone?: string;
  /** 昵称 */
  nickname: string;
  /** 头像URL */
  avatar?: string;
  /** 创建时间 */
  created_at: Date;
  /** 更新时间 */
  updated_at: Date;
}

/**
 * 验证码记录
 */
export interface VerificationCode {
  /** 记录ID */
  id: number;
  /** 类型（邮箱/手机号） */
  type: 'email' | 'phone';
  /** 目标（邮箱或手机号） */
  target: string;
  /** 验证码 */
  code: string;
  /** 用途 */
  purpose: 'register' | 'login' | 'reset_password';
  /** 过期时间 */
  expires_at: Date;
  /** 创建时间 */
  created_at: Date;
}

/**
 * 用户会话
 */
export interface UserSession {
  /** 会话ID */
  id: number;
  /** 用户ID */
  user_id: number;
  /** 访问令牌 */
  token: string;
  /** 过期时间 */
  expires_at: Date;
  /** 创建时间 */
  created_at: Date;
  /** 更新时间 */
  updated_at: Date;
}

/**
 * OAuth连接
 */
export interface OAuthConnection {
  /** 连接ID */
  id: number;
  /** 用户ID */
  user_id: number;
  /** 提供商（如：wechat, google, apple） */
  provider: string;
  /** 提供商用户ID */
  provider_user_id: string;
  /** 访问令牌 */
  access_token: string;
  /** 刷新令牌 */
  refresh_token: string | null;
  /** 令牌过期时间 */
  token_expires_at: Date;
  /** 创建时间 */
  created_at: Date;
  /** 更新时间 */
  updated_at: Date;
} 