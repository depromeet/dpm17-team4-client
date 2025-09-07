import apiClient from '@/lib/api-client';
import {
  RecordDataRequestDto,
  RecordDataResponseDto,
} from '@/types/dto/record.dto';
import { API_ENDPOINTS } from '@/constants';

export const recordApi = {
  recordDailyData: async (data: RecordDataRequestDto) => {
    const response = await apiClient.post<RecordDataResponseDto>(
      API_ENDPOINTS.RECORD.BASE,
      data
    );
    return response.data;
  },
};
