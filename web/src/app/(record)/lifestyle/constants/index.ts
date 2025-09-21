import { MealTime, StressLevel } from "../types/entitites";

export const MEAL_TIMES: {
    id: MealTime;
    name: string;
    imageUrl: string;
  }[] = [
    {
      id: 'BREAKFAST',
      name: '아침',
      imageUrl: '',
    },
    {
      id: 'LUNCH',
      name: '점심',
      imageUrl: '',
    },
    {
      id: 'DINNER',
      name: '저녁',
      imageUrl: '',
    },
    {
      id: 'SNACK',
      name: '간식',
      imageUrl: '',
    },
  ] as const;

export const TIME_LABEL_MAP: Record<MealTime, string> = {
    BREAKFAST: '아침',
    LUNCH: '점심',
    DINNER: '저녁',
    SNACK: '간식',
  };

export const STRESS_LEVELS: {
    id: StressLevel;
    range: string;
    imageUrl: string;
  }[] = [
    {
      id: 'VERY_LOW',
      range: '0~20',
      imageUrl: '/images/stress-very-low.png',
    },
    {
      id: 'LOW',
      range: '21~40',
      imageUrl: '/images/stress-low.png',
    },
    {
      id: 'MEDIUM',
      range: '41~60',
      imageUrl: '/images/stress-medium.png',
    },
    {
      id: 'HIGH',
      range: '61~80',
      imageUrl: '/images/stress-high.png',
    },
    {
      id: 'VERY_HIGH',
      range: '81~100',
      imageUrl: '/images/stress-very-high.png',
    },
  ];