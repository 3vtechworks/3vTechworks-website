import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { env } from '../config/env';
import { storage } from '../utils/storage';

export const apiClient: AxiosInstance = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Attach JWT bearer token if available
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = storage.getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Extract response data and handle 401 unauthenticated
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      storage.clearAuth();
      // Only redirect to login if currently trying to access an /admin route
      if (
        window.location.pathname.startsWith('/admin') &&
        !window.location.pathname.startsWith('/admin/login')
      ) {
        window.location.href = '/admin/login';
      }
    }

    const customError = error.response?.data || {
      success: false,
      message: error.message || 'An unexpected network error occurred',
    };

    return Promise.reject(customError);
  }
);

export default apiClient;
