import { API_ENDPOINTS } from '@/constants';
import apiClient from '@/lib/api-client';
import type {
  PostDefecationDataRequestDto,
  PostDefecationDataResponseDto,
} from '@/types/dto/defecation.dto';

export const defecationApi = {
  postDefecationData: async (data: PostDefecationDataRequestDto) => {
    const response = await apiClient.post<PostDefecationDataResponseDto>(
      API_ENDPOINTS.DEFECATION.BASE,
      data
    );
    return response.data;
  },
};
