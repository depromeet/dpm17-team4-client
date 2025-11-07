'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useLayoutEffect, useMemo, useState } from 'react';
import {
  getAccessToken,
  requestAccessToken,
  setAccessToken,
} from '@/app/auth/_components/AuthSessionProvider';
import { PAGE_ROUTES } from '@/constants';
import BottomSheetContainer from '../_components/BottomSheetContainer';
import { AuthContent } from '../page';

function AuthTermsBottomsheetContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showTermsBottomSheet, setShowTermsBottomSheet] = useState(true);

  // ✅ 인증 콜백 파라미터 존재 여부 (있으면 렌더 스킵)
  const hasAuthParams = useMemo(() => {
    return Boolean(
      searchParams.get('id') ||
        searchParams.get('nickname') ||
        searchParams.get('profileImage') ||
        searchParams.get('isNew') ||
        searchParams.get('providerType')
    );
  }, [searchParams]);

  useLayoutEffect(() => {
    // 토큰은 백그라운드로 시도
    (async () => {
      try {
        const currentAccessToken = getAccessToken();
        if (!currentAccessToken) {
          const { accessToken } = await requestAccessToken();
          if (accessToken) setAccessToken(accessToken);
        }
      } catch (e) {
        console.error('⚠️ AccessToken 갱신 실패(무시하고 진행):', e);
      }
    })();
  }, []);

  const handleTermsAgree = () => {
    setShowTermsBottomSheet(false);

    //TODO: 약관 동의한 이후에 알림 바텀싯
    router.push(PAGE_ROUTES.ONBOARDING_PROFILE);
  };

  const handleBottomSheetClose = async () => {
    // 약관 동의 바텀시트를 닫으면 회원 탈퇴 처리
    setShowTermsBottomSheet(false);

    try {
      const { userApi } = await import('@/apis/userApi');
      await userApi.deleteMe();
      console.log('✅ 온보딩 중 이탈 - 회원 탈퇴 완료');
    } catch (error) {
      console.error('❌ 온보딩 중 이탈 - 회원 탈퇴 실패:', error);
    } finally {
      // 로컬 데이터 정리 및 인증 페이지로 리다이렉트
      const { clearAccessToken, clearUserInfo } = await import(
        '@/app/auth/_components/AuthSessionProvider'
      );
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
      window.location.href = PAGE_ROUTES.AUTH;
    }
  };

  if (hasAuthParams) return null;

  return (
    <div>
      <AuthContent />

      {/* 바텀시트 */}
      <BottomSheetContainer
        isOpen={showTermsBottomSheet}
        onClose={handleBottomSheetClose}
        onAgree={handleTermsAgree}
      />
    </div>
  );
}

export default function AuthTermsBottomsheetPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthTermsBottomsheetContent />
    </Suspense>
  );
}
