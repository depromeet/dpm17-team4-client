import { homeDataApi } from "@/apis/homeApi";
import { HomeResponseData, HomeResponseDto } from "@/app/(with-bottom-navigation)/home/types/dto";
import { QUERY_KEYS } from "@/constants";
import { useQuery } from "@tanstack/react-query";


export const useGetHomeQuery = (date: string) => {
  return useQuery<HomeResponseData>({
    queryKey: QUERY_KEYS.HOME,
    queryFn: async () => {
      const response = await homeDataApi.getHomeData(date)
      return response.data
    },
    refetchOnMount: 'always',
  });
};