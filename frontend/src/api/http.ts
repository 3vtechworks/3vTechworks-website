import { AxiosRequestConfig } from 'axios';
import apiClient from './client';

/**
 * Generic HTTP methods for get, post, put, patch, delete.
 * All API modules route their network requests through these functions.
 * Since the apiClient response interceptor unpacks response.data,
 * these methods return Promise<T> directly.
 */

export const get = <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return apiClient.get(url, config) as unknown as Promise<T>;
};

export const post = <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
  return apiClient.post(url, data, config) as unknown as Promise<T>;
};

export const put = <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
  return apiClient.put(url, data, config) as unknown as Promise<T>;
};

export const patch = <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
  return apiClient.patch(url, data, config) as unknown as Promise<T>;
};

export const del = <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return apiClient.delete(url, config) as unknown as Promise<T>;
};

export const http = {
  get,
  post,
  put,
  patch,
  delete: del,
};

export default http;
