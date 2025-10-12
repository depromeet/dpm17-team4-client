import { useMutation } from '@tanstack/react-query';
import { activityRecordApi } from '@/apis/activityRecordApi';
import type { LifeStyleCreateRequestDto } from '@/app/(record)/lifestyle/types/dto';

interface ActivityRecordUpdateMutationParams extends LifeStyleCreateRequestDto {
  id: number;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useActivityRecordUpdateMutation = () => {
  return useMutation({
    mutationFn: async ({
      id,
      water,
      stress,
      foods,
      occurredAt,
    }: ActivityRecordUpdateMutationParams) => {
      return activityRecordApi.updateActivityRecord(id, {
        water,
        stress,
        foods,
        occurredAt,
      });
    },
  });
};
