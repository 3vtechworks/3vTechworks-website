import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { IUser } from '../types/user.types';
import { LoginCredentials } from '../types/auth.types';
import { authService } from '../services/auth.service';
import { storage } from '../utils/storage';

export interface AuthContextType {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(storage.getUser<IUser>());
  const [token, setToken] = useState<string | null>(storage.getToken());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshProfile = useCallback(async () => {
    const savedToken = storage.getToken();
    if (!savedToken) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const response = await authService.getProfile();
      if (response?.data) {
        setUser(response.data);
        storage.setUser(response.data);
      }
    } catch {
      storage.clearAuth();
      setUser(null);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const res = await authService.login(credentials);
      const { user: loggedInUser, token: authToken } = res.data;
      storage.setToken(authToken);
      storage.setUser(loggedInUser);
      setUser(loggedInUser);
      setToken(authToken);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    storage.clearAuth();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        login,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
