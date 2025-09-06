import { useMutation } from '@tanstack/react-query';
import { recordApi } from '@/apis/recordApi';
import {
  RecordDataRequestDto,
  RecordDataResponseDto,
} from '@/types/dto/record.dto';
import { QUERY_KEYS } from '@/constants';
import { queryClient } from '@/queryClient';

interface RecordColorParams extends RecordDataRequestDto {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useRecordMutation = () => {
  return useMutation<RecordDataResponseDto, Error, RecordColorParams>({
    mutationFn: async (params: RecordColorParams) => {
      const response = await recordApi.record({ color: params.color });
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.RECORDS });

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
