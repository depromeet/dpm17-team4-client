import CharacterImage from '@/assets/report/charactoer1.png';
import type { ReportData } from './types';

// NOTE(seonghyun): Mock 데이터 - API 응답 형태
export const mockReportData: ReportData = {
  updatedAt: '2024-09-17T16:00:00Z',
  poo: {
    score: 30,
    summary: {
      image: CharacterImage,
      backgroundColors: ['#FF535F', '#A4141E'],
      caption: '화가 잔뜩 난 대장',
      message: '전문가 상담이 필요해요',
    },
    items: [
      {
        occurredAt: '2024-09-17T15:00:00Z',
        message:
          '전문가의 상담이 필요해요. 복통이 매우 심했다면 단순한 식사 문제를 넘어서 장염이나 자극적인 음식 섭취',
        color: 'DARK_BROWN',
        shape: 'PORRIDGE',
        duration: 10,
        pain: 78,
        note: '생리중',
      },
      {
        occurredAt: '2024-09-17T15:00:00Z',
        message:
          '전문가의 상담이 필요해요. 복통이 매우 심했다면 단순한 식사 문제를 넘어서 장염이나 자극적인 음식 섭취',
        color: 'DARK_BROWN',
        shape: 'PORRIDGE',
        duration: 10,
        pain: 78,
        note: '생리중',
      },
    ],
  },
  food: {
    message: '맵고 자극적인 음식이 장을 자극했을 수 있어요',
    items: [
      {
        occurredAt: '2024-09-16T00:00:00Z', // 어제
        meals: [
          { mealTime: 'BREAKFAST', dangerous: false, foods: [] },
          {
            mealTime: 'LUNCH',
            dangerous: true,
            foods: ['마라탕', '꿔바로우'],
          },
          {
            mealTime: 'DINNER',
            dangerous: false,
            foods: ['짜장면', '탕수육'],
          },
          { mealTime: 'SNACK', dangerous: false, foods: [] },
        ],
      },
      {
        occurredAt: '2024-09-17T00:00:00Z', // 오늘
        meals: [
          { mealTime: 'BREAKFAST', dangerous: false, foods: [] },
          { mealTime: 'LUNCH', dangerous: false, foods: [] },
          { mealTime: 'DINNER', dangerous: false, foods: [] },
          { mealTime: 'SNACK', dangerous: false, foods: [] },
        ],
      },
    ],
  },
  water: {
    message: '장이 말라가고 있어요! 물 섭취량을 늘려야 해요',
    items: [
      { name: 'STANDARD', value: 2000, color: '#9CA3AF', level: 'HIGH' },
      { name: 'YESTERDAY', value: 500, color: '#FBBF24', level: 'MEDIUM' },
      { name: 'TODAY', value: 200, color: '#EF4444', level: 'LOW' },
    ],
  },
  stress: {
    message: '스트레스 관리가 필요해요. 가벼운 산책이나 명상 어때요?',
    image: '😤',
  },
  suggestion: {
    message: '장 상태를 개선하려면 이런 습관을 추천해요',
    items: [
      {
        image: null, // JSX는 컴포넌트에서 생성
        title: '물 섭취량을 더 늘려보세요',
        content: '하루 권장 물 섭취량은 성인 기준 2L 예요',
      },
      {
        image: null, // JSX는 컴포넌트에서 생성
        title: '충분한 식이섬유가 중요해요',
        content: '과일과 채소를 섭취하면 좋은 흐름이 유지돼요',
      },
      {
        image: null, // JSX는 컴포넌트에서 생성
        title: '지속적으로 배변을 기록해요',
        content: '배변이 잘 되는 나만의 루틴을 만들 수 있어요',
      },
    ],
  },
};
