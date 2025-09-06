import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants';

// 공통 쿼리 옵션 타입
export interface CommonQueryOptions<TData = any, TError = Error> {
  staleTime?: number;
  gcTime?: number;
  retry?: number | boolean | ((failureCount: number, error: TError) => boolean);
  retryDelay?: number | ((retryAttempt: number, error: TError) => number);
  refetchOnWindowFocus?: boolean;
  refetchOnMount?: boolean;
  refetchOnReconnect?: boolean;
  enabled?: boolean;
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
  onSettled?: (data: TData | undefined, error: TError | null) => void;
}

// API 쿼리 옵션 (기본 설정 포함)
export interface ApiQueryOptions<TData = any, TError = Error> extends CommonQueryOptions<TData, TError> {
  queryKey: string[];
  queryFn: () => Promise<TData>;
}

// 공통 쿼리 훅
export const useCommonQuery = <TData = any, TError = Error>(
  options: ApiQueryOptions<TData, TError>
) => {
  const {
    queryKey,
    queryFn,
    staleTime = 5 * 60 * 1000, // 5분
    gcTime = 10 * 60 * 1000, // 10분
    retry = 2,
    refetchOnWindowFocus = false,
    refetchOnMount = true,
    refetchOnReconnect = true,
    onSuccess,
    onError,
    onSettled,
    ...restOptions
  } = options;

  return useQuery<TData, TError>({
    queryKey,
    queryFn,
    staleTime,
    gcTime,
    retry,
    refetchOnWindowFocus,
    refetchOnMount,
    refetchOnReconnect,
    onSuccess,
    onError,
    onSettled,
    ...restOptions,
  });
};

// API 호출을 위한 간단한 쿼리 훅
export const useApiQuery = <TData = any, TError = Error>(
  queryKey: string[],
  queryFn: () => Promise<TData>,
  options?: CommonQueryOptions<TData, TError>
) => {
  return useCommonQuery({
    queryKey,
    queryFn,
    ...options,
  });
};

// 페이지네이션 쿼리 훅
export const usePaginatedQuery = <TData = any, TError = Error>(
  baseQueryKey: string[],
  queryFn: (page: number, limit: number) => Promise<TData>,
  page: number = 1,
  limit: number = 10,
  options?: CommonQueryOptions<TData, TError>
) => {
  return useCommonQuery({
    queryKey: [...baseQueryKey, { page, limit }],
    queryFn: () => queryFn(page, limit),
    ...options,
  });
};

// 검색 쿼리 훅
export const useSearchQuery = <TData = any, TError = Error>(
  baseQueryKey: string[],
  queryFn: (searchTerm: string) => Promise<TData>,
  searchTerm: string,
  options?: CommonQueryOptions<TData, TError>
) => {
  return useCommonQuery({
    queryKey: [...baseQueryKey, { search: searchTerm }],
    queryFn: () => queryFn(searchTerm),
    enabled: searchTerm.length > 0, // 검색어가 있을 때만 실행
    ...options,
  });
};

// 조건부 쿼리 훅
export const useConditionalQuery = <TData = any, TError = Error>(
  queryKey: string[],
  queryFn: () => Promise<TData>,
  condition: boolean,
  options?: CommonQueryOptions<TData, TError>
) => {
  return useCommonQuery({
    queryKey,
    queryFn,
    enabled: condition,
    ...options,
  });
};
