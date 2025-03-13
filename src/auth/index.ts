/**
 * 璁よ瘉鐩稿叧鍔熻兘
 */

import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';

/**
 * 鍝堝笇瀵嗙爜
 * @param password 鍘熷瀵嗙爜
 * @returns 鍝堝笇鍚庣殑瀵嗙爜
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * 楠岃瘉瀵嗙爜
 * @param password 鍘熷瀵嗙爜
 * @param hashedPassword 鍝堝笇鍚庣殑瀵嗙爜
 * @returns 鏄惁鍖归厤
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * 鐢熸垚JWT浠ょ墝
 * @param payload 浠ょ墝璐熻浇
 * @param secret 瀵嗛挜
 * @param expiresIn 杩囨湡鏃堕棿
 * @returns JWT浠ょ墝
 */
export function generateToken(payload: any, secret: string, expiresIn: string | number): string {
  // @ts-ignore
  return jwt.sign(payload, secret, { expiresIn });
}

/**
 * 楠岃瘉JWT浠ょ墝
 * @param token JWT浠ょ墝
 * @param secret 瀵嗛挜
 * @returns 瑙ｇ爜鍚庣殑璐熻浇
 */
export function verifyToken(token: string, secret: string): any {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

/**
 * 鐢熸垚闅忔満楠岃瘉鐮?
 * @param length 楠岃瘉鐮侀暱搴?
 * @returns 闅忔満楠岃瘉鐮?
 */
export function generateVerificationCode(length: number = 6): string {
  return Math.random().toString().substring(2, 2 + length);
} 