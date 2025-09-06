import apiClient from '@/lib/api-client';
import { ReportDataResponseDto } from '@/types/dto/report.dto';

export const reportApi = {
  report: (): Promise<{ data: ReportDataResponseDto }> =>
    apiClient.get<ReportDataResponseDto>('/api/report'),
};
