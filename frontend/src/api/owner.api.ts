import { apiClient } from './api-client';
import type { OwnerDashboardData } from '../types/dashboard';

export const OwnerApi = {
  async getDashboard(): Promise<OwnerDashboardData> {
    const response = await apiClient.get<OwnerDashboardData>('/owner/dashboard');
    return response.data;
  },
};
