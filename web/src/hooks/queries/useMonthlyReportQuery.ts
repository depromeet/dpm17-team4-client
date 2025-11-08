import { useQuery } from '@tanstack/react-query';
import { reportApi } from '@/apis/reportApi';
import { QUERY_KEYS } from '@/constants';
import type { MonthlyReportResponseDto } from '@/types/dto/report.dto';

export interface UseMonthlyReportQueryParams {
  year?: number;
  month?: number;
}

export const useMonthlyReportQuery = (params?: UseMonthlyReportQueryParams) => {
  const queryKey = [
    ...QUERY_KEYS.REPORT_MONTHLY,
    params?.year ?? 'current',
    params?.month ?? 'current',
  ];

  return useQuery<MonthlyReportResponseDto>({
    queryKey,
    queryFn: async () => {
      const response = await reportApi.reportMonthlyData(params);
      return response.data.data;
    },
  });
};
