import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '@/apis/userApi';
import { QUERY_KEYS } from '@/constants';
import type { UserUpdateRequestDto, UserData } from '@/types/dto/user.dto';

export const useUserUpdateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UserUpdateRequestDto) => {
      const response = await userApi.updateMe(data);
      return response.data;
    },
    onSuccess: (updatedUser: UserData) => {
      // 사용자 정보 쿼리 무효화하여 최신 데이터로 업데이트
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER_ME });
      
      // 또는 직접 캐시 업데이트
      queryClient.setQueryData(QUERY_KEYS.USER_ME, updatedUser);
    },
  });
};
