import { useQuery } from '@tanstack/react-query';
import { calendarApi } from '@/apis/calendarApi';
import { QUERY_KEYS } from '@/constants';

export const useCalendarQuery = (start: string, end: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CALENDAR, start, end],
    queryFn: () => calendarApi.getCalendarData(start, end),
    enabled: !!start && !!end,
    staleTime: 5 * 60 * 1000,
    retry: false,
    throwOnError: false,
    refetchOnWindowFocus: false,
  });
};

export const useCalendarByDateQuery = (date: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CALENDAR_BY_DATE, date],
    queryFn: () => calendarApi.getCalendarDataByDate(date),
    enabled: !!date,
    staleTime: 5 * 60 * 1000,
    retry: false,
    throwOnError: false,
    refetchOnWindowFocus: false,
  });
};

export const useDefecationRecordListQuery = (date: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.DEFECATION_RECORD_LIST, date],
    queryFn: () => calendarApi.getDefecationRecordList(date),
    enabled: !!date,
    staleTime: 5 * 60 * 1000,
    retry: false,
    throwOnError: false,
    refetchOnWindowFocus: false,
  });
};
