'use client';

import { useEffect } from 'react';

/**
 * 일회성 쿠키 정리 컴포넌트
 *
 * 목적: 기존 사용자들에게 남아있는 오래된 .kkruk.com 쿠키를 정리
 *
 * 배포 계획:
 * 1. 이 컴포넌트를 layout.tsx에 추가하여 배포
 * 2. 일주일 정도 유지 (모든 사용자가 앱을 한 번씩 열 때까지)
 * 3. 일주일 후 이 컴포넌트 제거
 *
 * 주의: 서버 수정 후에만 이 컴포넌트를 사용하세요!
 * - 서버가 OAuth 시에도 domain 없이 쿠키를 생성해야 함
 * - 그렇지 않으면 새 쿠키도 삭제되어 로그인이 풀림
 */
export default function LegacyCookieCleanup() {
  useEffect(() => {
    // localStorage에 정리 완료 여부 저장 (한 번만 실행)
    const CLEANUP_KEY = 'legacy_cookie_cleanup_done_v1';

    if (localStorage.getItem(CLEANUP_KEY)) {
      console.log('✅ 레거시 쿠키 정리 이미 완료됨');
      return;
    }

    try {
      console.log('🧹 레거시 .kkruk.com 쿠키 정리 시작');

      // .kkruk.com 도메인의 오래된 쿠키 삭제
      // biome-ignore lint: 레거시 쿠키 정리를 위한 일회성 코드
      document.cookie =
        'refreshToken=; domain=.kkruk.com; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=None';

      // 정리 완료 표시
      localStorage.setItem(CLEANUP_KEY, 'true');

      console.log('✅ 레거시 쿠키 정리 완료');
    } catch (error) {
      console.error('❌ 레거시 쿠키 정리 실패:', error);
    }
  }, []);

  return null;
}
