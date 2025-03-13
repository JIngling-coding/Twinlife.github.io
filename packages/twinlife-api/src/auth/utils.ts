import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';
import { User } from '../types/user';

/**
 * 生成随机验证码
 */
export function generateCode(length: number = env.code.length): string {
  return Math.random().toString().slice(2, 2 + length);
}

/**
 * 加密密码
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * 验证密码
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * 生成JWT令牌
 */
export function generateToken(user: User): string {
  const payload = {
    sub: user.id,          // JWT标准声明：主题（用户ID）
    email: user.email,     // 自定义声明：邮箱
    phone: user.phone,     // 自定义声明：手机号
    type: 'access_token'   // 自定义声明：令牌类型
  };
  
  const options: SignOptions = {
    expiresIn: parseInt(env.jwt.expiresIn) || '7d',  // 过期时间，支持数字（秒）或时间字符串
    algorithm: 'HS256',                              // 加密算法
    issuer: 'twinlife-api',                         // 签发者
    audience: 'twinlife-client'                      // 接收者
  };
  
  return jwt.sign(payload, env.jwt.secret, options);
}

/**
 * 验证JWT令牌
 */
export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, env.jwt.secret, {
      algorithms: ['HS256'],      // 指定允许的加密算法
      issuer: 'twinlife-api',     // 验证签发者
      audience: 'twinlife-client'  // 验证接收者
    });
  } catch (error) {
    return null;
  }
}

/**
 * 验证邮箱格式
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 验证手机号格式
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phone);
}

/**
 * 验证密码强度
 */
export function isValidPassword(password: string): boolean {
  // 至少8位，包含数字和字母
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
} 