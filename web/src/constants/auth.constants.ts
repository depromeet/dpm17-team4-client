// 인증 관련 상수들
export const AUTH_CONSTANTS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  COOKIE_MAX_AGE: 7 * 24 * 60 * 60, // 7일
  TEMP_COOKIE_MAX_AGE: 60, // 1분 (임시 쿠키)

  // 토큰 만료 시간 (초)
  ACCESS_TOKEN_LIFESPAN: 3600, // 1시간 (다른 이름)
  REFRESH_THRESHOLD: 300, // 5분 (토큰 갱신 임계값)

  // 세션 관련
  CLIENT_SESSION_CACHE_DURATION: 30000, // 30초 (클라이언트 캐시)
  DEV_CHECK_INTERVAL: 5000, // 5초 (개발 모드 체크 간격)
} as const;

// 인증 설정
export const AUTH_CONFIG = {
  USE_REDIRECT_FLOW: true, // 리다이렉트 플로우 사용 여부
} as const;
