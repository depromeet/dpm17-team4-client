import { API_ENDPOINTS } from '@/constants';
import apiClient from '@/lib/api-client';
import type { ReportDataResponseDto } from '@/types/dto/report.dto';

interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export const reportApi = {
  reportDailyData: (dateTime?: string) => {
    if (dateTime) {
      const localDateTime = `${dateTime}T00:00:00`;
      const url = `${API_ENDPOINTS.REPORT.BASE}?dateTime=${localDateTime}`;
      return apiClient.get<ApiResponse<ReportDataResponseDto>>(url);
    }

    return apiClient.get<ApiResponse<ReportDataResponseDto>>(
      API_ENDPOINTS.REPORT.BASE
    );
  },
};
