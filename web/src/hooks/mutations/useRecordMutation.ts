import { useMutation } from '@tanstack/react-query';
import { recordApi } from '@/apis/recordApi';
import {
  RecordDataRequestDto,
  RecordDataResponseDto,
} from '@/types/dto/record.dto';
import { QUERY_KEYS } from '@/constants';
import { queryClient } from '@/queryClient';

interface RecordMutationParams extends RecordDataRequestDto {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useRecordMutation = () => {
  return useMutation<RecordDataResponseDto, Error, RecordMutationParams>({
    mutationFn: async (data) => recordApi.recordDailyData({ ...data }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.RECORD });

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
