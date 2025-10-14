import { useQuery } from '@tanstack/react-query';
import { defecationApi } from '@/apis/defecationApi';
import { QUERY_KEYS } from '@/constants';

export const useDefecationQuery = (toiletRecordId: number) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.DEFECATION, toiletRecordId],
    queryFn: () => defecationApi.getDefecationData(toiletRecordId),
    enabled: !!toiletRecordId,
    gcTime: 10 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });
};
