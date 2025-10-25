import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '@/apis/userApi';
import { QUERY_KEYS } from '@/constants';
import type { UserUpdateRequestDto } from '@/types/dto/user.dto';

export const useUserUpdateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UserUpdateRequestDto) => {
      const response = await userApi.updateMe(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER_ME });
    },
  });
};
