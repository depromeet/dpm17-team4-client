'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { logout } from '@/app/auth/_components/AuthSessionProvider';
import { PAGE_ROUTES } from '@/constants';

export const useLogout = () => {
  const _router = useRouter();

  const handleLogout = useCallback(async () => {
    console.log('🚪 로그아웃 시작');
    try {
      await logout();
      console.log('✅ 로그아웃 API 호출 완료');
    } catch (error) {
      console.error('❌ 로그아웃 처리 중 오류:', error);
    } finally {
      console.log('🔄 인증 페이지로 리다이렉트:', PAGE_ROUTES.AUTH);
      // 로그아웃 후 인증 페이지로 직접 리다이렉트 (새로고침 포함)
      window.location.href = PAGE_ROUTES.AUTH + `?toast-logout-success=true`;
    }
  }, []);

  return { handleLogout };
};
