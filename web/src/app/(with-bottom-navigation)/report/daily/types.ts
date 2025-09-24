import type { StaticImageData } from 'next/image';

export type ReportPeriod = 'daily' | 'weekly' | 'monthly';

// NOTE(seonghyun): 배변 관련 타입
export type PooColor =
  | 'DEFAULT'
  | 'GOLD'
  | 'DARK_BROWN'
  | 'RED'
  | 'GREEN'
  | 'GRAY';
export type PooShape =
  | 'RABBIT'
  | 'ROCK'
  | 'CORN'
  | 'BANANA'
  | 'CREAM'
  | 'PORRIDGE';

export type PooItem = {
  occurredAt: string;
  message: string;
  color: PooColor;
  shape: PooShape;
  duration: number;
  pain: number;
  note: string;
};

export type PooSummary = {
  image: string | StaticImageData;
  backgroundColors: [string, string];
  caption: string;
  message: string;
};

export type Poo = {
  score: number;
  summary: PooSummary;
  items: PooItem[];
};

// NOTE(seonghyun): 식단 관련 타입
export type MealTime = 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';

export type Meal = {
  mealTime: MealTime;
  image: string | StaticImageData;
  dangerous: boolean;
  foods: string[];
};

export type FoodItem = {
  occurredAt: string;
  meals: Meal[];
};

export type Food = {
  message: string;
  items: FoodItem[];
};

// 물 섭취량 관련 타입
export type WaterName = 'STANDARD' | 'YESTERDAY' | 'TODAY';
export type WaterLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export type WaterItem = {
  name: WaterName;
  value: number;
  color: string;
  level: WaterLevel;
};

export type Water = {
  message: string;
  items: WaterItem[];
};

// NOTE(seonghyun): 스트레스 관련 타입
export type Stress = {
  message: string;
  image: string | StaticImageData;
};

// NOTE(seonghyun): 추천 습관 관련 타입
export type SuggestionItem = {
  image: string;
  title: string;
  content: string;
};

export type Suggestion = {
  message: string;
  items: SuggestionItem[];
};

// NOTE(seonghyun): 전체 리포트 데이터 타입
export type ReportData = {
  updatedAt: string;
  poo: Poo;
  food: Food;
  water: Water;
  stress: Stress;
  suggestion: Suggestion;
};

// NOTE(seonghyun): 카드 관련 타입
export type CharacterCard = {
  type: 'character';
  content: {
    character: string | StaticImageData;
    badge: string;
    title: string;
  };
};

export type TextCard = {
  type: 'text';
  content: {
    badge: string;
    date: string;
    advisory: string;
    tags: string[][];
  };
};

export type Card = CharacterCard | TextCard;
