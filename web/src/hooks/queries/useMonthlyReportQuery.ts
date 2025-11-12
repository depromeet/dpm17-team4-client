import { useQuery } from '@tanstack/react-query';
import { reportApi } from '@/apis/reportApi';
import { QUERY_KEYS } from '@/constants';
import type { MonthlyReportResponseDto } from '@/types/dto/report.dto';

export interface UseMonthlyReportQueryParams {
  yearMonth?: string;
}

export const useMonthlyReportQuery = (params?: UseMonthlyReportQueryParams) => {
  const queryKey = [
    ...QUERY_KEYS.REPORT_MONTHLY,
    params?.yearMonth ?? 'current',
  ];

  return useQuery<MonthlyReportResponseDto>({
    queryKey,
    queryFn: async () => {
      const response = await reportApi.reportMonthlyData(params);
      return response.data.data;
    },
  });
};
