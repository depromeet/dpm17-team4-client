import { useQuery } from '@tanstack/react-query';
import { reportApi } from '@/apis/reportApi';
import { QUERY_KEYS } from '@/constants';
import type { ReportDataResponseDto } from '@/types/dto/report.dto';

export const useReportQuery = () => {
  return useQuery<ReportDataResponseDto>({
    queryKey: QUERY_KEYS.REPORT,
    queryFn: async () => {
      const response = await reportApi.reportDailyData();
      return response.data.data; // API 응답의 data.data 필드를 반환
    },
  });
};
