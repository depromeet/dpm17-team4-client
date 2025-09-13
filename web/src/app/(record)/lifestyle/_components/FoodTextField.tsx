import { ChangeEvent, useState } from 'react';
import { Button } from '@/components';
import { useDebounce } from '@/hooks';
import { FoodList } from './FoodList';

const DEBOUNCE_DELAY = 300;
export const FoodTextField = () => {
  const [foodName, setFoodName] = useState('');

  const debouncedFoodName = useDebounce(foodName, DEBOUNCE_DELAY);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFoodName(e.target.value);
  };

  const handleRemoveFood = () => {
    setFoodName('');
  };

  return (
    <div>
      <div className="px-[1rem]">
        <div className="flex justify-between items-center">
          <div className="text-h4 text-gray-400">먹은 음식</div>
          <Button size="32" color="secondary">
            + 음식 추가
          </Button>
        </div>
        <div className="h-[0.9375rem]" />
        <div className="w-full p-[1rem] flex gap-[0.75rem] rounded-[0.94rem] bg-gray-800">
          <div className="bg-gray-600 text-gray-200 rounded-[0.5rem] px-[0.375rem] py-[0.25rem] flex gap-[0.25rem]">
            시간
          </div>

          <input
            type="text"
            placeholder="음식 이름을 입력해주세요"
            value={foodName}
            onChange={handleInputChange}
            className="flex-1 text-white bg-transparent outline-none placeholder:text-gray-400"
          />
          <button
            type="button"
            onClick={handleRemoveFood}
            className="text-white hover:text-gray-300 transition-colors"
          >
            x
          </button>
        </div>
      </div>
      <div className="h-[0.9375rem]" />
      {debouncedFoodName && <FoodList debouncedFoodName={debouncedFoodName} />}
    </div>
  );
};
