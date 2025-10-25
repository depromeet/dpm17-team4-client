export const QUERY_KEYS = {
  REPORT: ['report'],

  RECORD: ['record'],

  ACTIVITY_RECORDS: ['activity-records'],

  DEFECATION: ['defecation'],

  USER_ME: ['user', 'me'],

  FOODS: {
    SEARCH: (query: string, count: number) => ['foods', 'search', query, count],
  },

  // NOTE(seieun): create key factory
  // RECORD_DETAILS: (id: string) => ['records', id],
} as const;
