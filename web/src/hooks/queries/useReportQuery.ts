import { useQuery } from '@tanstack/react-query';
import { reportApi } from '@/apis/reportApi';
import { ReportDataResponseDto } from '@/types/dto/report.dto';
import { QUERY_KEYS } from '@/constants';

export const useReportQuery = () => {
  return useQuery<ReportDataResponseDto>({
    queryKey: QUERY_KEYS.REPORT,
    queryFn: async () => {
      const response = await reportApi.reportDailyData();
      return response.data;
    },
  });
};
