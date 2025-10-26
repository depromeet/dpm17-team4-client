import { useMutation, useQueryClient } from '@tanstack/react-query';
import { activityRecordApi } from '@/apis/activityRecordApi';
import { QUERY_KEYS } from '@/constants';

interface ActivityRecordDeleteMutationParams {
  id: number;
  date?: string; // 삭제된 레코드의 날짜
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useActivityRecordDeleteMutation = (
  callbacks?: Pick<ActivityRecordDeleteMutationParams, 'onSuccess' | 'onError'>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: ActivityRecordDeleteMutationParams) => {
      return activityRecordApi.deleteActivityRecord(id);
    },
    onSuccess: (_, variables) => {
      // 캘린더 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CALENDAR],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CALENDAR_BY_DATE],
      });

      // 특정 날짜의 쿼리만 정확히 무효화하고 즉시 refetch
      if (variables.date) {
        // 즉시 refetch로 최신 데이터 확보
        queryClient.removeQueries({
          queryKey: [QUERY_KEYS.ACTIVITY_RECORDS, variables.date],
        });
      }

      if (callbacks?.onSuccess) {
        callbacks.onSuccess();
      }
    },
    onError: callbacks?.onError,
  });
};
