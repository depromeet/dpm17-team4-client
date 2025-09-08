// 페이지 라우트 상수들
export const PAGE_ROUTES = {
  HOME: "/",
  AUTH: "/auth",
} as const;

// API 라우트 상수들
export const API_ROUTES = {
  AUTH_LOGIN: "/api/auth/login",
  AUTH_REFRESH: "/api/auth/refresh",
  SESSION: "/api/session",
  MOCK_KAKAO_SIGNIN: "/api/mock/kakao/signin",
  MOCK_AUTH_REFRESH: "/api/mock/auth/refresh",
} as const;

// 공개 경로 (인증이 필요하지 않은 경로)
export const PUBLIC_PATHS = ["/", "/auth"] as const;
