import { UserSession } from '../types/user';
import { pool } from '../utils/db';
import { RowDataPacket } from 'mysql2';

interface SessionRow extends RowDataPacket, UserSession {}

/**
 * 创建用户会话
 * @param userId 用户ID
 * @param token JWT令牌
 * @returns 创建的会话
 */
export async function createSession(userId: number, token: string): Promise<UserSession> {
  const [result] = await pool.execute(
    'INSERT INTO user_sessions (user_id, token, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))',
    [userId, token]
  );

  const [sessions] = await pool.execute<SessionRow[]>(
    'SELECT * FROM user_sessions WHERE id = ?',
    [(result as any).insertId]
  );

  return sessions[0];
}

/**
 * 获取用户会话
 * @param token JWT令牌
 * @returns 会话对象或null
 */
export async function getSession(token: string): Promise<UserSession | null> {
  const [sessions] = await pool.execute<SessionRow[]>(
    'SELECT * FROM user_sessions WHERE token = ? AND expires_at > NOW()',
    [token]
  );

  return sessions.length > 0 ? sessions[0] : null;
}

/**
 * 删除用户会话
 * @param token JWT令牌
 * @returns 是否成功删除
 */
export async function deleteSession(token: string): Promise<void> {
  await pool.execute(
    'DELETE FROM user_sessions WHERE token = ?',
    [token]
  );
}

/**
 * 清理过期会话
 */
export async function cleanExpiredSessions(): Promise<void> {
  await pool.execute(
    'DELETE FROM user_sessions WHERE expires_at <= NOW()',
    []
  );
} 