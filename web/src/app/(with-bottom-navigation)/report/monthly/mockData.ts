import type { ColorAnalysisItem } from './_components/ColorAnalysis';
import type { AnalysisItem } from './_components/ShapeAnalysis';
import type { TimeDistribution } from './_components/TimeAnalysis';
import type { TimeOfDayItem } from './_components/TimeOfDayAnalysis';

export interface MonthlyReportMockData {
  shape: AnalysisItem[];
  timeDistribution: TimeDistribution;
  color: ColorAnalysisItem[];
  timeOfDay: TimeOfDayItem[];
  colorMessage: string;
}

// NOTE: 월간 리포트 Mock 데이터
export const mockMonthlyReportData: MonthlyReportMockData = {
  shape: [
    {
      shape: 'RABBIT',
      count: 8,
      warning: '변비 주의',
    },
    {
      shape: 'BANANA',
      count: 4,
    },
    {
      shape: 'PORRIDGE',
      count: 2,
      warning: '설사 의심',
    },
  ],
  timeDistribution: {
    within5min: 2, // 5분 이내
    over5min: 4, // 5분 이상
    over10min: 10, // 10분 이상
  },
  color: [
    {
      color: 'DARK_BROWN',
      count: 8,
    },
    {
      color: 'GOLD',
      count: 4,
    },
    {
      color: 'RED',
      count: 1,
      warning: '전문가 상담 권장',
    },
  ],
  timeOfDay: [
    {
      period: 'MORNING',
      count: 18,
    },
    {
      period: 'AFTERNOON',
      count: 3,
    },
    {
      period: 'EVENING',
      count: 8,
    },
  ],
  colorMessage:
    '혈변은 건강의 적신호예요. 대장염, 대장암, 치질 등의 문제일 수 있어요. 빠른 병원 방문을 권장해요.',
};
