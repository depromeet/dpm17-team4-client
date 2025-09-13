import { API_ENDPOINTS } from '@/constants';
import apiClient from '@/lib/api-client';
import type {
  RecordDataRequestDto,
  RecordDataResponseDto,
} from '@/types/dto/record.dto';

export const recordApi = {
  recordDailyData: async (data: RecordDataRequestDto) => {
    const response = await apiClient.post<RecordDataResponseDto>(
      API_ENDPOINTS.RECORD.BASE,
      data
    );
    return response.data;
  },
};
