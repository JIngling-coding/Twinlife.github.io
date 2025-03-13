import * as tencentcloud from 'tencentcloud-sdk-nodejs';
import { config } from 'dotenv';
import { resolve } from 'path';

// 加载环境配置
config({
  path: resolve(__dirname, '../../.env')
});

const SmsClient = tencentcloud.sms.v20210111.Client;

/**
 * 创建短信客户端
 */
const client = new SmsClient({
  credential: {
    secretId: process.env.TENCENT_SECRET_ID || 'your-secret-id',
    secretKey: process.env.TENCENT_SECRET_KEY || 'your-secret-key'
  },
  region: 'ap-guangzhou',
  profile: {
    signMethod: 'TC3-HMAC-SHA256',
    httpProfile: {
      reqMethod: 'POST',
      reqTimeout: 30,
      endpoint: 'sms.tencentcloudapi.com'
    }
  }
});

/**
 * 验证手机号格式
 * @param phone 手机号
 * @returns 是否为有效的手机号
 */
function isValidPhone(phone: string): boolean {
  // 中国大陆手机号格式：1开头的11位数字
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phone);
}

/**
 * 判断是否为测试手机号
 * @param phone 手机号
 * @returns 是否为测试手机号
 */
function isTestPhone(phone: string): boolean {
  const testPhones = process.env.SMS_TEST_PHONES?.split(',') || [];
  return testPhones.includes(phone);
}

/**
 * 发送短信
 * @param phoneNumber 手机号码（格式：+86xxxxxxxxxx）
 * @param params 模板参数数组
 */
export async function sendSms(phoneNumber: string, params: string[]): Promise<void> {
  try {
    // 开发环境且不在测试号码列表中，则只打印日志
    if (process.env.NODE_ENV === 'development' && !process.env.SMS_TEST_PHONES?.split(',').includes(phoneNumber.replace('+86', ''))) {
      console.log('开发环境短信发送:', {
        phoneNumber,
        params,
        appId: process.env.SMS_APP_ID,
        sign: process.env.SMS_SIGN,
        templateId: process.env.SMS_TEMPLATE_ID
      });
      return;
    }

    const result = await client.SendSms({
      PhoneNumberSet: [phoneNumber],
      SmsSdkAppId: process.env.SMS_APP_ID || '',
      SignName: process.env.SMS_SIGN || '',
      TemplateId: process.env.SMS_TEMPLATE_ID || '',
      TemplateParamSet: params,
    });

    if (result.SendStatusSet?.[0]?.Code !== 'Ok') {
      throw new Error(result.SendStatusSet?.[0]?.Message || '发送失败');
    }
  } catch (error) {
    console.error('发送短信失败:', error);
    throw error;
  }
}

/**
 * 发送验证码短信
 * @param phone 手机号码（不含国际区号）
 * @param code 验证码
 * @throws {Error} 当手机号格式无效时抛出错误
 */
export async function sendVerificationSMS(phone: string, code: string): Promise<void> {
  // 验证手机号格式
  if (!isValidPhone(phone)) {
    throw new Error('无效的手机号格式');
  }

  try {
    // 如果不是测试手机号，则只打印日志并返回
    if (!isTestPhone(phone)) {
      console.log(`[测试环境] 向手机号 ${phone} 发送验证码: ${code}`);
      return;
    }

    // 以下是实际发送短信的逻辑
    const params = {
      PhoneNumberSet: [`+86${phone}`],
      SmsSdkAppId: process.env.TENCENT_SMS_APP_ID || 'your-app-id',
      SignName: process.env.TENCENT_SMS_SIGN || 'your-sign-name',
      TemplateId: process.env.TENCENT_SMS_TEMPLATE_ID || 'your-template-id',
      TemplateParamSet: [code]
    };

    const result = await client.SendSms(params);
    
    // 检查发送结果
    const { SendStatusSet } = result;
    if (!SendStatusSet?.[0] || SendStatusSet[0].Code !== 'Ok') {
      throw new Error(SendStatusSet?.[0]?.Message || '短信发送失败');
    }

    console.log(`成功发送验证码到手机号: ${phone}`);
  } catch (error) {
    console.error('发送短信失败:', error);
    throw error;
  }
} 