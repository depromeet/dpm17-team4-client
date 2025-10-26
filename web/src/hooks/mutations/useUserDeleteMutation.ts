import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { userApi } from '@/apis/userApi';
import { QUERY_KEYS } from '@/constants';
import { PAGE_ROUTES } from '@/constants';
import { clearAccessToken, clearUserInfo } from '@/app/auth/_components/AuthSessionProvider';

export const useUserDeleteMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const response = await userApi.deleteMe();
      return response;
    },
    onSuccess: async () => {
      console.log('✅ 회원 탈퇴 성공');
      
      // 모든 쿼리 캐시 무효화
      queryClient.clear();
      
      // 로컬 저장소 및 메모리에서 토큰과 사용자 정보 제거
      clearAccessToken();
      clearUserInfo();
      
      // 세션 캐시도 정리
      try {
        const { clearClientSessionCache } = await import('@/lib/session');
        clearClientSessionCache();
      } catch (error) {
        console.warn('⚠️ 세션 캐시 정리 실패:', error);
      }
      
      // 인증 페이지로 리다이렉트
      console.log('🔄 인증 페이지로 리다이렉트:', PAGE_ROUTES.AUTH);
      window.location.href = PAGE_ROUTES.AUTH;
    },
    onError: (error) => {
      console.error('❌ 회원 탈퇴 실패:', error);
    },
  });
};
