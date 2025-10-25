import { useQuery } from '@tanstack/react-query';
import { userApi } from '@/apis/userApi';
import { QUERY_KEYS } from '@/constants';
import type { UserData } from '@/types/dto/user.dto';

export const useUserMeQuery = () => {
  return useQuery<UserData>({
    queryKey: QUERY_KEYS.USER_ME,
    queryFn: async () => {
      const response = await userApi.getMe();
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};
