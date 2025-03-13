/**
 * API客户端实例
 */

import { TwinlifeApiClient } from '@twinlife/api';

// API客户端实例
export const apiClient = new TwinlifeApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://service-xxxxx-xxxx.gz.apigw.tencentcs.com/release/',
  timeout: 10000,
}); 