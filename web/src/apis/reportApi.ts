import { API_ENDPOINTS } from '@/constants';
import apiClient from '@/lib/api-client';
import type { ReportDataResponseDto } from '@/types/dto/report.dto';

export const reportApi = {
  reportDailyData: (): Promise<{ data: ReportDataResponseDto }> =>
    apiClient.get<ReportDataResponseDto>(API_ENDPOINTS.REPORT.BASE),
};
