import { IUser } from './user.types';

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface AuthResponse {
  user: IUser;
  token: string;
}
