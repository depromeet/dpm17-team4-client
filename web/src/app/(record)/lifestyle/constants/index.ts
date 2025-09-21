import type { StaticImageData } from 'next/image';
import stressVeryHigh from '../assets/stress-very-high.png';
import stressHigh from '../assets/stress-high.png';
import stressLow from '../assets/stress-low.png';
import stressMedium from '../assets/stress-medium.png';
import stressVeryLow from '../assets/stress-very-low.png';
import type { MealTime, StressLevel } from '../types/entitites';

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
  imageUrl: StaticImageData;
}[] = [
  {
    id: 'VERY_LOW',
    range: '0~20',
    imageUrl: stressVeryLow,
  },
  {
    id: 'LOW',
    range: '21~40',
    imageUrl: stressLow,
  },
  {
    id: 'MEDIUM',
    range: '41~60',
    imageUrl: stressMedium,
  },
  {
    id: 'HIGH',
    range: '61~80',
    imageUrl: stressHigh,
  },
  {
    id: 'VERY_HIGH',
    range: '81~100',
    imageUrl: stressVeryHigh,
  },
];
