import { useQuery } from '@tanstack/react-query';
import { calendarApi } from '@/apis/calendarApi';
import { QUERY_KEYS } from '@/constants';

export const useCalendarQuery = (start: string, end: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CALENDAR, start, end],
    queryFn: () => calendarApi.getCalendarData(start, end),
    enabled: !!start && !!end,
    staleTime: 5 * 60 * 1000,
  });
};
