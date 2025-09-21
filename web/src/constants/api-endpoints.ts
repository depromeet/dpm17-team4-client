export const API_ENDPOINTS = {
  RECORD: {
    BASE: '/api/record',
  },

  REPORT: {
    BASE: '/api/report',
  },

  ACTIVITY_RECORDS: {
    BASE: '/api/v1/activity-records',
  },

  NOTIFICATION: {
    REGISTER_TOKEN: '/api/register-token',
    SEND_PUSH: '/api/send-push',
  },
} as const;
