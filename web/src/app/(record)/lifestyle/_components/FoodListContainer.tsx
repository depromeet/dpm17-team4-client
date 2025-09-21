
import { Button } from '@/components';
import { Food } from '../types/dto';
import { FoodTextField } from './FoodTextField';
import { MealTime } from '../types/entitites';
import { memo } from 'react';

interface FoodListContainerProps {
  foods: Food[];
  setFoods: React.Dispatch<React.SetStateAction<Food[]>>;
}

export const FoodListContainer = memo(
  ({ foods, setFoods }: FoodListContainerProps) => {
    const handleAddFood = () => {
      const newId = Math.max(...foods.map((food) => food.id)) + 1;
      setFoods((prev) => [...prev, { id: newId, name: '', mealTime: '' }]);
    };

    const handleRemoveFood = (idToRemove: number) => {
      if (foods.length > 1) {
        setFoods((prev) => prev.filter((food) => food.id !== idToRemove));
      }
    };

    const handleFoodNameChange = (id: number, foodName: string) => {
      setFoods((prev) =>
        prev.map((food) =>
          food.id === id ? { ...food, name: foodName } : food
        )
      );
    };

    const handleFoodTimeChange = (id: number, mealTime: MealTime) => {
      setFoods((prev) =>
        prev.map((food) =>
          food.id === id
            ? {
                ...food,
                mealTime
              }
            : food
        )
      );
    };

    console.log(foods);
    return (
      <div>
        <div className="px-[1rem]">
          <div className="flex justify-between items-center">
            <div className="text-h4 text-gray-400">먹은 음식</div>
            <Button size="32" color="secondary" onClick={handleAddFood}>
              + 음식 추가
            </Button>
          </div>
          {foods.map((food) => (
            <div key={food.id} className="relative">
              <FoodTextField
                id={food.id}
                initialFoodName={food.name}
                initialFoodTime={food.mealTime ? food.mealTime : '시간'}
                onRemove={() => handleRemoveFood(food.id)}
                onFoodNameChange={(foodName) =>
                  handleFoodNameChange(food.id, foodName)
                }
                onFoodTimeChange={(foodTime) =>
                  handleFoodTimeChange(food.id, foodTime)
                }
                canRemove={foods.length > 1}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
);
