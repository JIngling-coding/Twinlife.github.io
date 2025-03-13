import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '7d';

/**
 * 生成访问令牌
 * @param userId 用户ID
 * @returns JWT令牌
 */
export function generateToken(userId: number): string {
  return jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

/**
 * 验证访问令牌
 * @param token JWT令牌
 * @returns 用户ID
 */
export async function verifyToken(token: string): Promise<number> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) reject(err);
      else resolve((decoded as any).userId);
    });
  });
} 