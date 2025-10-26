import { API_ENDPOINTS } from '@/constants';
import apiClient from '@/lib/api-client';
import type {
  CalendarDataByDateResponseDtoResponseDto,
  CalendarDataResponseDto,
  DefecationRecordListResponseDtoResponseDto,
} from '@/types/dto/defecation.dto';

export const calendarApi = {
  getCalendarData: async (start: string, end: string) => {
    const response = await apiClient.get<CalendarDataResponseDto>(
      `${API_ENDPOINTS.CALENDAR.BASE}?start=${start}&end=${end}`
    );
    return response.data;
  },

  getCalendarDataByDate: async (date: string) => {
    const response =
      await apiClient.get<CalendarDataByDateResponseDtoResponseDto>(
        `${API_ENDPOINTS.CALENDAR.BASE}/${date}`
      );
    return response.data;
  },

  getDefecationRecordList: async (date: string) => {
    const response =
      await apiClient.get<DefecationRecordListResponseDtoResponseDto>(
        `${API_ENDPOINTS.CALENDAR.BASE}/poo-records?date=${date}`
      );
    return response.data;
  },
};
