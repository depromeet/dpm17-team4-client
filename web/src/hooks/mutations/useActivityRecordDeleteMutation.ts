import { useMutation } from '@tanstack/react-query';
import { activityRecordApi } from '@/apis/activityRecordApi';

interface ActivityRecordDeleteMutationParams {
  id: number;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useActivityRecordDeleteMutation = () => {
  return useMutation({
    mutationFn: async ({ id }: ActivityRecordDeleteMutationParams) => {
      return activityRecordApi.deleteActivityRecord(id);
    },
  });
};
