import type { LifeStyleCreateRequestDto } from '@/app/(record)/lifestyle/types/dto';
import { API_ENDPOINTS } from '@/constants';
import apiClient from '@/lib/api-client';

export interface ActivityRecordResponseDto {
  success: boolean;
  message: string;
  data: {
    water: number;
    stress: string;
    foods: Array<{
      foodId: number;
      mealTime: string;
    }>;
    occurredAt: string;
  };
}

export const activityRecordApi = {
  createActivityRecord: async (data: LifeStyleCreateRequestDto) => {
    const response = await apiClient.post(
      API_ENDPOINTS.ACTIVITY_RECORDS.BASE,
      data
    );
    return response.status;
  },
};
