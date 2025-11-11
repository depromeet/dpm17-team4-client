import { useQuery } from '@tanstack/react-query';
import { homeDataApi } from '@/apis/homeApi';
import {
  type HomeResponseData,
  HomeResponseDto,
} from '@/app/(with-bottom-navigation)/home/types/dto';
import { QUERY_KEYS } from '@/constants';

export const useGetHomeQuery = (date: string) => {
  return useQuery<HomeResponseData>({
    queryKey: QUERY_KEYS.HOME,
    queryFn: async () => {
      const response = await homeDataApi.getHomeData(date);
      return response.data;
    },
    refetchOnMount: 'always',
  });
};
