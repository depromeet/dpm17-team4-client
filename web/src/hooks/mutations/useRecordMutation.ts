import { useMutation, useQueryClient } from '@tanstack/react-query';
import { recordApi } from '@/apis/record/recordApi';
import {
  RecordDataRequestDto,
  RecordDataResponseDto,
} from '@/types/dto/record.dto';

interface RecordColorParams extends RecordDataRequestDto {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useRecordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<RecordDataResponseDto, Error, RecordColorParams>({
    mutationFn: async (params: RecordColorParams) => {
      const response = await recordApi.record({ color: params.color });
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['score'] });

      if (variables.onSuccess) {
        variables.onSuccess();
      }
    },
    onError: (error: Error, variables) => {
      if (variables.onError) {
        variables.onError(error);
      }
    },
  });
};
