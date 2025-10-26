import { useQuery } from '@tanstack/react-query';
import { reportApi } from '@/apis/reportApi';
import { QUERY_KEYS } from '@/constants';
import type { ReportDataResponseDto } from '@/types/dto/report.dto';

interface UseReportQueryParams {
  dateTime?: string; // YYYY-MM-DD 형태의 날짜 문자열
}

export const useReportQuery = (params?: UseReportQueryParams) => {
  return useQuery<ReportDataResponseDto>({
    queryKey: QUERY_KEYS.REPORT,
    queryFn: async () => {
      const response = await reportApi.reportDailyData(params?.dateTime);
      return response.data.data;
    },
    refetchOnMount: 'always',
  });
};
