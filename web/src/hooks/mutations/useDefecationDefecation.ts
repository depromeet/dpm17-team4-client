import { useMutation } from '@tanstack/react-query';
import { defecationApi } from '@/apis/defecationApi';
import type {
  PostDefecationDataRequestDto,
  DefecationDataResponseDto,
} from '@/types/dto/defecation.dto';

interface CreateDefecationMutationParams extends PostDefecationDataRequestDto {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useDefecationMutation = () => {
  return useMutation<
    DefecationDataResponseDto,
    Error,
    CreateDefecationMutationParams
  >({
    mutationFn: async (data) => {
      const { onSuccess, onError, ...defecationData } = data;
      return defecationApi.postDefecationData(defecationData);
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
