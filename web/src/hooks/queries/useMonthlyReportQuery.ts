import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { reportApi } from '@/apis/reportApi';
import { QUERY_KEYS } from '@/constants';
import type { MonthlyReportResponseDto } from '@/types/dto/report.dto';

export interface UseMonthlyReportQueryParams {
  yearMonth?: string;
}

export const INSUFFICIENT_DATA = Symbol('INSUFFICIENT_DATA');
export type InsufficientDataMarker = typeof INSUFFICIENT_DATA;

export const useMonthlyReportQuery = (params?: UseMonthlyReportQueryParams) => {
  const queryKey = [
    ...QUERY_KEYS.REPORT_MONTHLY,
    params?.yearMonth ?? 'current',
  ];

  return useQuery<MonthlyReportResponseDto | InsufficientDataMarker | null>({
    queryKey,
    queryFn: async () => {
      try {
        const response = await reportApi.reportMonthlyData(params);
        return response.data.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 400) {
          if (
            error.response?.data.message ===
            '리포트 생성에 필요한 데이터가 부족합니다.'
          ) {
            return INSUFFICIENT_DATA;
          }
        }
        return null;
      }
    },
    refetchOnMount: 'always',
  });
};
