/**
 * API响应格式
 */
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data?: T;
}

/**
 * 成功响应
 * @param data 响应数据
 * @param message 响应消息
 */
export function success<T>(data?: T, message: string = '操作成功'): ApiResponse<T> {
  return {
    code: 0,
    message,
    data
  };
}

/**
 * 错误响应
 * @param message 错误消息
 * @param code 错误码
 */
export function error(message: string, code: number = 500): ApiResponse {
  return {
    code,
    message
  };
}

/**
 * 错误码定义
 */
export const ErrorCode = {
  // HTTP标准错误码
  PARAM_ERROR: 400,      // 请求参数错误
  UNAUTHORIZED: 401,     // 未授权
  FORBIDDEN: 403,        // 禁止访问
  NOT_FOUND: 404,        // 资源不存在
  INTERNAL_ERROR: 500,   // 服务器内部错误
  
  // 用户相关错误码 (1000-1999)
  USER_NOT_FOUND: 1001,  // 用户不存在
  USER_EXISTS: 1002,     // 用户已存在
  PASSWORD_ERROR: 1003,  // 密码错误
  CODE_ERROR: 1004,      // 验证码错误
  CODE_EXPIRED: 1005,    // 验证码过期
  
  // 会话相关错误码 (2000-2999)
  TOKEN_EXPIRED: 2001,   // 令牌过期
  TOKEN_INVALID: 2002,   // 令牌无效
  SESSION_EXPIRED: 2003, // 会话过期
  
  // 权限相关错误码 (3000-3999)
  NO_PERMISSION: 3001,   // 没有权限
  
  // 业务相关错误码 (4000-4999)
  OPERATION_FAILED: 4001 // 操作失败
}; 