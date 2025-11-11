import { useQuery } from '@tanstack/react-query';
import { reportApi } from '@/apis/reportApi';
import { QUERY_KEYS } from '@/constants';
import type { WeeklyReportResponseDto } from '@/types/dto/report.dto';

interface UseReportQueryParams {
  dateTime?: string; // YYYY-MM-DD 형태의 날짜 문자열
}

export const useWeeklyReportQuery = (params?: UseReportQueryParams) => {
  return useQuery<WeeklyReportResponseDto>({
    queryKey: [...QUERY_KEYS.REPORT_WEEKLY, params?.dateTime],
    queryFn: async () => {
      const response = await reportApi.reportWeeklyData(params?.dateTime);
      return response.data.data;
    },
    refetchOnMount: 'always',
  });
};
