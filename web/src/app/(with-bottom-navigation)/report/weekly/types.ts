import type { StressLevel } from '@/app/(record)/lifestyle/types/entitites';
import type { Stress } from '../daily/types';

// NOTE: 요일 타입
export type DayOfWeek =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';

// NOTE: 주간 스트레스 분석 결과 타입
export type WeeklyStress = Stress & {
  items: {
    day: DayOfWeek;
    stress: StressLevel | null; // null 허용 (기록 없는 날)
  }[];
};
