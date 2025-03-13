/**
 * 认证相关功能
 */
/**
 * 哈希密码
 * @param password 原始密码
 * @returns 哈希后的密码
 */
export declare function hashPassword(password: string): Promise<string>;
/**
 * 验证密码
 * @param password 原始密码
 * @param hashedPassword 哈希后的密码
 * @returns 是否匹配
 */
export declare function verifyPassword(password: string, hashedPassword: string): Promise<boolean>;
/**
 * 生成JWT令牌
 * @param payload 令牌负载
 * @param secret 密钥
 * @param expiresIn 过期时间
 * @returns JWT令牌
 */
export declare function generateToken(payload: any, secret: string, expiresIn: string): string;
/**
 * 验证JWT令牌
 * @param token JWT令牌
 * @param secret 密钥
 * @returns 解码后的负载
 */
export declare function verifyToken(token: string, secret: string): any;
/**
 * 生成随机验证码
 * @param length 验证码长度
 * @returns 随机验证码
 */
export declare function generateVerificationCode(length?: number): string;
