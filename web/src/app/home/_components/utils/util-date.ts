import { DATE_LABELS, DATE_LIMITS, DAYS_OF_WEEK } from '@/constants';

/**
 * 날짜를 한국어 형식으로 포맷팅합니다.
 * @param date - 포맷팅할 날짜
 * @returns 포맷팅된 날짜 문자열 (예: "9월 14일(일), 오늘")
 */
export const formatDate = (date: Date): string => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = DAYS_OF_WEEK[date.getDay()];

  // 날짜 비교를 위해 시간을 0으로 설정
  const dateOnly = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const todayOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const yesterdayOnly = new Date(
    yesterday.getFullYear(),
    yesterday.getMonth(),
    yesterday.getDate()
  );

  let suffix = '';
  if (dateOnly.getTime() === todayOnly.getTime()) {
    suffix = `, ${DATE_LABELS.TODAY}`;
  } else if (dateOnly.getTime() === yesterdayOnly.getTime()) {
    suffix = `, ${DATE_LABELS.YESTERDAY}`;
  }

  return `${month}월 ${day}일(${dayOfWeek})${suffix}`;
};

/**
 * 선택된 날짜가 7일 전 이전인지 확인합니다.
 * @param selectedDate - 확인할 날짜
 * @returns 7일 전 이전이면 true
 */
export const isPrevDisabled = (selectedDate: Date): boolean => {
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - DATE_LIMITS.MAX_PREV_DAYS);

  const selectedDateOnly = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate()
  );
  const sevenDaysAgoOnly = new Date(
    sevenDaysAgo.getFullYear(),
    sevenDaysAgo.getMonth(),
    sevenDaysAgo.getDate()
  );

  return selectedDateOnly.getTime() <= sevenDaysAgoOnly.getTime();
};

/**
 * 선택된 날짜가 오늘 이후인지 확인합니다.
 * @param selectedDate - 확인할 날짜
 * @returns 오늘 이후이면 true
 */
export const isNextDisabled = (selectedDate: Date): boolean => {
  const today = new Date();
  const selectedDateOnly = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate()
  );
  const todayOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  return selectedDateOnly.getTime() >= todayOnly.getTime();
};
