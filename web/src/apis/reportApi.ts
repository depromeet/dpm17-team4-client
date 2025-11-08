import { API_ENDPOINTS } from '@/constants';
import apiClient from '@/lib/api-client';
import type {
  MonthlyReportResponseDto,
  ReportDataResponseDto,
} from '@/types/dto/report.dto';

interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
  externalLink?: string;
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
  reportMonthlyData: (params?: { year?: number; month?: number }) => {
    const payload: { year?: number; month?: number } = {};
    if (typeof params?.year === 'number') {
      payload.year = params.year;
    }
    if (typeof params?.month === 'number') {
      payload.month = params.month;
    }

    return apiClient.post<ApiResponse<MonthlyReportResponseDto>>(
      API_ENDPOINTS.REPORT.MONTHLY,
      payload
    );
  },
};
