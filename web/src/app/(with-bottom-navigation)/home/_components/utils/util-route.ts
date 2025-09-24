export const getDateQueryParams = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth()는 0부터 시작
  const day = date.getDate();

  return `?year=${year}&month=${month}&day=${day}`;
};

/**
 * 기록 페이지 경로를 생성합니다.
 * @param type - 기록 타입 ('defecation' | 'lifestyle')
 * @param date - 선택된 날짜
 * @returns 기록 페이지 경로
 */
export const getRecordPath = (
  type: 'defecation' | 'lifestyle',
  date: Date
): string => {
  const queryParams = getDateQueryParams(date);
  return `/${type}${queryParams}`;
};

/**
 * 배변 기록 페이지 경로를 생성합니다.
 * @param date - 선택된 날짜
 * @returns 배변 기록 페이지 경로
 */
export const getDefecationPath = (date: Date): string => {
  return getRecordPath('defecation', date);
};

/**
 * 생활 기록 페이지 경로를 생성합니다.
 * @param date - 선택된 날짜
 * @returns 생활 기록 페이지 경로
 */
export const getLifestylePath = (date: Date): string => {
  return getRecordPath('lifestyle', date);
};
