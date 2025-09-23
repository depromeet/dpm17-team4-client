export const API_ENDPOINTS = {
  // 서버 API 엔드포인트
  AUTH: {
    KAKAO_LOGIN: `/api/v1/auth/kakao/login`,
    KAKAO_CALLBACK: `/api/v1/auth/kakao/callback`,
    REFRESH: '/api/v1/auth/refresh',
  },

  RECORD: {
    BASE: '/api/record',
  },

  REPORT: {
    BASE: '/api/report',
  },

  NOTIFICATION: {
    REGISTER_TOKEN: '/api/register-token',
    SEND_PUSH: '/api/send-push',
  },
} as const;
