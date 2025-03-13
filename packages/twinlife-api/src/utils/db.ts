import mysql from 'mysql2/promise';

/**
 * 数据库连接池
 */
export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'twinlife',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}); 