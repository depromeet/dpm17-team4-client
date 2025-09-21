import { PlusIcon } from 'lucide-react';
import { memo } from 'react';
import { Button } from '@/components';
import type { Food } from '../types/dto';
import type { MealTime } from '../types/entitites';
import { FoodTextField } from './FoodTextField';

interface FoodListContainerProps {
  foods: Food[];
  setFoods: React.Dispatch<React.SetStateAction<Food[]>>;
}

export const FoodListContainer = memo(
  ({ foods, setFoods }: FoodListContainerProps) => {
    const handleAddFood = () => {
      //NOTE(seieun): food textfield 에 대한 식별자 id 추가, foodId 는 음식 고유 id
      const newId = Math.max(...foods.map((food) => food.id)) + 1;
      setFoods((prev) => [
        ...prev,
        { id: newId, foodId: -1, name: '', mealTime: '' },
      ]);
    };

    const handleRemoveFood = (idToRemove: number) => {
      if (foods.length > 1) {
        setFoods((prev) => prev.filter((food) => food.id !== idToRemove));
      }
    };

    const handleFoodChange = (
      id: number,
      newFoodId: number,
      foodName: string
    ) => {
      setFoods((prev) =>
        prev.map((food) =>
          food.id === id
            ? {
                ...food,
                foodId: newFoodId,
                name: foodName,
              }
            : food
        )
      );
    };

    const handleFoodTimeChange = (id: number, mealTime: MealTime) => {
      setFoods((prev) =>
        prev.map((food) =>
          food.id === id
            ? {
                ...food,
                mealTime,
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
            <Button
              size="32"
              color="secondary"
              onClick={handleAddFood}
              className="text-gray-300 flex"
            >
              <PlusIcon className="text-gray-300 w-[1rem] h-[1rem]" />{' '}
              <span className="text-gray-300 text-button-4">음식 추가</span>
            </Button>
          </div>
          {foods.map((food) => (
            <div key={food.id} className="relative">
              <FoodTextField
                id={food.id}
                initialFoodName={food.name}
                initialFoodTime={food.mealTime ? food.mealTime : ''}
                onRemove={() => handleRemoveFood(food.id)}
                onFoodChange={(_, newFoodId, foodName) =>
                  handleFoodChange(food.id, newFoodId, foodName)
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
