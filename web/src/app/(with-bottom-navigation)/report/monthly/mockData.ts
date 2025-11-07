import StressImage from '@/assets/report/emoji_anger.png';
import type { UserAverage } from '../_components/UserAverageChart';
import type { Suggestion } from '../daily/types';
import type { ColorAnalysisItem } from './_components/ColorAnalysis';
import type { MonthlyRecordCounts } from './_components/MontlyRecord';
import type { PainData } from './_components/PainAnalysis';
import type { AnalysisItem } from './_components/ShapeAnalysis';
import type { TimeDistribution } from './_components/TimeAnalysis';
import type { TimeOfDayItem } from './_components/TimeOfDayAnalysis';
import type {
  MonthlyScore,
  WeeklyMonthlyFoodReport,
  WeeklyMonthlyStress,
  WeeklyMonthlyWater,
} from './types';

export interface MonthlyReportMockData {
  monthlyScore: MonthlyScore;
  shape: AnalysisItem[];
  timeDistribution: TimeDistribution;
  color: {
    items: ColorAnalysisItem[];
    colorMessage: string;
  };
  timeOfDay: TimeOfDayItem[];
  colorMessage: string;
  montlyRecordCounts: MonthlyRecordCounts;
  monthlyScores: number[];
  userAverage: UserAverage;
  pain: PainData;
  food: WeeklyMonthlyFoodReport;
  water: WeeklyMonthlyWater;
  stress: WeeklyMonthlyStress;
  suggestion: Suggestion;
}

