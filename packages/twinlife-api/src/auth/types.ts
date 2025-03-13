/**
 * 注册请求参数
 */
export interface RegisterRequest {
  type: 'email' | 'phone';
  account: string;
  password: string;
  code: string;
}

/**
 * 密码登录请求参数
 */
export interface PasswordLoginRequest {
  account: string; // 邮箱或手机号
  password: string;
}

/**
 * 验证码登录请求参数
 */
export interface CodeLoginRequest {
  account: string; // 邮箱或手机号
  code: string;
}

/**
 * 发送验证码请求参数
 */
export interface SendCodeRequest {
  type: 'email' | 'phone';
  target: string;
  action: 'register' | 'login' | 'reset';
}

/**
 * 重置密码请求参数
 */
export interface ResetPasswordRequest {
  type: 'email' | 'phone';
  target: string;
  code: string;
  newPassword: string;
}

/**
 * 验证重置密码验证码请求参数
 */
export interface VerifyResetCodeRequest {
  type: 'email' | 'phone';
  target: string;
  code: string;
}

/**
 * 登录响应数据
 */
export interface LoginResponse {
  token: string;
  user: {
    id: number;
    email?: string;
    phone?: string;
    nickname: string;
    avatar?: string;
  };
} 