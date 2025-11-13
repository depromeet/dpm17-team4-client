import { API_ENDPOINTS } from '@/constants';
import apiClient from '@/lib/api-client';
import type {
  MonthlyReportResponseDto,
  ReportDataResponseDto,
  WeeklyReportResponseDto,
} from '@/types/dto/report.dto';

interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
  externalLink?: string;
}

export const reportApi = {
  reportDailyData: (dateTime?: string) => {
    const url = dateTime
      ? `${API_ENDPOINTS.REPORT.BASE}?dateTime=${dateTime}T00:00:00`
      : API_ENDPOINTS.REPORT.BASE;

    return apiClient.get<ApiResponse<ReportDataResponseDto>>(url);
  },

  reportWeeklyData: (dateTime?: string) => {
    if (dateTime) {
      const localDateTime = `${dateTime}T00:00:00`;
      const url = `${API_ENDPOINTS.REPORT.WEEKLY}?dateTime=${localDateTime}`;
      return apiClient.get<ApiResponse<WeeklyReportResponseDto>>(url);
    } else {
      return apiClient.get<ApiResponse<WeeklyReportResponseDto>>(
        API_ENDPOINTS.REPORT.WEEKLY
      );
    }
  },

  reportMonthlyData: (params?: { yearMonth?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.yearMonth) {
      searchParams.append('yearMonth', params.yearMonth);
    }
    const endpoint = searchParams.toString()
      ? `${API_ENDPOINTS.REPORT.MONTHLY}?${searchParams.toString()}`
      : API_ENDPOINTS.REPORT.MONTHLY;

    return apiClient.post<ApiResponse<MonthlyReportResponseDto>>(endpoint);
  },
};
