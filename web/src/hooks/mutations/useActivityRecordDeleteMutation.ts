import { useMutation } from '@tanstack/react-query';
import { activityRecordApi } from '@/apis/activityRecordApi';

interface ActivityRecordDeleteMutationParams {
  id: number;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useActivityRecordDeleteMutation = (
  callbacks?: Pick<ActivityRecordDeleteMutationParams, 'onSuccess' | 'onError'>
) => {
  return useMutation({
    mutationFn: async ({ id }: ActivityRecordDeleteMutationParams) => {
      return activityRecordApi.deleteActivityRecord(id);
    },
    onSuccess: callbacks?.onSuccess,
    onError: callbacks?.onError,
  });
};
