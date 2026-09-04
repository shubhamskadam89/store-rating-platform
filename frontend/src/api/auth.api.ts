import * as T from '../types/auth';
import { AuthUser } from '../types/auth';
import { apiClient } from './api-client';

export const AuthApi = {
  async login(data: T.LoginRequest): Promise<T.LoginResponse> {
    const response = await apiClient.post<T.LoginResponse>('/auth/login', data);
    return response.data;
  },

  async register(data: T.RegisterRequest): Promise<void> {
    await apiClient.post('/auth/register', data);
  },

  async updatePassword(data: T.UpdatePasswordRequest): Promise<void> {
    await apiClient.put('/auth/password', data);
  },

  async getMe(): Promise<AuthUser> {
    const response = await apiClient.get<AuthUser>('/auth/me');

    return response.data;
  },
};
