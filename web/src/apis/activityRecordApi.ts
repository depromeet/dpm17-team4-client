import type { LifeStyleCreateRequestDto } from '@/app/(record)/lifestyle/types/dto';
import type {
  MealTime,
  StressLevel,
} from '@/app/(record)/lifestyle/types/entitites';
import { API_ENDPOINTS } from '@/constants';
import apiClient from '@/lib/api-client';

export interface ActivityRecordResponse {
  id: number;
  waterIntakeCups: number;
  stressLevel: StressLevel;
  foods: Array<{ id: number; name: string; mealTime: MealTime }>;
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

  getActivityRecord: async (
    date: string
  ): Promise<ActivityRecordResponse | null> => {
    const response = await apiClient.get(
      `${API_ENDPOINTS.ACTIVITY_RECORDS.BASE}?date=${encodeURIComponent(date)}`
    );

    if (response.status === 200 && response.data.status === 200) {
      const data = response.data.data;
      // 빈 데이터인지 확인 (id가 null이거나 foods가 빈 배열)
      if (data.id === null || data.foods.length === 0) {
        return null;
      }
      return data;
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

  deleteActivityRecord: async (id: number) => {
    const response = await apiClient.delete(
      `${API_ENDPOINTS.ACTIVITY_RECORDS.BASE}/${id}`
    );
    return response.status;
  },
};
