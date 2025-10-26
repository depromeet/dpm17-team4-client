import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '@/apis/userApi';
import { getUserInfo, setUserInfo } from '@/app/auth/_components/AuthSessionProvider';
import { QUERY_KEYS } from '@/constants';
import type { UserUpdateRequestDto } from '@/types/dto/user.dto';

export const useUserUpdateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UserUpdateRequestDto) => {
      const response = await userApi.updateMe(data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER_ME });
      
      // localStorage에 저장된 사용자 정보도 업데이트
      if (variables.nickname) {
        const userInfo = getUserInfo();
        if (userInfo) {
          setUserInfo({
            ...userInfo,
            nickname: variables.nickname,
          });
        }
      }
    },
  });
};
