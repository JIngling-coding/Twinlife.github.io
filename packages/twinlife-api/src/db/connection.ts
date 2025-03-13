import mysql from 'mysql2/promise';
import { env } from '../config/env';
import { QueryResult, UpdateResult, QueryParams } from './types';

/**
 * 创建数据库连接池
 */
export const pool = mysql.createPool(env.db);

/**
 * 获取数据库连接
 * @returns Promise<mysql.Connection>
 */
export async function getConnection() {
  try {
    const connection = await pool.getConnection();
    return connection;
  } catch (error) {
    console.error('获取数据库连接失败:', error);
    throw error;
  }
}

/**
 * 执行SELECT查询
 * @param sql SQL语句
 * @param params 查询参数
 * @returns Promise<T[]>
 */
export async function query<T>(sql: string, params?: QueryParams): Promise<T[]> {
  const connection = await getConnection();
  try {
    const [rows] = await connection.query<QueryResult<T>>(sql, params);
    return rows;
  } finally {
    connection.release();
  }
}

/**
 * 执行INSERT/UPDATE/DELETE操作
 * @param sql SQL语句
 * @param params 查询参数
 * @returns Promise<UpdateResult>
 */
export async function execute(sql: string, params?: QueryParams): Promise<UpdateResult> {
  const connection = await getConnection();
  try {
    const [result] = await connection.execute<UpdateResult>(sql, params);
    return result;
  } finally {
    connection.release();
  }
} 