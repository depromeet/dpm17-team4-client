export const DAYS_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토'] as const;
export const DATE_LABELS = {
  TODAY: '오늘',
  YESTERDAY: '어제',
} as const;
export const DATE_LIMITS = {
  MAX_PREV_DAYS: 7,
} as const;
export const FIXED_WEEKS = 5;
export const DAYS_PER_WEEK = 7;
export const TOTAL_DAYS = FIXED_WEEKS * DAYS_PER_WEEK;
