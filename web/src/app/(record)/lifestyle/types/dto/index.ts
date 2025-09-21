import type { MealTime, StressLevel } from '../entitites';

export interface Food {
  id: number;
  foodId: number;
  name: string;
  mealTime: MealTime | '';
}

export interface LifeStyleCreateRequestDto {
  water: number;
  stress: StressLevel | '';
  foods: Omit<Food, 'name' | 'foodId'>[];
  occurredAt: string;
}
