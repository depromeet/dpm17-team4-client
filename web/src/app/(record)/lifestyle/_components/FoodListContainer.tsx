import { useState } from 'react';
import { Button } from '@/components';
import { FoodTextField } from './FoodTextField';

interface FoodData {
  id: number;
  foodName: string;
  foodTime: string;
}

export const FoodListContainer = () => {
  const [foodTextFields, setFoodTextFields] = useState<FoodData[]>([{ id: 1, foodName: '', foodTime: '시간' }]);

  const handleAddFood = () => {
    const newId = Math.max(...foodTextFields.map(field => field.id)) + 1;
    setFoodTextFields(prev => [...prev, { id: newId, foodName: '', foodTime: '시간' }]);
  };

  const handleRemoveFood = (idToRemove: number) => {
    if (foodTextFields.length > 1) {
      setFoodTextFields(prev => prev.filter(field => field.id !== idToRemove));
    }
  };

  const handleFoodNameChange = (id: number, foodName: string) => {
    setFoodTextFields(prev => 
      prev.map(field => 
        field.id === id ? { ...field, foodName } : field
      )
    );
  };

  const handleFoodTimeChange = (id: number, foodTime: string) => {
    setFoodTextFields(prev => 
      prev.map(field => 
        field.id === id ? { ...field, foodTime } : field
      )
    );
  };

  console.log(foodTextFields)
  return (
    <div>
      <div className="px-[1rem]">
        <div className="flex justify-between items-center">
          <div className="text-h4 text-gray-400">먹은 음식</div>
          <Button size="32" color="secondary" onClick={handleAddFood}>
            + 음식 추가
          </Button>
        </div>
        {foodTextFields.map((field, index) => (
          <div key={field.id} className="relative">
            <FoodTextField 
              id={field.id}
              initialFoodName={field.foodName}
              initialFoodTime={field.foodTime}
              onRemove={() => handleRemoveFood(field.id)}
              onFoodNameChange={(foodName) => handleFoodNameChange(field.id, foodName)}
              onFoodTimeChange={(foodTime) => handleFoodTimeChange(field.id, foodTime)}
              canRemove={foodTextFields.length > 1}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
