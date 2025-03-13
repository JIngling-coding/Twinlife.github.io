import { config } from 'dotenv';
import path from 'path';
import dotenv from 'dotenv';

/**
 * 加载环境变量
 */
export function loadEnv() {
  // 加载.env文件
  config({
    path: path.resolve(__dirname, '../../.env')
  });
  
  // 验证必要的环境变量
  const requiredEnvVars = [
    'DB_HOST',
    'DB_PORT',
    'DB_USER',
    'DB_PASSWORD',
    'DB_NAME',
    'JWT_SECRET'
  ];
  
  const missingEnvVars = requiredEnvVars.filter(
    varName => !process.env[varName]
  );
  
  if (missingEnvVars.length > 0) {
    throw new Error(
      `缺少必要的环境变量: ${missingEnvVars.join(', ')}`
    );
  }
}

/**
 * 环境变量配置
 */
export const env = {
  // 数据库配置
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'twinlife'
  },
  
  // JWT配置
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  },
  
  // 验证码配置
  code: {
    expiresIn: parseInt(process.env.CODE_EXPIRES_IN || '300'),
    length: parseInt(process.env.CODE_LENGTH || '6')
  },
  
  // 腾讯云配置
  tencent: {
    secretId: process.env.TENCENT_SECRET_ID,
    secretKey: process.env.TENCENT_SECRET_KEY
  },
  
  // 短信配置
  sms: {
    appId: process.env.SMS_APP_ID || '',
    sign: process.env.SMS_SIGN || '',
    templateId: process.env.SMS_TEMPLATE_ID || '',
    // 测试手机号配置
    testPhones: (process.env.SMS_TEST_PHONES || '').split(',').filter(Boolean)
  },
  
  // 邮件配置
  email: {
    host: process.env.EMAIL_HOST || 'smtp.example.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true',
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || '',
    from: process.env.EMAIL_FROM || 'no-reply@example.com'
  },
  
  // 环境配置
  isDev: process.env.NODE_ENV !== 'production',
}; 