import { SafeUser } from './user';

/**
 * 登录请求
 */
export interface LoginRequest {
  /** 邮箱或手机号 */
  account: string;
  /** 密码 */
  password: string;
}

/**
 * 登录响应
 */
export interface LoginResponse {
  /** 用户信息 */
  user?: SafeUser;
  /** 访问令牌 */
  token?: string;
  /** 错误信息 */
  error?: string;
}

/**
 * 注册请求
 */
export interface RegisterRequest {
  /** 邮箱或手机号 */
  account: string;
  /** 验证码 */
  code: string;
  /** 密码 */
  password: string;
  /** 昵称 */
  nickname: string;
}

/**
 * 注册响应
 */
export interface RegisterResponse {
  /** 是否成功 */
  success: boolean;
  /** 用户信息 */
  user?: SafeUser;
  /** 访问令牌 */
  token?: string;
  /** 错误信息 */
  error?: string;
}

/**
 * 发送验证码请求
 */
export interface SendCodeRequest {
  /** 邮箱或手机号 */
  account: string;
  /** 用途 */
  purpose: 'register' | 'login' | 'reset_password';
}

/**
 * 发送验证码响应
 */
export interface SendCodeResponse {
  /** 是否成功 */
  success: boolean;
  /** 错误信息 */
  error?: string;
}

/**
 * 重置密码请求
 */
export interface ResetPasswordRequest {
  /** 邮箱或手机号 */
  account: string;
  /** 验证码 */
  code: string;
  /** 新密码 */
  password: string;
}

/**
 * 重置密码响应
 */
export interface ResetPasswordResponse {
  /** 是否成功 */
  success: boolean;
  /** 错误信息 */
  error?: string;
}

/**
 * API响应
 */
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
} 