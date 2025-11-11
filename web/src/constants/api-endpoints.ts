export const API_ENDPOINTS = {
  // 서버 API 엔드포인트
  AUTH: {
    KAKAO_LOGIN: `/api/v1/auth/kakao/login`,
    KAKAO_CALLBACK: `/api/v1/auth/kakao/callback`,
    KAKAO_TOKEN: `/api/v1/auth/kakao/token`,
    APPLE_LOGIN: `/api/v1/auth/apple/login`,
    APPLE_CALLBACK: `/api/v1/auth/apple/callback`,
    APPLE_TOKEN: `/api/v1/auth/apple/token`,
    REFRESH: '/api/v1/auth/refresh',
    LOGOUT: '/api/v1/auth/logout',
  },

  RECORD: {
    BASE: '/api/record',
  },

  REPORT: {
    BASE: '/api/v1/reports/daily',
    WEEKLY: '/api/v1/reports/weekly',
    MONTHLY: '/api/v1/reports/monthly',
  },

  ACTIVITY_RECORDS: {
    BASE: '/api/v1/activity-records',
  },

  FOODS: {
    SEARCH: '/api/v1/foods/search',
  },

  NOTIFICATION: {
    REGISTER_TOKEN: '/api/register-token',
    SEND_PUSH: '/api/send-push',
  },

  DEFECATION: {
    BASE: '/api/v1/poo-records',
  },

  TERMS: {
    BASE: '/api/v1/terms',
  },
  USERS: {
    ME: '/api/v1/users/me',
  },

  CALENDAR: {
    BASE: '/api/v1/calendar',
  },
} as const;
