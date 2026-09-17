export type UserRole = 'admin' | 'user' | 'manager';

export interface IUser {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}
