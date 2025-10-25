import { useSuspenseQuery } from '@tanstack/react-query';
import { userApi } from '@/apis/userApi';
import { QUERY_KEYS } from '@/constants';
import type { UserData } from '@/types/dto/user.dto';

export const useUserMeQuery = () => {
  return useSuspenseQuery<UserData>({
    queryKey: QUERY_KEYS.USER_ME,
    queryFn: async () => {
      const response = await userApi.getMe();
      return response.data; // API 응답의 data 필드만 반환
    },
  });
};
