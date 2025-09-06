import { useQuery } from '@tanstack/react-query';
import { reportApi } from '@/apis/report/reportApi';
import { ReportDataResponseDto } from '@/types/dto/report.dto';

export const useScoreQuery = () => {
  return useQuery<ReportDataResponseDto>({
    queryKey: ['score'],
    queryFn: async () => {
      const response = await reportApi.report();
      return response.data;
    },
  });
};
