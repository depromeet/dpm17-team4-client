import type { ColorAnalysisItem } from './_components/ColorAnalysis';
import type { PainData } from './_components/PainAnalysis';
import type { AnalysisItem } from './_components/ShapeAnalysis';
import type { TimeDistribution } from './_components/TimeAnalysis';
import type { TimeOfDayItem } from './_components/TimeOfDayAnalysis';

export interface MonthlyReportMockData {
  shape: AnalysisItem[];
  timeDistribution: TimeDistribution;
  color: {
    items: ColorAnalysisItem[];
    colorMessage: string;
  };
  timeOfDay: TimeOfDayItem[];
  pain: PainData;
}

// NOTE: 월간 리포트 Mock 데이터
export const mockMonthlyReportData: MonthlyReportMockData = {
  //배변 분석 기록 결과 -모양
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
  //배변 분석 기록 결과 -소요 시간
  timeDistribution: {
    within5min: 2, // 5분 이내
    over5min: 4, // 5분 이상
    over10min: 10, // 10분 이상
  },
  //배변 분석 기록 결과 -색상
  color: {
    items: [
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
    colorMessage:
      '혈변은 건강의 적신호예요. 대장염, 대장암, 치질 등의 문제일 수 있어요. 빠른 병원 방문을 권장해요.',
  },
  //배변 분석 기록 결과 -복통
  //NOTE: 복통 데이터 (한 달(30일) 동안 복통 게이지별로 몇 회 나왔는지)
  pain: {
    veryLow: 10, //0-10%
    low: 0, //11-30%
    medium: 5, //31-50%
    high: 10, //51-70%
    veryHigh: 5, //71-100%
    comparison: {
      direction: 'increased', // 'increased' | 'decreased' | 'same'
      count: 5,
    },
  },
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
};
