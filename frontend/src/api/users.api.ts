import { apiClient } from './api-client';
import type { CreateUserRequest, User } from '../types/user';

export const UsersApi = {
  async createUser(data: CreateUserRequest): Promise<User> {
    const response = await apiClient.post<User>('/users', data);
    return response.data;
  },
};
