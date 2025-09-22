import { useMutation } from '@tanstack/react-query';
import { defecationApi } from '@/apis/defecationApi';
import type {
  PostDefecationDataRequestDto,
  PostDefecationDataResponseDto,
} from '@/types/dto/defecation.dto';

interface CreateDefecationMutationParams extends PostDefecationDataRequestDto {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useCreateDefecationMutation = () => {
  return useMutation<
    PostDefecationDataResponseDto,
    Error,
    CreateDefecationMutationParams
  >({
    mutationFn: async (data) => defecationApi.postDefecationData({ ...data }),
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
