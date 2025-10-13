import { API_ENDPOINTS } from '@/constants';
import apiClient from '@/lib/api-client';
import type {
  DefecationDataResponseDto,
  PostDefecationDataRequestDto,
} from '@/types/dto/defecation.dto';

export const defecationApi = {
  postDefecationData: async (data: PostDefecationDataRequestDto) => {
    const response = await apiClient.post<DefecationDataResponseDto>(
      API_ENDPOINTS.DEFECATION.BASE,
      data
    );
    return response.data;
  },

  getDefecationData: async (toiletRecordId: number) => {
    const response = await apiClient.get<DefecationDataResponseDto>(
      `${API_ENDPOINTS.DEFECATION.BASE}/${toiletRecordId}/detail`
    );
    return response.data;
  },

  updateDefecationData: async (
    toiletRecordId: number,
    data: PostDefecationDataRequestDto
  ) => {
    const response = await apiClient.patch<DefecationDataResponseDto>(
      `${API_ENDPOINTS.DEFECATION.BASE}/${toiletRecordId}`,
      data
    );
    return response.data;
  },

  deleteDefecationData: async (toiletRecordId: number) => {
    const response = await apiClient.delete<DefecationDataResponseDto>(
      `${API_ENDPOINTS.DEFECATION.BASE}/${toiletRecordId}`
    );
    return response.data;
  },
};
