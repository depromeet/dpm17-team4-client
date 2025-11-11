import type { MealTime, StressLevel } from '../entitites';

export interface Food {
  id: number;
  foodId: number;
  name: string;
  mealTime: MealTime | '';
}

export interface LifeStyleCreateRequestDto {
  water: number;
  stress: StressLevel | null;
  foods: Omit<Food, 'name' | 'foodId'>[];
  occurredAt: string;
}

export interface FoodSearchItem {
  id: number;
  name: string;
}

export interface FoodSearchResponseDto {
  items: FoodSearchItem[];
}

export interface FoodSearchParams {
  query: string;
  count?: number;
}
