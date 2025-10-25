import { useQuery } from '@tanstack/react-query';
import { termsApi } from '@/apis/termsApi';
import { QUERY_KEYS } from '@/constants';
import type { TermsItem } from '@/types/dto/terms.dto';

export const useTermsQuery = () => {
  return useQuery<TermsItem[]>({
    queryKey: QUERY_KEYS.TERMS,
    queryFn: async () => {
      const response = await termsApi.getTerms();
      return response.data; // API 응답의 data 필드만 반환
    },
  });
};
