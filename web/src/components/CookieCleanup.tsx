'use client';

import { useEffect } from 'react';

/**
 * 앱 시작 시 오래된 .kkruk.com 쿠키를 정리하는 컴포넌트
 * OAuth 로그인 시 domain=.kkruk.com으로 설정된 쿠키와
 * refresh 시 domain 없이 설정된 쿠키가 충돌하는 문제 해결
 */
export default function CookieCleanup() {
  useEffect(() => {
    console.log('🔍 CookieCleanup - 앱 초기화 시작');
    console.log('🍪 현재 document.cookie:', document.cookie);
    
    // refreshToken이 document.cookie에 보이는지 확인
    const hasRefreshToken = document.cookie.includes('refreshToken');
    console.log('📌 refreshToken이 document.cookie에 보이나요?', hasRefreshToken);
    
    if (!hasRefreshToken) {
      console.warn('⚠️ refreshToken이 document.cookie에 없습니다. httpOnly=true로 설정되어 있을 수 있습니다!');
      console.log('💡 Application 탭 → Cookies에서 refreshToken의 HttpOnly 속성을 확인하세요.');
      return;
    }
    
    try {
      // 오래된 .kkruk.com 도메인 쿠키를 삭제 (과거 날짜로 만료 설정)
      // biome-ignore lint: 쿠키 삭제를 위한 브라우저 표준 방법
      document.cookie =
        'refreshToken=; domain=.kkruk.com; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=None';
      
      console.log('🧹 앱 초기화: .kkruk.com 쿠키 삭제 명령 실행');
      
      setTimeout(() => {
        console.log('🍪 정리 후 document.cookie:', document.cookie);
        const stillHasToken = document.cookie.includes('refreshToken');
        if (stillHasToken) {
          console.log('✅ refreshToken이 여전히 존재합니다 (정상 - kkruk.com 쿠키만 남음)');
        } else {
          console.log('⚠️ refreshToken이 모두 삭제되었습니다');
        }
      }, 100);
      
    } catch (error) {
      console.error('❌ 쿠키 삭제 실패:', error);
    }
  }, []);

  return null;
}
