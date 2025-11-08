export const QUERY_KEYS = {
  REPORT: ['report'],
  REPORT_MONTHLY: ['report', 'monthly'],

  RECORD: ['record'],

  ACTIVITY_RECORDS: ['activity-records'],

  DEFECATION: ['defecation'],

  TERMS: ['terms'],
  USER_ME: ['user', 'me'],

  CALENDAR: ['calendar'],
  CALENDAR_BY_DATE: ['calendar-by-date'],
  DEFECATION_RECORD_LIST: ['defecation-record-list'],

  FOODS: {
    SEARCH: (query: string, count: number) => ['foods', 'search', query, count],
  },

  // NOTE(seieun): create key factory
  // RECORD_DETAILS: (id: string) => ['records', id],
} as const;
