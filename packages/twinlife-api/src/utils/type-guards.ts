import { QueryParams } from '../types/db';

/**
 * 检查值是否为有效的查询参数
 * @param value 要检查的值
 * @returns 是否为有效的查询参数
 */
export function isValidQueryParam(value: any): value is string | number | boolean | Date | null {
  return value === null || 
         typeof value === 'string' || 
         typeof value === 'number' || 
         typeof value === 'boolean' || 
         value instanceof Date;
}

/**
 * 确保值为有效的查询参数
 * @param value 输入值
 * @returns 处理后的查询参数
 */
export function ensureQueryParam(value: string | undefined | null): string | null {
  return value ?? null;
}

/**
 * 创建安全的查询参数数组
 * @param values 查询参数值数组
 * @returns 安全的查询参数数组
 * @throws 如果存在无效的查询参数值
 */
export function createQueryParams(...values: any[]): QueryParams {
  const params = values.map(value => {
    if (!isValidQueryParam(value)) {
      throw new Error(`无效的查询参数值: ${value}`);
    }
    return value;
  });
  return params;
} 