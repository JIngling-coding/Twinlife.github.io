import * as tencentcloud from 'tencentcloud-sdk-nodejs';
import { config } from 'dotenv';
import { resolve } from 'path';
import { sendVerificationSMS } from './sms';

// 加载环境配置
config({
  path: resolve(__dirname, '../../.env')
});

/**
 * 验证码记录
 */
interface VerificationRecord {
  code: string;
  expireAt: number;
  attempts: number;
  lastSentAt: number;
}

/**
 * 验证码管理类
 */
class VerificationManager {
  private static instance: VerificationManager;
  private codeStore: Map<string, VerificationRecord>;
  
  // 配置参数
  private readonly CODE_LENGTH = 6;
  private readonly CODE_EXPIRES_IN = process.env.NODE_ENV === 'test' ? 10 * 1000 : 5 * 60 * 1000; // 测试环境10秒，生产环境5分钟
  private readonly MAX_ATTEMPTS = 3; // 最大尝试次数
  private readonly SEND_INTERVAL = process.env.NODE_ENV === 'test' ? 5 * 1000 : 60 * 1000; // 测试环境5秒，生产环境1分钟
  private readonly MAX_DAILY_SENDS = process.env.NODE_ENV === 'test' ? 1000 : 10; // 测试环境1000次，生产环境10次

  private constructor() {
    this.codeStore = new Map();
  }

  /**
   * 获取单例实例
   */
  public static getInstance(): VerificationManager {
    if (!VerificationManager.instance) {
      VerificationManager.instance = new VerificationManager();
    }
    return VerificationManager.instance;
  }

  /**
   * 生成验证码
   */
  private generateCode(): string {
    return Math.random().toString().slice(2, 2 + this.CODE_LENGTH);
  }

  /**
   * 清理过期的验证码
   */
  private cleanExpiredCodes(): void {
    const now = Date.now();
    for (const [key, record] of this.codeStore.entries()) {
      if (record.expireAt < now) {
        this.codeStore.delete(key);
      }
    }
  }

  /**
   * 获取验证码记录
   * @param phone 手机号
   */
  private getRecord(phone: string): VerificationRecord | undefined {
    this.cleanExpiredCodes();
    return this.codeStore.get(phone);
  }

  /**
   * 检查是否可以发送验证码
   * @param phone 手机号
   * @throws {Error} 如果不能发送验证码，则抛出错误
   */
  private checkCanSend(phone: string): void {
    const record = this.getRecord(phone);
    const now = Date.now();

    if (record) {
      // 检查发送间隔
      if (now - record.lastSentAt < this.SEND_INTERVAL) {
        const waitSeconds = Math.ceil((this.SEND_INTERVAL - (now - record.lastSentAt)) / 1000);
        throw new Error(`请等待 ${waitSeconds} 秒后再试`);
      }

      // 检查每日发送次数限制
      const startOfDay = new Date().setHours(0, 0, 0, 0);
      if (record.lastSentAt >= startOfDay) {
        const dailySends = Math.floor((now - startOfDay) / this.SEND_INTERVAL);
        if (dailySends >= this.MAX_DAILY_SENDS) {
          throw new Error('已达到今日发送次数上限');
        }
      }
    }
  }

  /**
   * 发送验证码
   * @param phone 手机号
   * @throws {Error} 如果发送失败或不满足发送条件，则抛出错误
   */
  public async sendCode(phone: string): Promise<void> {
    this.checkCanSend(phone);

    const code = this.generateCode();
    const now = Date.now();

    // 发送验证码
    await sendVerificationSMS(phone, code);

    // 保存验证码记录
    this.codeStore.set(phone, {
      code,
      expireAt: now + this.CODE_EXPIRES_IN,
      attempts: 0,
      lastSentAt: now,
    });
  }

  /**
   * 验证验证码
   * @param phone 手机号
   * @param code 验证码
   * @returns 验证是否成功
   * @throws {Error} 如果验证码不存在或已过期，则抛出错误
   */
  public verifyCode(phone: string, code: string): boolean {
    const record = this.getRecord(phone);

    if (!record) {
      throw new Error('验证码不存在或已过期');
    }

    // 增加尝试次数
    record.attempts++;

    // 检查尝试次数
    if (record.attempts > this.MAX_ATTEMPTS) {
      this.codeStore.delete(phone);
      throw new Error('验证码已失效，请重新获取');
    }

    // 验证码匹配检查
    if (record.code !== code) {
      if (record.attempts >= this.MAX_ATTEMPTS) {
        this.codeStore.delete(phone);
      }
      throw new Error('验证码错误');
    }

    // 验证成功，删除验证码
    this.codeStore.delete(phone);
    return true;
  }
}

// 导出单例实例
export const verificationManager = VerificationManager.getInstance(); 