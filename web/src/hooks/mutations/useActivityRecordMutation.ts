import { useMutation } from '@tanstack/react-query';
import { activityRecordApi } from '@/apis/activityRecordApi';
import { QUERY_KEYS } from '@/constants';
import { queryClient } from '@/queryClient';
import type { LifeStyleCreateRequestDto } from '@/app/(record)/lifestyle/types/dto';

interface ActivityRecordMutationParams extends LifeStyleCreateRequestDto {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useActivityRecordMutation = () => {
  return useMutation<number, Error, ActivityRecordMutationParams>({
    mutationFn: async (data) => activityRecordApi.createActivityRecord({ ...data }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ACTIVITY_RECORDS });

      if (variables.onSuccess) {
        variables.onSuccess();
      }
    },
    onError: (error, variables) => {
      if (variables.onError) {
        variables.onError(error);
      }
    },
  });
};
