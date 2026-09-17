import { http } from './http';
import { ApiResponse } from '../types/api.types';
import { AuthResponse, LoginCredentials } from '../types/auth.types';
import { IUser } from '../types/user.types';

/**
 * Authentication API Service
 * Encapsulates authentication and current session endpoints.
 */
export const authApi = {
  // POST: Login user credentials
  login: (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    return http.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
  },

  // GET: Fetch current user profile
  getProfile: (): Promise<ApiResponse<IUser>> => {
    return http.get<ApiResponse<IUser>>('/auth/me');
  },
};

export default authApi;
