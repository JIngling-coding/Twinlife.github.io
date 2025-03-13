"use strict";
/**
 * 认证相关功能
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
exports.generateVerificationCode = generateVerificationCode;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * 哈希密码
 * @param password 原始密码
 * @returns 哈希后的密码
 */
async function hashPassword(password) {
    const salt = await bcryptjs_1.default.genSalt(10);
    return bcryptjs_1.default.hash(password, salt);
}
/**
 * 验证密码
 * @param password 原始密码
 * @param hashedPassword 哈希后的密码
 * @returns 是否匹配
 */
async function verifyPassword(password, hashedPassword) {
    return bcryptjs_1.default.compare(password, hashedPassword);
}
/**
 * 生成JWT令牌
 * @param payload 令牌负载
 * @param secret 密钥
 * @param expiresIn 过期时间
 * @returns JWT令牌
 */
function generateToken(payload, secret, expiresIn) {
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn });
}
/**
 * 验证JWT令牌
 * @param token JWT令牌
 * @param secret 密钥
 * @returns 解码后的负载
 */
function verifyToken(token, secret) {
    try {
        return jsonwebtoken_1.default.verify(token, secret);
    }
    catch (error) {
        return null;
    }
}
/**
 * 生成随机验证码
 * @param length 验证码长度
 * @returns 随机验证码
 */
function generateVerificationCode(length = 6) {
    return Math.random().toString().substring(2, 2 + length);
}
