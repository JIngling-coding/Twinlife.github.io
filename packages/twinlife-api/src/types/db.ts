import { RowDataPacket, ResultSetHeader } from 'mysql2';

/**
 * 查询参数类型
 */
export type QueryParams = (string | number | boolean | Date | null)[];

/**
 * 查询结果类型
 */
export type QueryResult<T> = T & RowDataPacket[];

/**
 * 更新结果类型
 */
export type UpdateResult = ResultSetHeader; 