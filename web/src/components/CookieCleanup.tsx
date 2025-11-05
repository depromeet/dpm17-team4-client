'use client';

import { useEffect } from 'react';

/**
 * 앱 시작 시 오래된 .kkruk.com 쿠키를 정리하는 컴포넌트
 * OAuth 로그인 시 domain=.kkruk.com으로 설정된 쿠키와
 * refresh 시 domain 없이 설정된 쿠키가 충돌하는 문제 해결
 */
export default function CookieCleanup() {
  useEffect(() => {
    try {
      // 오래된 .kkruk.com 도메인 쿠키를 삭제 (과거 날짜로 만료 설정)
      // biome-ignore lint: 쿠키 삭제를 위한 브라우저 표준 방법
      document.cookie =
        'refreshToken=; domain=.kkruk.com; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=None';
      console.log('🧹 앱 초기화: 오래된 .kkruk.com 쿠키 정리 완료');
    } catch (error) {
      console.warn('⚠️ 쿠키 정리 실패 (무시하고 진행):', error);
    }
  }, []);

  return null;
}
