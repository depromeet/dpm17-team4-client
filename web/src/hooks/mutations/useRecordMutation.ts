import { useMutation } from '@tanstack/react-query';
import { recordApi } from '@/apis/recordApi';
import type {
  RecordDataRequestDto,
  RecordDataResponseDto,
} from '@/types/dto/record.dto';

interface RecordMutationParams extends RecordDataRequestDto {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useRecordMutation = () => {
  return useMutation<RecordDataResponseDto, Error, RecordMutationParams>({
    mutationFn: async (data) => recordApi.recordDailyData({ ...data }),
    onSuccess: (_data, variables) => {
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
