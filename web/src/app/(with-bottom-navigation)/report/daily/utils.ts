import type { StaticImageData } from 'next/image';
import BreakfastImage from '@/assets/report/breakfast.png';
import DinnerImage from '@/assets/report/dinner.png';
import LunchImage from '@/assets/report/lunch.png';
import SnackImage from '@/assets/report/snack.png';

// NOTE(seonghyun): Enum 매핑 함수들
export const getMealTimeLabel = (mealTime: string): string => {
  const mapping: Record<string, string> = {
    BREAKFAST: '아침',
    LUNCH: '점심',
    DINNER: '저녁',
    SNACK: '간식',
  };
  return mapping[mealTime] || mealTime;
};

export const getWaterNameLabel = (name: string): string => {
  const mapping: Record<string, string> = {
    STANDARD: '권장 섭취량',
    YESTERDAY: '어제',
    TODAY: '오늘',
  };
  return mapping[name] || name;
};

export const getWeeklyWaterNameLabel = (name: string): string => {
  const mapping: Record<string, string> = {
    MONDAY: '월',
    TUESDAY: '화',
    WEDNESDAY: '수',
    THURSDAY: '목',
    FRIDAY: '금',
    SATURDAY: '토',
    SUNDAY: '일',
  };
  return mapping[name] || name;
};

export const getMonthlyWaterNameLabel = (name: string): string => {
  return name; // '1주차', '2주차' 등은 그대로 표시
};

export const getWaterLevelLabel = (level: string): string => {
  const mapping: Record<string, string> = {
    HIGH: '충분',
    MEDIUM: '보통',
    LOW: '낮음',
  };
  return mapping[level] || level;
};

export const getWaterValue = (value: number): string => {
  if (value <= 2000) return 'HIGH';
  if (value <= 1600) return 'MEDIUM';
  return 'LOW';
};

export const getWaterLevelColor = (value: number): string => {
  if (value <= 800) return '#F13A49';
  if (value <= 1600) return '#F4B005';
  return '#23ABFF';
};

export const getColorLabel = (color: string): string => {
  const mapping: Record<string, string> = {
    DEFAULT: '기본',
    GOLD: '금색',
    DARK_BROWN: '갈색',
    RED: '빨간색',
    GREEN: '초록색',
    WHITE: '흰색',
  };
  return mapping[color] || color;
};

export const getShapeLabel = (shape: string): string => {
  const mapping: Record<string, string> = {
    RABBIT: '토끼',
    WATER: '물',
    CORN: '옥수수',
    BANANA: '바나나',
    CREAM: '크림',
    PORRIDGE: '죽',
  };
  return mapping[shape] || shape;
};

// NOTE(seonghyun): 점수 관련 함수들
export const getScoreColor = (score: number): string => {
  if (score <= 20) return 'bg-red-500';
  if (score <= 40) return 'bg-orange-500';
  if (score <= 60) return 'bg-yellow-500';
  if (score <= 80) return 'bg-blue-500';
  return 'bg-green-500';
};

export const getScoreLabel = (score: number): string => {
  if (score <= 20) return '매우 나쁨';
  if (score <= 40) return '나쁨';
  if (score <= 60) return '보통';
  if (score <= 80) return '좋음';
  return '매우 좋음';
};

// NOTE(seonghyun): 날짜 포맷팅 함수
export const formatDate = (date: Date, now: Date = new Date()): string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdays[date.getDay()];

  // 자정 기준으로 일수 차이 계산
  const dateStart = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const nowStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffDays = Math.floor(
    (dateStart.getTime() - nowStart.getTime()) / (1000 * 60 * 60 * 24)
  );

  let suffix = '';
  if (diffDays === 0) {
    suffix = ', 오늘';
  } else if (diffDays === -1) {
    suffix = ', 어제';
  }

  return `${month}월 ${day}일 (${weekday})${suffix}`;
};

// NOTE(taehyeon): 식사 시간에 따른 이미지 반환
export const getMealTimeIcon = (mealTime: string): string | StaticImageData => {
  switch (mealTime) {
    case 'BREAKFAST':
      return BreakfastImage;
    case 'LUNCH':
      return LunchImage;
    case 'DINNER':
      return DinnerImage;
    case 'SNACK':
      return SnackImage;
    default:
      return '';
  }
};

// NOTE(taehyeon): 사용자가 채우지 않은 MealTime 을 기본 값으로 채우기 위한 함수
export const fillMissingMealTimes = (
  meals: Array<{ mealTime: string; dangerous: boolean; foods: string[] }>
) => {
  const allMealTimes = ['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK'] as const;
  const existingMealTimes = new Set(meals.map((meal) => meal.mealTime));

  const filledMeals = [...meals];

  for (const mealTime of allMealTimes) {
    if (!existingMealTimes.has(mealTime)) {
      filledMeals.push({
        mealTime,
        dangerous: false,
        foods: [],
      });
    }
  }

  return filledMeals.sort((a, b) => {
    return (
      allMealTimes.indexOf(a.mealTime as (typeof allMealTimes)[number]) -
      allMealTimes.indexOf(b.mealTime as (typeof allMealTimes)[number])
    );
  });
};
