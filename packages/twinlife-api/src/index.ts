/**
 * Twinlife API客户端
 */

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

/**
 * API客户端配置
 */
export interface ApiClientConfig {
  /**
   * API基础URL
   */
  baseURL: string;
  
  /**
   * 超时时间（毫秒）
   */
  timeout?: number;
  
  /**
   * 默认请求头
   */
  headers?: Record<string, string>;
}

/**
 * Twinlife API客户端
 */
export class TwinlifeApiClient {
  private client: AxiosInstance;
  private token: string | null = null;
  
  /**
   * 创建API客户端
   * @param config 客户端配置
   */
  constructor(config: ApiClientConfig) {
    this.client = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 10000,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers
      }
    });
    
    // 请求拦截器：添加认证令牌
    this.client.interceptors.request.use(config => {
      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }
      return config;
    });
  }
  
  /**
   * 设置认证令牌
   * @param token JWT令牌
   */
  setToken(token: string): void {
    this.token = token;
  }
  
  /**
   * 清除认证令牌
   */
  clearToken(): void {
    this.token = null;
  }
  
  /**
   * 发送验证码
   * @param target 目标（邮箱或手机号）
   * @param type 类型（email或sms）
   */
  async sendVerificationCode(target: string, type: 'email' | 'sms') {
    return this.client.post('/auth/code', { target, type });
  }
  
  /**
   * 用户注册
   * @param data 注册数据
   */
  async register(data: {
    email: string;
    password: string;
    code: string;
    nickname?: string;
  }) {
    return this.client.post('/auth/register', data);
  }
  
  /**
   * 用户登录
   * @param data 登录数据
   */
  async login(data: {
    account: string;
    password: string;
  }) {
    const response = await this.client.post('/auth/login', data);
    if (response.data.success && response.data.token) {
      this.setToken(response.data.token);
    }
    return response;
  }
  
  /**
   * 用户登出
   */
  async logout() {
    const response = await this.client.post('/auth/logout');
    if (response.data.success) {
      this.clearToken();
    }
    return response;
  }
  
  /**
   * 重置密码
   * @param data 重置密码数据
   */
  async resetPassword(data: {
    account: string;
    code: string;
    password: string;
  }) {
    return this.client.post('/auth/reset-password', data);
  }
}

// 导出默认实例
export default TwinlifeApiClient; 