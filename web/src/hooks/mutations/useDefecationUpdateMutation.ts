import { useMutation } from '@tanstack/react-query';
import { defecationApi } from '@/apis/defecationApi';
import type {
  DefecationDataResponseDto,
  PostDefecationDataRequestDto,
} from '@/types/dto/defecation.dto';

interface CreateDefecationUpdateMutationParams
  extends PostDefecationDataRequestDto {
  toiletRecordId: number;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useDefecationUpdateMutation = () => {
  return useMutation<
    DefecationDataResponseDto,
    Error,
    CreateDefecationUpdateMutationParams
  >({
    mutationFn: async ({ toiletRecordId, ...data }) => {
      return defecationApi.updateDefecationData(toiletRecordId, { ...data });
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
