/**
 * 날짜 관련 유틸리티 함수들
 */

/**
 * 특정 날짜와 오늘 날짜의 차이를 일 단위로 계산합니다.
 * @param year - 년도 (예: 2024)
 * @param month - 월 (1-12)
 * @param date - 일 (1-31)
 * @returns 날짜 차이 (음수: 과거, 0: 오늘, 양수: 미래)
 * @example
 * // 오늘이 2024년 1월 15일일 때
 * getDateDifference(2024, 1, 15) // 0 (오늘)
 * getDateDifference(2024, 1, 14) // -1 (어제)
 * getDateDifference(2024, 1, 16) // 1 (내일)
 */
export const getDateDifference = (
  year: number,
  month: number,
  date: number
): number => {
  const targetDate = new Date(year, month - 1, date);
  const today = new Date();

  const targetDateOnly = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate()
  );
  const todayOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const diffTime = targetDateOnly.getTime() - todayOnly.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Date 객체에서 한국어 요일 이름을 반환합니다.
 * @param date - Date 객체
 * @returns 한국어 요일 이름
 * @example
 * getDayName(new Date(2024, 0, 15)) // "월"
 * getDayName(new Date(2024, 0, 16)) // "화"
 */
export const getDayName = (date: Date): string => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return days[date.getDay()];
};

/**
 * 날짜 차이에 따라 표시할 텍스트를 생성합니다.
 * @param year - 년도
 * @param month - 월
 * @param date - 일
 * @returns 날짜 표시 텍스트
 * @example
 * // 오늘이 2024년 1월 15일일 때
 * getDateDisplayText(2024, 1, 15) // "1월 15일 (월), 오늘"
 * getDateDisplayText(2024, 1, 14) // "1월 14일 (일), 어제"
 * getDateDisplayText(2024, 1, 16) // "1월 16일 (화), 내일"
 * getDateDisplayText(2024, 1, 10) // "1월 10일 (수)"
 */
export const getDateDisplayText = (
  year: number,
  month: number,
  date: number
): string => {
  const targetDate = new Date(year, month - 1, date);
  const diffDays = getDateDifference(year, month, date);
  const dayName = getDayName(targetDate);

  if (diffDays === 0) {
    return `${month}월 ${date}일 (${dayName}), 오늘`;
  } else if (diffDays === -1) {
    return `${month}월 ${date}일 (${dayName}), 어제`;
  } else if (diffDays === 1) {
    return `${month}월 ${date}일 (${dayName}), 내일`;
  } else {
    return `${month}월 ${date}일 (${dayName})`;
  }
};

/**
 * Date 객체를 한국어 형식으로 변환합니다.
 * @param date - Date 객체
 * @returns 한국어 날짜 형식 문자열
 * @example
 * getDateDisplayTextFromDate(new Date(2024, 8, 14)) // "9월 14일 (토)"
 * getDateDisplayTextFromDate(new Date(2024, 0, 1)) // "1월 1일 (월)"
 */
export const getDateDisplayTextFromDate = (date: Date): string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayName = getDayName(date);

  return `${month}월 ${day}일 (${dayName})`;
};

/**
 * 시간 문자열을 한국어 형식으로 변환합니다.
 * @param time - 시간 문자열 (예: "09:00", "13:30")
 * @returns 한국어 시간 형식 문자열
 * @example
 * getTimeDisplay("09:00") // "오전 9시"
 * getTimeDisplay("13:30") // "오후 1시"
 * getTimeDisplay("12:00") // "오후 12시"
 */
export const getTimeDisplay = (time: string): string => {
  const hour = parseInt(time.split(':')[0], 10);
  if (hour === 0) {
    return '오전 12시';
  } else if (hour < 12) {
    return `오전 ${hour}시`;
  } else if (hour === 12) {
    return `오후 12시`;
  } else {
    return `오후 ${hour - 12}시`;
  }
};
/*금일 연,월,일 을 반환합니다. */
export const getTodayDate = () => {
  const date = new Date();
  const todayYear = date.getFullYear();
  const todayMonth = date.getMonth() + 1;
  const todayDay = date.getDate();
  return { todayYear, todayMonth, todayDay };
};
