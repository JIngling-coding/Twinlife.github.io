import { ResetPasswordRequest, SendCodeRequest, VerifyResetCodeRequest } from './types';
import { query, execute } from '../db/connection';
import { generateCode, hashPassword, isValidEmail, isValidPhone, isValidPassword } from './utils';
import { success, error, ErrorCode } from '../utils/response';
import { env } from '../config/env';
import { User, VerificationCode } from '../types/user';
import { createQueryParams } from '../utils/type-guards';
import { sendVerificationEmail } from '../utils/mailer';
import { sendVerificationSMS } from '../utils/sms';
import { verificationManager } from '../utils/verification';
import { ResetPasswordResponse } from '../types/auth';
import { pool } from '../utils/db';
import { RowDataPacket } from 'mysql2';

/**
 * 发送重置密码验证码
 */
export async function sendResetCode(event: { body: string }) {
  try {
    const { type, target }: SendCodeRequest = JSON.parse(event.body);
    
    // 验证参数
    if (!type || !target) {
      return error('参数不完整', ErrorCode.PARAM_ERROR);
    }
    
    // 验证格式
    if (type === 'email' && !isValidEmail(target)) {
      return error('邮箱格式不正确', ErrorCode.PARAM_ERROR);
    }
    if (type === 'phone' && !isValidPhone(target)) {
      return error('手机号格式不正确', ErrorCode.PARAM_ERROR);
    }
    
    // 检查用户是否存在
    const users = await query<User>(
      `SELECT id FROM users WHERE ${type} = ?`,
      createQueryParams(target)
    );
    if (users.length === 0) {
      return error(`该${type === 'email' ? '邮箱' : '手机号'}未注册`, ErrorCode.USER_NOT_FOUND);
    }
    
    // 生成验证码
    const code = generateCode();
    const expiresAt = new Date(Date.now() + env.code.expiresIn * 1000);
    
    // 保存验证码
    await execute(
      'INSERT INTO verification_codes (type, target, code, expires_at, purpose) VALUES (?, ?, ?, ?, ?)',
      createQueryParams(type, target, code, expiresAt, 'reset_password')
    );
    
    // 发送验证码
    if (type === 'email') {
      await sendVerificationEmail(target, code);
    } else {
      await sendVerificationSMS(target, code);
    }
    
    return success(null, '验证码已发送');
  } catch (error: any) {
    console.error('发送重置密码验证码失败:', error);
    return error(error.message);
  }
}

/**
 * 验证重置密码验证码
 */
export async function verifyResetCode(event: { body: string }) {
  try {
    const { type, target, code }: VerifyResetCodeRequest = JSON.parse(event.body);
    
    // 验证参数
    if (!type || !target || !code) {
      return error('参数不完整', ErrorCode.PARAM_ERROR);
    }
    
    // 验证格式
    if (type === 'email' && !isValidEmail(target)) {
      return error('邮箱格式不正确', ErrorCode.PARAM_ERROR);
    }
    if (type === 'phone' && !isValidPhone(target)) {
      return error('手机号格式不正确', ErrorCode.PARAM_ERROR);
    }
    
    // 验证验证码
    const codes = await query<VerificationCode>(
      'SELECT * FROM verification_codes WHERE type = ? AND target = ? AND code = ? AND purpose = ? AND expires_at > NOW() ORDER BY id DESC LIMIT 1',
      createQueryParams(type, target, code, 'reset_password')
    );
    
    if (codes.length === 0) {
      return error('验证码无效或已过期', ErrorCode.CODE_ERROR);
    }
    
    return success(null, '验证码验证成功');
  } catch (error: any) {
    console.error('验证重置密码验证码失败:', error);
    return error(error.message);
  }
}

/**
 * 重置密码
 */
export async function resetPassword(event: { body: string }) {
  try {
    const { type, target, code, newPassword }: ResetPasswordRequest = JSON.parse(event.body);
    
    // 验证参数
    if (!type || !target || !code || !newPassword) {
      return error('参数不完整', ErrorCode.PARAM_ERROR);
    }
    
    // 验证格式
    if (type === 'email' && !isValidEmail(target)) {
      return error('邮箱格式不正确', ErrorCode.PARAM_ERROR);
    }
    if (type === 'phone' && !isValidPhone(target)) {
      return error('手机号格式不正确', ErrorCode.PARAM_ERROR);
    }
    
    // 验证密码强度
    if (!isValidPassword(newPassword)) {
      return error('密码必须至少包含8个字符，包括字母和数字', ErrorCode.PARAM_ERROR);
    }
    
    // 验证验证码
    const codes = await query<VerificationCode>(
      'SELECT * FROM verification_codes WHERE type = ? AND target = ? AND code = ? AND purpose = ? AND expires_at > NOW() ORDER BY id DESC LIMIT 1',
      createQueryParams(type, target, code, 'reset_password')
    );
    
    if (codes.length === 0) {
      return error('验证码无效或已过期', ErrorCode.CODE_ERROR);
    }
    
    // 查询用户
    const users = await query<User>(
      `SELECT * FROM users WHERE ${type} = ?`,
      createQueryParams(target)
    );
    
    if (users.length === 0) {
      return error('用户不存在', ErrorCode.USER_NOT_FOUND);
    }
    
    const user = users[0];
    
    // 加密新密码
    const hashedPassword = await hashPassword(newPassword);
    
    // 更新密码
    await execute(
      'UPDATE users SET password = ? WHERE id = ?',
      createQueryParams(hashedPassword, user.id)
    );
    
    // 删除已使用的验证码
    await execute(
      'DELETE FROM verification_codes WHERE id = ?',
      createQueryParams(codes[0].id)
    );
    
    return success(null, '密码重置成功');
  } catch (error: any) {
    console.error('重置密码失败:', error);
    return error(error.message);
  }
}

interface VerificationCodeRow extends RowDataPacket, VerificationCode {}

/**
 * 处理重置密码请求
 */
export async function handleResetPassword(req: ResetPasswordRequest): Promise<ResetPasswordResponse> {
  try {
    // 验证验证码
    const [codes] = await pool.execute<VerificationCodeRow[]>(
      'SELECT * FROM verification_codes WHERE target = ? AND purpose = ? ORDER BY created_at DESC LIMIT 1',
      [req.target, 'reset_password']
    );

    if (codes.length === 0) {
      return {
        success: false,
        error: '请先获取验证码'
      };
    }

    const verificationCode = codes[0];

    // 检查验证码是否过期
    if (new Date() > verificationCode.expires_at) {
      return {
        success: false,
        error: '验证码已过期'
      };
    }

    // 检查验证码是否正确
    if (verificationCode.code !== req.code) {
      return {
        success: false,
        error: '验证码错误'
      };
    }

    // 加密新密码
    const hashedPassword = await hashPassword(req.newPassword);

    // 更新密码
    const [result] = await pool.execute(
      'UPDATE users SET password = ? WHERE email = ? OR phone = ?',
      [hashedPassword, req.target, req.target]
    );

    if ((result as any).affectedRows === 0) {
      return {
        success: false,
        error: '用户不存在'
      };
    }

    return {
      success: true
    };
  } catch (err) {
    console.error('重置密码失败:', err);
    return {
      success: false,
      error: '重置密码失败，请稍后重试'
    };
  }
} 