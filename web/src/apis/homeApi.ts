
import { HomeResponseDto } from '@/app/(with-bottom-navigation)/home/types/dto';
import { API_ENDPOINTS } from '@/constants';
import apiClient from '@/lib/api-client';

export const homeDataApi = {
  getHomeData: async (date: string): Promise<HomeResponseDto> => {
    const response= await apiClient.get(`${API_ENDPOINTS.HOME.BASE}/${date}`);
    return response.data
  },
};
