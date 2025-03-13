import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2';

/**
 * 数据库查询结果类型
 */
export type QueryResult<T> = T[] & RowDataPacket[][];

/**
 * 数据库更新结果类型
 */
export type UpdateResult = OkPacket | ResultSetHeader;

/**
 * 数据库查询参数类型
 */
export type QueryParams = (string | number | boolean | Date | null)[]; 