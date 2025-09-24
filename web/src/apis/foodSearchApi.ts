import { FoodSearchParams, FoodSearchResponseDto } from '@/app/(record)/lifestyle/types/dto';
import { API_ENDPOINTS } from '@/constants';
import apiClient from '@/lib/api-client';

export const foodSearchApi = {
  searchFoods: async (params: FoodSearchParams) => {
    const { query, count = 10 } = params;
    
    const response = await apiClient.get<FoodSearchResponseDto>(
      API_ENDPOINTS.FOODS.SEARCH,
      {
        params: {
          query,
          count,
        },
      }
    );
    
    return response.data;
  },
};