// NOTE: 월간 리포트 Mock 데이터
export const mockMonthlyReportData: MonthlyReportMockData = {
  // 월간 기록 분석 결과 스코어
  monthlyScore: {
    best: {
      occurredAt: '2025-10-15T14:33:12.110939406',
      score: 82,
    },
    worst: {
      occurredAt: '2025-10-17T14:33:12.110939406',
      score: 43,
    },
  },
  //배변 분석 기록 결과 -모양
  montlyRecordCounts: {
    totalRecordCounts: 37,
    defecationRecordCounts: 21,
    lifestyleRecordCounts: 16,
  },
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
  userAverage: {
    me: 30,
    average: 100,
    topPercent: 50,
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
  food: {
    message: '자극적인 음식을 10회 이상 섭취했어요\n식단 관리가 필요해요!', // or 건강한 식단을\n열심히 유지하고 계시네요! or 자극적인 음식을 10회 미만으로\n 섭취했어요. 지속적으로 줄여나가요! or 자극적인 음식을 5회 미만으로\n섭취했어요. 아주 좋아요!
    monthlyComparison: {
      lastMonth: 9,
      thisMonth: 13,
    },
    weeklyGroups: [
      {
        weekLabel: '1주차',
        startDate: '2025-10-01T14:33:12.110939406',
        endDate: '2025-10-05T14:33:12.110939406',
        items: [
          {
            occurredAt: '2025-10-01T14:33:12.110939406',
            mealTime: 'LUNCH',
            foods: [
              '마라탕',
              '꿔바로우',
              '크림새우',
              '마라샹궈',
              '맥주',
              '옥수수 온면',
            ],
          },
          {
            occurredAt: '2025-10-03T14:33:12.110939406',
            mealTime: 'DINNER',
            foods: ['불닭볶음면'],
          },
          {
            occurredAt: '2025-10-04T14:33:12.110939406',
            mealTime: 'DINNER',
            foods: ['짬뽕'],
          },
        ],
      },
      {
        weekLabel: '2주차',
        startDate: '2025-10-06T14:33:12.110939406',
        endDate: '2025-10-12T14:33:12.110939406',
        items: [],
      },
      {
        weekLabel: '3주차',
        startDate: '2025-10-13T14:33:12.110939406',
        endDate: '2025-10-19T14:33:12.110939406',
        items: [
          {
            occurredAt: '2025-10-13T14:33:12.110939406',
            mealTime: 'LUNCH',
            foods: ['마라탕', '꿔바로우'],
          },
          {
            occurredAt: '2025-10-15T14:33:12.110939406',
            mealTime: 'DINNER',
            foods: ['불닭볶음면'],
          },
          {
            occurredAt: '2025-10-18T14:33:12.110939406',
            mealTime: 'DINNER',
            foods: ['짬뽕'],
          },
          {
            occurredAt: '2025-10-19T14:33:12.110939406',
            mealTime: 'BREAKFAST',
            foods: ['떡볶이'],
          },
        ],
      },
      {
        weekLabel: '4주차',
        startDate: '2025-10-20T14:33:12.110939406',
        endDate: '2025-10-26T14:33:12.110939406',
        items: [
          {
            occurredAt: '2025-10-20T14:33:12.110939406',
            mealTime: 'LUNCH',
            foods: ['마라탕', '꿔바로우'],
          },
          {
            occurredAt: '2025-10-22T14:33:12.110939406',
            mealTime: 'DINNER',
            foods: ['불닭볶음면'],
          },
          {
            occurredAt: '2025-10-25T14:33:12.110939406',
            mealTime: 'DINNER',
            foods: ['짬뽕'],
          },
          {
            occurredAt: '2025-10-26T14:33:12.110939406',
            mealTime: 'BREAKFAST',
            foods: ['떡볶이'],
          },
        ],
      },
      {
        weekLabel: '5주차',
        startDate: '2025-10-27T14:33:12.110939406',
        endDate: '2025-10-31T14:33:12.110939406',
        items: [
          {
            occurredAt: '2025-10-27T14:33:12.110939406',
            mealTime: 'LUNCH',
            foods: ['마라탕', '꿔바로우'],
          },
          {
            occurredAt: '2025-10-29T14:33:12.110939406',
            mealTime: 'DINNER',
            foods: ['불닭볶음면'],
          },
        ],
      },
    ],
  },
  water: {
    message: '보통 수준이에요.\n조금 더 자주 물을 마셔보세요!',
    items: [
      {
        name: '1주차',
        value: 2000.0,
      },
      {
        name: '2주차',
        value: 500.0,
      },
      {
        name: '3주차',
        value: 1800.0,
      },
      {
        name: '4주차',
        value: 300.0,
      },
      {
        name: '5주차',
        value: 2500.0,
      },
    ],
  },
  stress: {
    message: '긍정적인 당신! 그 마인드\n 오래도록 유지해봐요',
    image: StressImage,
    items: [
      {
        day: '1주차',
        stress: 'VERY_LOW',
      },
      {
        day: '2주차',
        stress: 'LOW',
      },
      {
        day: '3주차',
        stress: 'MEDIUM',
      },
      {
        day: '4주차',
        stress: 'HIGH',
      },
      {
        day: '5주차',
        stress: 'VERY_HIGH',
      },
    ],
  },
  suggestion: {
    message: '장 상태를 개선하려면\n이런 습관을 추천해요',
    items: [
      {
        image: '/assets/defecation/Illust/Banana.png',
        title: '물 섭취량을 더 늘려보세요',
        content: '하루 권장 물 섭취량은 성인 기준 2L 예요',
      },
      {
        image: '/assets/defecation/Illust/Banana.png',
        title: '충분한 식이섬유가 중요해요',
        content: '과일과 채소를 섭취하면 좋은 흐름이 유지돼요',
      },
      {
        image: '/assets/defecation/Illust/Cream.png',
        title: '지속적으로 배변을 기록해요',
        content: '배변이 잘 되는 나만의 루틴을 만들 수 있어요',
      },
    ],
  },
  colorMessage:
    '혈변은 건강의 적신호예요. 대장염, 대장암, 치질 등의 문제일 수 있어요. 빠른 병원 방문을 권장해요.',
  monthlyScores: [75, 82, 78, 85, 80],
};
