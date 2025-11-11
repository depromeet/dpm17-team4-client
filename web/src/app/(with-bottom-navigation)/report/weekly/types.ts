import type { StressLevel } from '@/app/(record)/lifestyle/types/entitites';
import type { MealTime, Stress } from '../daily/types';

// NOTE: 요일 타입
export type DayOfWeek =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';

export type Week = '1주차' | '2주차' | '3주차' | '4주차' | '5주차';

// NOTE: 주간 스트레스 분석 결과 타입
export type WeeklyStress = Stress & {
  items: {
    day: DayOfWeek | Week;
    stress: StressLevel | null; // null 허용 (기록 없는 날)
  }[];
};

export type WeeklyFoodReportType = {
  message: string;
  weeklyComparison: {
    lastWeek: number;
    thisWeek: number;
  };
  items: {
    occurredAt: string;
    mealTime: MealTime;
    foods: string[];
  }[];
};
