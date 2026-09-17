import { authApi } from '../api/auth.api';
import { ApiResponse } from '../types/api.types';
import { AuthResponse, LoginCredentials } from '../types/auth.types';
import { IUser } from '../types/user.types';

/**
 * Authentication Service (Delegates to src/api/auth.api)
 */
export const authService = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    return authApi.login(credentials);
  },

  getProfile: async (): Promise<ApiResponse<IUser>> => {
    return authApi.getProfile();
  },
};

export default authService;
