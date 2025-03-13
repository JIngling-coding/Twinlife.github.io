import bcrypt from 'bcryptjs';

/**
 * 加密密码
 * @param password 原始密码
 * @returns 加密后的密码哈希
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * 验证密码
 * @param password 原始密码
 * @param hash 密码哈希
 * @returns 是否匹配
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
} 