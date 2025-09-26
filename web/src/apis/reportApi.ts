import { API_ENDPOINTS } from '@/constants';
import apiClient from '@/lib/api-client';
import type { ReportDataResponseDto } from '@/types/dto/report.dto';

interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export const reportApi = {
  reportDailyData: () =>
    apiClient.get<ApiResponse<ReportDataResponseDto>>(
      API_ENDPOINTS.REPORT.BASE
    ),
};
