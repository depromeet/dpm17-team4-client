import { useQuery } from '@tanstack/react-query';
import { activityRecordApi } from '@/apis/activityRecordApi';
import { QUERY_KEYS } from '@/constants';

export const useActivityRecordQuery = (date: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ACTIVITY_RECORDS, date],
    queryFn: () => activityRecordApi.getActivityRecord(date),
    enabled: !!date,
    staleTime: 5 * 60 * 1000, // 5분
  });
};
