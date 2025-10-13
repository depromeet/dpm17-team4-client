import { useMutation } from '@tanstack/react-query';
import { defecationApi } from '@/apis/defecationApi';
import type {
  PostDefecationDataRequestDto,
  DefecationDataResponseDto,
} from '@/types/dto/defecation.dto';

interface CreateDefecationUpdateMutationParams extends PostDefecationDataRequestDto {
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
      const { onSuccess, onError, ...defecationData } = data;
      return defecationApi.updateDefecationData(toiletRecordId, defecationData);
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
