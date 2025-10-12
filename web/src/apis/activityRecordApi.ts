import type { LifeStyleCreateRequestDto } from '@/app/(record)/lifestyle/types/dto';
import { API_ENDPOINTS } from '@/constants';
import apiClient from '@/lib/api-client';

export interface ActivityRecordResponse {
  id: number;
  waterIntakeCups: number;
  stressLevel: string;
  foods: Array<{ id: number; name: string; mealTime: string }>;
  occurredAt: string;
}

export const activityRecordApi = {
  createActivityRecord: async (data: LifeStyleCreateRequestDto) => {
    const response = await apiClient.post(
      API_ENDPOINTS.ACTIVITY_RECORDS.BASE,
      data
    );
    return response.status;
  },

  getActivityRecord: async (date: string): Promise<ActivityRecordResponse | null> => {
    const response = await apiClient.get(
      `${API_ENDPOINTS.ACTIVITY_RECORDS.BASE}?date=${encodeURIComponent(date)}`
    );
    
    if (response.status === 200 && response.data.status === 200) {
      return response.data.data;
    }
    
    return null;
  },

  updateActivityRecord: async (id: number, data: LifeStyleCreateRequestDto) => {
    const response = await apiClient.patch(
      `${API_ENDPOINTS.ACTIVITY_RECORDS.BASE}/${id}`,
      data
    );
    return response.status;
  },
};
