import { apiClient } from './api-client';
import type { CreateUserRequest, User, UserDetails, UserRole } from '../types/user';
import type { AdminStats } from '../types/dashboard';

export const UsersApi = {
  async createUser(data: CreateUserRequest): Promise<User> {
    const response = await apiClient.post<User>('/users', data);
    return response.data;
  },

  async getUsers(search?: string, role?: UserRole): Promise<User[]> {
    const response = await apiClient.get<User[]>('/users', {
      params: {
        ...(search ? { search } : {}),
        ...(role ? { role } : {}),
      },
    });

    return response.data;
  },

  async getUserById(id: string): Promise<UserDetails> {
    const response = await apiClient.get<UserDetails>(`/users/${id}`);
    return response.data;
  },

  async getStats(): Promise<AdminStats> {
    const response = await apiClient.get<AdminStats>('/users/stats');
    return response.data;
  },
};
