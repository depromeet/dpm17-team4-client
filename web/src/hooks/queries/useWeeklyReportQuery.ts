import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { reportApi } from '@/apis/reportApi';
import { QUERY_KEYS } from '@/constants';
import type { WeeklyReportResponseDto } from '@/types/dto/report.dto';

interface UseReportQueryParams {
  dateTime?: string;
}

export const INSUFFICIENT_DATA = Symbol('INSUFFICIENT_DATA');
export type InsufficientDataMarker = typeof INSUFFICIENT_DATA;

export const useWeeklyReportQuery = (params?: UseReportQueryParams) => {
  return useQuery<WeeklyReportResponseDto | InsufficientDataMarker | null>({
    queryKey: [...QUERY_KEYS.REPORT_WEEKLY, params?.dateTime],
    queryFn: async () => {
      try {
        const response = await reportApi.reportWeeklyData(params?.dateTime);
        return response.data.data;
      } catch (error) {
        // NOTE(taehyeon): 데이터 부족 에러인 경우 데이터 부족 상태 반환
        if (axios.isAxiosError(error) && error.response?.status === 400) {
          if (
            error.response?.data.message ===
            '리포트 생성에 필요한 데이터가 부족합니다.'
          ) {
            return INSUFFICIENT_DATA;
          }
        }
        // NOTE(taehyeon): 기타 에러인 경우 null 반환
        return null;
      }
    },
    refetchOnMount: 'always',
  });
};
