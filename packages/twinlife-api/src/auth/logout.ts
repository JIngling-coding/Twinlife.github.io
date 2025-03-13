import { ApiResponse } from '../types/auth';
import { deleteSession } from './session';
import { pool } from '../utils/db';

/**
 * 用户登出
 * @param token JWT令牌
 * @returns 处理结果
 */
export async function logout(token: string): Promise<ApiResponse<void>> {
  try {
    await deleteSession(token);

    return {
      success: true,
      message: '登出成功'
    };
  } catch (error) {
    console.error('登出失败:', error);
    return {
      success: false,
      message: '登出失败'
    };
  }
}

/**
 * 处理注销请求
 */
export async function handleLogout(token: string): Promise<ApiResponse<void>> {
  try {
    const [result] = await pool.execute(
      'DELETE FROM user_sessions WHERE token = ?',
      [token]
    );

    const success = (result as any).affectedRows > 0;
    return {
      success,
      message: success ? '注销成功' : '注销失败'
    };
  } catch (err) {
    console.error('注销失败:', err);
    return {
      success: false,
      message: '注销失败，请稍后重试'
    };
  }
} 