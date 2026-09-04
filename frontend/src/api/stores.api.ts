import { apiClient } from './api-client';
import type { AdminStore, CreateStoreRequest, RatingRequest, Store, StoreRating } from '../types/store';

export const StoresApi = {
  async getStores(search?: string): Promise<Store[]> {
    const response = await apiClient.get<Store[]>('/stores', {
      params: search ? { search } : undefined,
    });

    return response.data;
  },

  async getStoreRatings(storeId: string): Promise<StoreRating[]> {
    const response = await apiClient.get<StoreRating[]>(`/stores/${storeId}/ratings`);
    return response.data;
  },

  async getAdminStores(search?: string): Promise<AdminStore[]> {
    const response = await apiClient.get<AdminStore[]>('/stores/admin', {
      params: search ? { search } : undefined,
    });

    return response.data;
  },

  async createStore(data: CreateStoreRequest): Promise<void> {
    await apiClient.post('/stores', data);
  },

  async createRating(storeId: string, data: RatingRequest): Promise<void> {
    await apiClient.post(`/stores/${storeId}/ratings`, data);
  },

  async updateRating(storeId: string, data: RatingRequest): Promise<void> {
    await apiClient.put(`/stores/${storeId}/ratings`, data);
  },
};
