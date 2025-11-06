import type { StressLevel } from '@/app/(record)/lifestyle/types/entitites';
import type { MealTime, Stress } from '../daily/types';

// NOTE(taehyeon): 월간 기록 분석 결과 스코어 타입
export type MonthlyScore = {
  best: {
    occurredAt: string;
    score: number;
  };
  worst: {
    occurredAt: string;
    score: number;
  };
};

// NOTE(taehyeon): 월간 식단 분석 결과 타입
export type WeeklyMonthlyFoodReport = {
  message: string;
  monthlyComparison: {
    lastMonth: number;
    thisMonth: number;
  };
  weeklyGroups: {
    weekLabel: string;
    startDate: string;
    endDate: string;
    items: {
      occurredAt: string;
      mealTime: MealTime;
      foods: string[];
    }[];
  }[];
};

// NOTE(taehyeon): 월간 물 섭취량 이름 타입
export type Weekly = '1주차' | '2주차' | '3주차' | '4주차' | '5주차';

// NOTE(taehyeon): 월간 물 섭취량 분석 결과 타입
export type WeeklyMonthlyWater = {
  message: string;
  items: {
    name: Weekly;
    value: number;
  }[];
};

// NOTE(taehyeon): 월간 스트레스 분석 결과 타입
export type WeeklyMonthlyStress = Stress & {
  items: {
    day: Weekly;
    stress: StressLevel;
  }[];
};
