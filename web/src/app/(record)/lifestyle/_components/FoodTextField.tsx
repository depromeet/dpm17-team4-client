import { type ChangeEvent, useState } from 'react';
import { useDebounce } from '@/hooks';
import { FoodList } from './FoodList';

const DEBOUNCE_DELAY = 300;

interface FoodTextFieldProps {
  onRemove?: () => void;
  canRemove?: boolean;
}

export const FoodTextField = ({ onRemove, canRemove = false }: FoodTextFieldProps) => {
  const [foodName, setFoodName] = useState('');
  const [isFoodSelected, setIsFoodSelected] = useState(false);

  const debouncedFoodName = useDebounce(foodName, DEBOUNCE_DELAY);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFoodName(e.target.value);
    setIsFoodSelected(false); // 사용자가 타이핑하면 선택 상태 해제
  };

  const handleRemoveFood = () => {
    if (canRemove && onRemove) {
      onRemove(); // 전체 FoodTextField 삭제
    } else {
      setFoodName(''); // 텍스트만 지우기
      setIsFoodSelected(false);
    }
  };

  const handleFoodSelect = (selectedFood: string) => {
    setFoodName(selectedFood);
    setIsFoodSelected(true); // 음식이 선택되면 선택 상태로 설정
  };

  return (
    <div>
      <div>
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
          { (
            <button
              type="button"
              onClick={handleRemoveFood}
              className="text-white hover:text-gray-300 transition-colors"
            >
              x
            </button>
          )}
        </div>
      </div>
      
      {debouncedFoodName && !isFoodSelected && (
        <>
        <div className="h-[0.9375rem]" />
        <FoodList 
          debouncedFoodName={debouncedFoodName} 
          onFoodSelect={handleFoodSelect}
        />
        </>
      )}
    </div>
  );
};
