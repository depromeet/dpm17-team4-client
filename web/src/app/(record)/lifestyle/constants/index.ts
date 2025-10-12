import type { StaticImageData } from 'next/image';
import breakfast from '../assets/breakfast.png';
import dinner from '../assets/dinner.png';
import lunch from '../assets/lunch.png';
import snack from '../assets/snack.png';
import stressHigh from '../assets/stress-high.png';
import stressLow from '../assets/stress-low.png';
import stressMedium from '../assets/stress-medium.png';
import stressVeryHigh from '../assets/stress-very-high.png';
import stressVeryLow from '../assets/stress-very-low.png';
import type { MealTime, StressLevel } from '../types/entitites';

export const MEAL_TIMES: {
  id: MealTime;
  name: string;
  imageUrl: StaticImageData;
}[] = [
  {
    id: 'BREAKFAST',
    name: '아침',
    imageUrl: breakfast,
  },
  {
    id: 'LUNCH',
    name: '점심',
    imageUrl: lunch,
  },
  {
    id: 'DINNER',
    name: '저녁',
    imageUrl: dinner,
  },
  {
    id: 'SNACK',
    name: '간식',
    imageUrl: snack,
  },
] as const;

export const TIME_LABEL_MAP: Record<MealTime, string> = {
  BREAKFAST: '아침',
  LUNCH: '점심',
  DINNER: '저녁',
  SNACK: '간식',
};

export const TIME_COLOR_MAP: Record<MealTime, {
  bg: string;
  hover: string;
}> = {
  BREAKFAST: {
    bg: 'bg-yellow-600',
    hover: 'hover:bg-yellow-500',
  },
  LUNCH: {
    bg: 'bg-green-600',
    hover: 'hover:bg-green-500',
  },
  DINNER: {
    bg: 'bg-blue-600',
    hover: 'hover:bg-blue-500',
  },
  SNACK: {
    bg: 'bg-red-600',
    hover: 'hover:bg-red-500',
  },
};

export const STRESS_LEVELS: {
  id: StressLevel;
  range: string;
  imageUrl: StaticImageData;
}[] = [
  {
    id: 'VERY_LOW',
    range: '아예 없음',
    imageUrl: stressVeryLow,
  },
  {
    id: 'LOW',
    range: '조금 있음',
    imageUrl: stressLow,
  },
  {
    id: 'MEDIUM',
    range: '적당함',
    imageUrl: stressMedium,
  },
  {
    id: 'HIGH',
    range: '조금 심함',
    imageUrl: stressHigh,
  },
  {
    id: 'VERY_HIGH',
    range: '매우 심함',
    imageUrl: stressVeryHigh,
  },
];
