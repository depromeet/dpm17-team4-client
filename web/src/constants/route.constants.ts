// 페이지 라우트 상수들
export const PAGE_ROUTES = {
  HOME: '/home',
  AUTH: '/auth',
  REPORT_DAILY: '/report/daily',
  CALENDAR: '/calendar',
  MY: '/my',
  MY_PROFILE: '/my/profile',
  NOTIFICATION_SETTINGS: '/my/notification-settings',
  TERMS_PRIVACY: '/my/terms-privacy',
  ONBOARDING_PROFILE: '/onboarding/profile',
  APP_LOCK: '/my/app-lock',
  PASSWORD_SETTINGS: '/my/app-lock/settings-password',
} as const;

// API 라우트 상수들
export const API_ROUTES = {
  AUTH_LOGIN: '/api/auth/login',
  AUTH_REFRESH: '/api/auth/refresh',
  SESSION: '/api/session',
  MOCK_KAKAO_SIGNIN: '/api/mock/kakao/signin',
  MOCK_AUTH_REFRESH: '/api/mock/auth/refresh',
} as const;

// 공개 경로 (인증이 필요하지 않은 경로)
export const PUBLIC_PATHS = ['/', '/auth', '/notification-test'] as const;
