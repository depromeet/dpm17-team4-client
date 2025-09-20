import { useState } from 'react';
import { Button } from '@/components';
import { FoodTextField } from './FoodTextField';

export const FoodListContainer = () => {
  const [foodTextFields, setFoodTextFields] = useState([{ id: 1 }]);

  const handleAddFood = () => {
    const newId = Math.max(...foodTextFields.map(field => field.id)) + 1;
    setFoodTextFields(prev => [...prev, { id: newId }]);
  };

  const handleRemoveFood = (idToRemove: number) => {
    if (foodTextFields.length > 1) {
      setFoodTextFields(prev => prev.filter(field => field.id !== idToRemove));
    }
  };

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
              onRemove={() => handleRemoveFood(field.id)}
              canRemove={foodTextFields.length > 1}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
