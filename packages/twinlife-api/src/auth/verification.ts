import { SendCodeRequest, SendCodeResponse } from '../types/auth';
import { pool } from '../utils/db';
import { sendVerificationEmail } from '../utils/mailer';
import { sendVerificationSMS } from '../utils/sms';

/**
 * 生成验证码
 */
function generateCode(): string {
  return Math.random().toString().slice(2, 8);
}

/**
 * 处理发送验证码请求
 */
export async function handleSendCode(req: SendCodeRequest): Promise<SendCodeResponse> {
  try {
    const { account, purpose } = req;

    // 检查是否为邮箱
    const isEmail = account.includes('@');

    // 生成验证码
    const code = generateCode();

    // 保存验证码
    await pool.execute(
      'INSERT INTO verification_codes (type, target, code, purpose, expires_at) VALUES (?, ?, ?, ?, DATE_ADD(NOW(), INTERVAL 10 MINUTE))',
      [isEmail ? 'email' : 'phone', account, code, purpose]
    );

    // 发送验证码
    if (isEmail) {
      await sendVerificationEmail(account, code);
    } else {
      await sendVerificationSMS(account, code);
    }

    return {
      success: true
    };
  } catch (err) {
    console.error('发送验证码失败:', err);
    return {
      success: false,
      error: '发送验证码失败，请稍后重试'
    };
  }
} 