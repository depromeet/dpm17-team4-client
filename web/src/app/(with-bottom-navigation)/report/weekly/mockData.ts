import StressImage from '@/assets/report/emoji_anger.png';
import type { UserAverage } from '../_components/UserAverageChart';
import type { Suggestion, Water } from '../daily/types';
import type { WeeklyFoodReport, WeeklyStress } from './types';

export interface WeeklyReportMockData {
  defecationScore: {
    lastWeek: number;
    thisWeek: number;
    dailyScore: number[];
  };
  userAverage: UserAverage;
  food: WeeklyFoodReport;
  water: Water;
  stress: WeeklyStress;
  suggestion: Suggestion;
}

// NOTE: 주간 리포트 Mock 데이터
export const WeeklyMockData: WeeklyReportMockData = {
  defecationScore: {
    lastWeek: 75,
    thisWeek: 55,
    dailyScore: [65, 70, 55, 80, 75, 60, 68], // 월~일 7일간 점수
  },
  userAverage: {
    me: 68,
    average: 55,
    topPercent: 35,
  },
  food: {
    message: '자극적인 음식을 3회 이상 섭취했어요\n식단 관리가 필요해요!', // or 건강한 식단을\n열심히 유지하고 계시네요! or 자극적인 음식을 10회 미만으로\n 섭취했어요. 지속적으로 줄여나가요! or 자극적인 음식을 5회 미만으로\n섭취했어요. 아주 좋아요!
    weeklyComparison: {
      lastWeek: 2,
      thisWeek: 5,
    },
    items: [
      {
        occurredAt: '2025-10-13T14:33:12.110939406',
        mealTime: 'DINNER',
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
        occurredAt: '2025-10-14T14:33:12.110939406',
        mealTime: 'LUNCH',
        foods: ['떡볶이'],
      },
      {
        occurredAt: '2025-10-15T14:33:12.110939406',
        mealTime: 'DINNER',
        foods: ['닭발'],
      },
      {
        occurredAt: '2025-10-16T14:33:12.110939406',
        mealTime: 'DINNER',
        foods: ['짬뽕'],
      },
      {
        occurredAt: '2025-10-17T14:33:12.110939406',
        mealTime: 'BREAKFAST',
        foods: ['햄버거'],
      },
    ],
  },
  water: {
    message: '보통 수준이에요.\n조금 더 자주 물을 마셔보세요!',
    items: [
      {
        name: '월',
        value: 2000.0,
        color: '#D9D9D9',
        level: 'NONE',
      },
      {
        name: '화',
        value: 500.0,
        color: '#D9D9D9',
        level: 'NONE',
      },
      {
        name: '수',
        value: 1800.0,
        color: '#D9D9D9',
        level: 'NONE',
      },
      {
        name: '목',
        value: 300.0,
        color: '#D9D9D9',
        level: 'NONE',
      },
      {
        name: '금',
        value: 2500.0,
        color: '#D9D9D9',
        level: 'NONE',
      },
      {
        name: '토',
        value: 1200.0,
        color: '#D9D9D9',
        level: 'NONE',
      },
      {
        name: '일',
        value: 800.0,
        color: '#D9D9D9',
        level: 'NONE',
      },
    ],
  },
  stress: {
    message: '긍정적인 당신! 그 마인드\n 오래도록 유지해봐요',
    image: StressImage.src,
    items: [
      { day: 'MONDAY', stress: 'LOW' },
      { day: 'TUESDAY', stress: 'VERY_LOW' },
      { day: 'WEDNESDAY', stress: 'MEDIUM' },
      { day: 'THURSDAY', stress: 'LOW' },
      { day: 'FRIDAY', stress: 'HIGH' },
      { day: 'SATURDAY', stress: 'MEDIUM' },
      { day: 'SUNDAY', stress: 'LOW' },
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
};
