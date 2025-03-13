/**
 * 数据库配置
 */
export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'twinlife',
  connectionLimit: 10,
  // 启用SSL连接（腾讯云MySQL要求）
  ssl: {
    rejectUnauthorized: false
  }
}; 