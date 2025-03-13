import { PasswordLoginRequest, CodeLoginRequest, SendCodeRequest } from './types';
import { query, execute } from '../db/connection';
import { generateCode, verifyPassword, isValidEmail, isValidPhone } from './utils';
import { success, error, ErrorCode } from '../utils/response';
import { env } from '../config/env';
import { User, VerificationCode, SafeUser } from '../types/user';
import { LoginRequest, LoginResponse } from '../types/auth';
import { QueryParams } from '../types/db';
import { createQueryParams, ensureQueryParam } from '../utils/type-guards';
import { createSession } from './session';
import { sendVerificationEmail } from '../utils/mailer';
import { sendVerificationSMS } from '../utils/sms';
import { pool } from '../utils/db';
import { comparePassword } from '../utils/crypto';
import { generateToken } from '../utils/jwt';
import { RowDataPacket } from 'mysql2';

interface UserRow extends RowDataPacket {
  id: number;
  email: string | undefined;
  phone: string | undefined;
  password: string;
  nickname: string;
  avatar: string | undefined;
  created_at: Date;
  updated_at: Date;
}

/**
 * 发送登录验证码
 */
export async function sendLoginCode(event: { body: string }) {
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
      'INSERT INTO verification_codes (type, target, code, expires_at) VALUES (?, ?, ?, ?)',
      createQueryParams(type, target, code, expiresAt)
    );
    
    // 发送验证码
    if (type === 'email') {
      await sendVerificationEmail(target, code);
    } else {
      await sendVerificationSMS(target, code);
    }
    
    return success(null, '验证码已发送');
  } catch (error: any) {
    console.error('发送登录验证码失败:', error);
    return error(error.message);
  }
}

/**
 * 密码登录
 */
export async function loginWithPassword(event: { body: string }) {
  try {
    const { account, password }: PasswordLoginRequest = JSON.parse(event.body);
    
    // 验证参数
    if (!account || !password) {
      return error('参数不完整', ErrorCode.PARAM_ERROR);
    }
    
    // 判断账号类型
    const type = isValidEmail(account) ? 'email' : (isValidPhone(account) ? 'phone' : null);
    if (!type) {
      return error('账号格式不正确', ErrorCode.PARAM_ERROR);
    }
    
    // 查询用户
    const users = await query<User>(
      `SELECT * FROM users WHERE ${type} = ?`,
      [account]
    );
    
    if (users.length === 0) {
      return error('用户不存在', ErrorCode.USER_NOT_FOUND);
    }
    
    const user = users[0];
    
    // 验证密码
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return error('密码错误', ErrorCode.PASSWORD_ERROR);
    }
    
    // 生成token
    const token = generateToken(user.id);
    
    // 保存会话
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7天后过期
    await execute(
      'INSERT INTO user_sessions (user_id, token, expires_at) VALUES (?, ?, ?)',
      [user.id, token, expiresAt]
    );
    
    // 返回用户信息
    const response: LoginResponse = {
      token,
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        nickname: user.nickname,
        avatar: user.avatar,
        created_at: user.created_at,
        updated_at: user.updated_at
      }
    };
    
    return success(response, '登录成功');
  } catch (error: any) {
    console.error('密码登录失败:', error);
    return error(error.message);
  }
}

/**
 * 验证码登录
 */
export async function loginWithCode(event: { body: string }) {
  try {
    const { account, code }: CodeLoginRequest = JSON.parse(event.body);
    
    // 验证参数
    if (!account || !code) {
      return error('参数不完整', ErrorCode.PARAM_ERROR);
    }
    
    // 判断账号类型
    const type = isValidEmail(account) ? 'email' : (isValidPhone(account) ? 'phone' : null);
    if (!type) {
      return error('账号格式不正确', ErrorCode.PARAM_ERROR);
    }
    
    // 验证验证码
    const codes = await query<VerificationCode>(
      'SELECT * FROM verification_codes WHERE type = ? AND target = ? AND code = ? AND expires_at > NOW() ORDER BY id DESC LIMIT 1',
      [type, account, code]
    );
    
    if (codes.length === 0) {
      return error('验证码无效或已过期', ErrorCode.CODE_ERROR);
    }
    
    // 查询用户
    const users = await query<User>(
      `SELECT * FROM users WHERE ${type} = ?`,
      [account]
    );
    
    if (users.length === 0) {
      return error('用户不存在', ErrorCode.USER_NOT_FOUND);
    }
    
    const user = users[0];
    
    // 生成token
    const token = generateToken(user.id);
    
    // 保存会话
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7天后过期
    await execute(
      'INSERT INTO user_sessions (user_id, token, expires_at) VALUES (?, ?, ?)',
      [user.id, token, expiresAt]
    );
    
    // 删除已使用的验证码
    await execute(
      'DELETE FROM verification_codes WHERE id = ?',
      [codes[0].id]
    );
    
    // 返回用户信息
    const response: LoginResponse = {
      token,
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        nickname: user.nickname,
        avatar: user.avatar,
        created_at: user.created_at,
        updated_at: user.updated_at
      }
    };
    
    return success(response, '登录成功');
  } catch (error: any) {
    console.error('验证码登录失败:', error);
    return error(error.message);
  }
}

/**
 * 处理登录请求
 */
export async function handleLogin(req: LoginRequest): Promise<LoginResponse> {
  try {
    // 查询用户
    const [rows] = await pool.execute<UserRow[]>(
      'SELECT * FROM users WHERE email = ? OR phone = ?',
      [req.account, req.account]
    );

    if (rows.length === 0) {
      return {
        error: '用户不存在'
      };
    }

    const user = rows[0];

    // 验证密码
    const valid = await comparePassword(req.password, user.password);
    if (!valid) {
      return {
        error: '密码错误'
      };
    }

    // 生成访问令牌
    const token = generateToken(user.id);

    // 保存会话
    await pool.execute(
      'INSERT INTO user_sessions (user_id, token, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))',
      [user.id, token]
    );

    // 返回用户信息和令牌
    const safeUser: SafeUser = {
      id: user.id,
      email: user.email,
      phone: user.phone,
      nickname: user.nickname || '',
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at
    };

    return {
      user: safeUser,
      token
    };
  } catch (err) {
    console.error('登录失败:', err);
    return {
      error: '登录失败，请稍后重试'
    };
  }
} 