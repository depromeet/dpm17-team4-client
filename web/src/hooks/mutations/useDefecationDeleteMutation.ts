import { useMutation } from '@tanstack/react-query';
import { defecationApi } from '@/apis/defecationApi';
import type {
  DefecationDataResponseDto,
  PostDefecationDataRequestDto,
} from '@/types/dto/defecation.dto';

interface CreateDefecationDeleteMutationParams
  extends PostDefecationDataRequestDto {
  toiletRecordId: number;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useDefecationDeleteMutation = () => {
  return useMutation<
    DefecationDataResponseDto,
    Error,
    CreateDefecationDeleteMutationParams
  >({
    mutationFn: async ({ toiletRecordId }) => {
      return defecationApi.deleteDefecationData(toiletRecordId);
    },
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
