import { API_ENDPOINTS } from '@/constants';
import apiClient from '@/lib/api-client';
import type { TermsResponseDto } from '@/types/dto/terms.dto';

export const termsApi = {
  getTerms: async () => {
    const response = await apiClient.get<TermsResponseDto>(
      API_ENDPOINTS.TERMS.BASE
    );
    return response.data;
  },
};
