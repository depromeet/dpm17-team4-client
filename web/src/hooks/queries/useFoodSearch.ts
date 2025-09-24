import { useQuery } from '@tanstack/react-query';
import { foodSearchApi } from '@/apis/foodSearchApi';
import { QUERY_KEYS } from '@/constants';
import type { FoodSearchResponseDto } from '@/app/(record)/lifestyle/types/dto';

interface UseFoodSearchParams {
  query: string;
  count?: number;
  enabled?: boolean;
}

export const useFoodSearch = ({ 
  query, 
  count = 10, 
  enabled = true 
}: UseFoodSearchParams) => {
  return useQuery<FoodSearchResponseDto, Error>({
    queryKey: QUERY_KEYS.FOODS.SEARCH(query, count),
    queryFn: () => foodSearchApi.searchFoods({ query, count }),
    enabled: enabled && query.trim().length > 0,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
};
