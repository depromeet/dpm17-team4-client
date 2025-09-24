import type { StaticImageData } from 'next/image';
import stressHigh from '../assets/stress-high.png';
import stressLow from '../assets/stress-low.png';
import stressMedium from '../assets/stress-medium.png';
import stressVeryHigh from '../assets/stress-very-high.png';
import stressVeryLow from '../assets/stress-very-low.png';

import breakfast from '../assets/breakfast.png';
import snack from '../assets/snack.png';
import lunch from '../assets/lunch.png';
import dinner from '../assets/dinner.png';
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
