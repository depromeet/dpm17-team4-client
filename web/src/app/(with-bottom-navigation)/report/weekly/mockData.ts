import StressImage from '@/assets/report/emoji_anger.png';
import type { UserAverage } from '../_components/UserAverageChart';
import type { WeeklyStress } from './types';

export interface WeeklyReportMockData {
  defecationScore: {
    lastWeek: number;
    thisWeek: number;
    dailyScore: number[];
  };
  userAverage: UserAverage;
  stress: WeeklyStress;
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
};
