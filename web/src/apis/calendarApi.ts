import { API_ENDPOINTS } from '@/constants';
import apiClient from '@/lib/api-client';
import type { CalendarDataResponseDto } from '@/types/dto/defecation.dto';

export const calendarApi = {
  getCalendarData: async (start: string, end: string) => {
    const response = await apiClient.get<CalendarDataResponseDto>(
      `${API_ENDPOINTS.CALENDAR.BASE}?start=${start}&end=${end}`
    );
    return response.data;
  },
};
