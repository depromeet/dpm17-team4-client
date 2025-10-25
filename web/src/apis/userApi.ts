import { API_ENDPOINTS } from '@/constants';
import apiClient from '@/lib/api-client';
import type { UserMeResponseDto } from '@/types/dto/user.dto';

export const userApi = {
  getMe: async () => {
    const response = await apiClient.get<UserMeResponseDto>(
      API_ENDPOINTS.USERS.ME
    );
    return response.data;
  },
};
