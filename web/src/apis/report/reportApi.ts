import apiClient from '@/lib/api-client';
import { ReportDataResponseDto } from '@/types/dto/report.dto';
import { API_ENDPOINTS } from '@/constants';

export const reportApi = {
  report: (): Promise<{ data: ReportDataResponseDto }> =>
    apiClient.get<ReportDataResponseDto>(API_ENDPOINTS.REPORT.BASE),
};
