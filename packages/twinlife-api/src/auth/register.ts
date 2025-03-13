import { RegisterRequest, SendCodeRequest } from './types';
import { query, execute } from '../db/connection';
import { generateCode, hashPassword, isValidEmail, isValidPhone, isValidPassword } from './utils';
import { success, error, ErrorCode } from '../utils/response';
import { env } from '../config/env';
import { User, VerificationCode, SafeUser } from '../types/user';
import { ApiResponse } from '../types/auth';
import { QueryParams } from '../types/db';
import { createQueryParams, ensureQueryParam } from '../utils/type-guards';
import { sendVerificationEmail } from '../utils/mailer';
import { sendVerificationSMS } from '../utils/sms';
import { RegisterResponse } from '../types/auth';
import { pool } from '../utils/db';
import { generateToken } from '../utils/jwt';
import { RowDataPacket } from 'mysql2';

/**
 * 发送注册验证码
 */
export async function sendRegisterCode(event: { body: string }) {
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
    
    // 检查是否已注册
    const users = await query<User>(
      `SELECT id FROM users WHERE ${type} = ?`,
      createQueryParams(target)
    );
    if (users.length > 0) {
      return error(`该${type === 'email' ? '邮箱' : '手机号'}已注册`, ErrorCode.USER_EXISTS);
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
    console.error('发送注册验证码失败:', error);
    return error(error.message);
  }
}

/**
 * 发送验证码
 * @param target 目标邮箱或手机号
 * @returns 处理结果
 */
export async function sendVerificationCode(target: string): Promise<ApiResponse<void>> {
  try {
    // 验证目标格式
    const isEmail = isValidEmail(target);
    const isPhone = isValidPhone(target);
    
    if (!isEmail && !isPhone) {
      return {
        success: false,
        message: '无效的邮箱或手机号格式',
        data: undefined
      };
    }

    // 生成验证码
    const code = Math.random().toString().slice(2, 8); // 6位数字验证码
    const now = new Date();
    const expireTime = new Date(now.getTime() + 5 * 60 * 1000); // 5分钟后过期

    // 存储验证码
    const params = createQueryParams(target, code, isEmail ? 'email' : 'phone', expireTime);
    await execute(
      'INSERT INTO verification_codes (target, code, type, expires_at) VALUES (?, ?, ?, ?)',
      params
    );

    // 发送验证码
    if (isEmail) {
      await sendVerificationEmail(target, code);
    } else {
      await sendVerificationSMS(target, code);
    }

    return {
      success: true,
      message: '验证码已发送',
      data: undefined
    };
  } catch (error) {
    console.error('发送验证码失败:', error);
    return {
      success: false,
      message: '发送验证码失败',
      data: undefined
    };
  }
}

/**
 * 用户注册
 * @param params 注册参数
 * @returns 处理结果
 */
export async function register(params: RegisterRequest): Promise<ApiResponse<SafeUser>> {
  try {
    const { type, account, password, code } = params;
    
    // 验证参数
    if (!account) {
      return {
        success: false,
        message: '请提供邮箱或手机号',
        data: undefined
      };
    }

    // 验证密码强度
    if (!isValidPassword(password)) {
      return {
        success: false,
        message: '密码必须至少包含8个字符，包括字母和数字',
        data: undefined
      };
    }

    // 验证验证码
    const [verificationCode] = await query<VerificationCode>(
      'SELECT code, expires_at FROM verification_codes WHERE target = ? ORDER BY created_at DESC LIMIT 1',
      createQueryParams(account)
    );

    if (!verificationCode) {
      return {
        success: false,
        message: '请先获取验证码',
        data: undefined
      };
    }

    if (verificationCode.code !== code) {
      return {
        success: false,
        message: '验证码错误',
        data: undefined
      };
    }

    if (new Date() > verificationCode.expires_at) {
      return {
        success: false,
        message: '验证码已过期',
        data: undefined
      };
    }

    // 检查用户是否已存在
    const [existingUser] = await query<User>(
      'SELECT * FROM users WHERE email = ? OR phone = ?',
      createQueryParams(type === 'email' ? account : null, type === 'phone' ? account : null)
    );

    if (existingUser) {
      return {
        success: false,
        message: '该邮箱或手机号已被注册',
        data: undefined
      };
    }

    // 加密密码
    const hashedPassword = await hashPassword(password);

    // 创建用户
    const result = await execute(
      'INSERT INTO users (email, phone, password) VALUES (?, ?, ?)',
      createQueryParams(
        type === 'email' ? account : null,
        type === 'phone' ? account : null,
        hashedPassword
      )
    );

    // 获取创建的用户信息
    const [user] = await query<User>(
      'SELECT * FROM users WHERE id = ?',
      createQueryParams(result.insertId)
    );

    // 删除已使用的验证码
    await execute(
      'DELETE FROM verification_codes WHERE target = ? AND code = ?',
      createQueryParams(account, code)
    );

    // 创建安全的用户对象（不包含密码）
    const safeUser: SafeUser = {
      id: user.id,
      email: user.email,
      phone: user.phone,
      nickname: user.nickname,
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at
    };

    return {
      success: true,
      message: '注册成功',
      data: safeUser
    };
  } catch (error) {
    console.error('注册失败:', error);
    return {
      success: false,
      message: '注册失败',
      data: undefined
    };
  }
}

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

interface VerificationCodeRow extends RowDataPacket, VerificationCode {}

/**
 * 处理注册请求
 */
export async function handleRegister(req: RegisterRequest): Promise<RegisterResponse> {
  try {
    // 验证验证码
    const [codes] = await pool.execute<VerificationCodeRow[]>(
      'SELECT * FROM verification_codes WHERE target = ? AND purpose = ? ORDER BY created_at DESC LIMIT 1',
      [req.account, 'register']
    );

    if (codes.length === 0) {
      return {
        success: false,
        error: '请先获取验证码'
      } as RegisterResponse;
    }

    const verificationCode = codes[0];

    // 检查验证码是否过期
    if (new Date() > verificationCode.expires_at) {
      return {
        success: false,
        error: '验证码已过期'
      } as RegisterResponse;
    }

    // 检查验证码是否正确
    if (verificationCode.code !== req.code) {
      return {
        success: false,
        error: '验证码错误'
      } as RegisterResponse;
    }

    // 检查用户是否已存在
    const [existingUsers] = await pool.execute<UserRow[]>(
      'SELECT * FROM users WHERE email = ? OR phone = ?',
      [req.account, req.account]
    );

    if (existingUsers.length > 0) {
      return {
        success: false,
        error: '该账号已被注册'
      } as RegisterResponse;
    }

    // 加密密码
    const hashedPassword = await hashPassword(req.password);

    // 创建用户
    const [result] = await pool.execute(
      'INSERT INTO users (email, phone, password) VALUES (?, ?, ?)',
      [
        verificationCode.type === 'email' ? req.account : null,
        verificationCode.type === 'phone' ? req.account : null,
        hashedPassword
      ]
    );

    // 获取新创建的用户
    const [users] = await pool.execute<UserRow[]>(
      'SELECT * FROM users WHERE id = ?',
      [(result as any).insertId]
    );

    const user = users[0];

    // 生成访问令牌
    const token = await generateToken(user.id);

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
      nickname: user.nickname || req.account.split('@')[0], // 使用邮箱前缀作为默认昵称
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at
    };

    return {
      success: true,
      user: safeUser,
      token
    } as RegisterResponse;
  } catch (err) {
    console.error('注册失败:', err);
    return {
      success: false,
      error: '注册失败，请稍后重试'
    } as RegisterResponse;
  }
} 