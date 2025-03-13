/**
 * 认证相关功能
 */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * 哈希密码
 * @param password 原始密码
 * @returns 哈希后的密码
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * 验证密码
 * @param password 原始密码
 * @param hashedPassword 哈希后的密码
 * @returns 是否匹配
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * 生成JWT令牌
 * @param payload 令牌负载
 * @param secret 密钥
 * @param expiresIn 过期时间
 * @returns JWT令牌
 */
export function generateToken(payload: Record<string, any>, secret: string, expiresIn: string): string {
  return jwt.sign(payload, secret, { expiresIn });
}

/**
 * 验证JWT令牌
 * @param token JWT令牌
 * @param secret 密钥
 * @returns 解码后的负载
 */
export function verifyToken(token: string, secret: string): jwt.JwtPayload | null {
  try {
    return jwt.verify(token, secret) as jwt.JwtPayload;
  } catch (error) {
    return null;
  }
}

/**
 * 生成随机验证码
 * @param length 验证码长度
 * @returns 随机验证码
 */
export function generateVerificationCode(length: number = 6): string {
  return Math.random().toString().substring(2, 2 + length);
} 