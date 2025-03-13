import nodemailer from 'nodemailer';
import { config } from 'dotenv';
import { resolve } from 'path';

// 加载环境配置
config({
  path: resolve(__dirname, '../../.env')
});

/**
 * 邮件配置
 */
interface MailConfig {
  from?: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

/**
 * 创建邮件传输器
 */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.qq.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.SMTP_USER || 'your-email@qq.com',
    pass: process.env.SMTP_PASS || 'your-smtp-password'
  }
});

/**
 * 发送邮件
 * @param config 邮件配置
 */
export async function sendMail(config: MailConfig): Promise<void> {
  try {
    await transporter.sendMail({
      from: config.from || process.env.EMAIL_FROM,
      to: config.to,
      subject: config.subject,
      text: config.text,
      html: config.html,
    });
  } catch (error) {
    console.error('发送邮件失败:', error);
    throw error;
  }
}

/**
 * 发送验证码邮件
 * @param email 目标邮箱
 * @param code 验证码
 */
export async function sendVerificationEmail(email: string, code: string): Promise<void> {
  await transporter.sendMail({
    from: process.env.SMTP_USER || 'your-email@qq.com',
    to: email,
    subject: '验证码 - Twinlife',
    text: `您的验证码是：${code}，10分钟内有效。`,
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333;">Twinlife 验证码</h2>
        <p style="color: #666;">您好，</p>
        <p style="color: #666;">您的验证码是：</p>
        <div style="background: #f5f5f5; padding: 15px; margin: 20px 0; text-align: center;">
          <span style="font-size: 24px; color: #333; letter-spacing: 5px;">${code}</span>
        </div>
        <p style="color: #666;">验证码有效期为10分钟，请尽快使用。</p>
        <p style="color: #999; margin-top: 30px;">此邮件由系统自动发送，请勿回复。</p>
      </div>
    `
  });
} 