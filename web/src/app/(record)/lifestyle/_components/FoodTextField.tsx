import { type ChangeEvent, useState } from 'react';
import { useDebounce } from '@/hooks';
import { FoodList } from './FoodList';
import { TimeBottomSheet } from './TimeBottomSheet';

const DEBOUNCE_DELAY = 300;

interface FoodTextFieldProps {
  id: number;
  initialFoodName: string;
  initialFoodTime: string;
  onRemove?: () => void;
  onFoodNameChange?: (foodName: string) => void;
  onFoodTimeChange?: (foodTime: string) => void;
  canRemove?: boolean;
}

export const FoodTextField = ({ 
  id,
  initialFoodName, 
  initialFoodTime, 
  onRemove, 
  onFoodNameChange,
  onFoodTimeChange,
  canRemove = false 
}: FoodTextFieldProps) => {
  const [foodName, setFoodName] = useState(initialFoodName);
  const [isFoodSelected, setIsFoodSelected] = useState(false);
  const [selectedTime, setSelectedTime] = useState(initialFoodTime);
  const [isTimeBottomSheetOpen, setIsTimeBottomSheetOpen] = useState(false);

  const debouncedFoodName = useDebounce(foodName, DEBOUNCE_DELAY);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFoodName = e.target.value;
    setFoodName(newFoodName);
    setIsFoodSelected(false); // 사용자가 타이핑하면 선택 상태 해제
    onFoodNameChange?.(newFoodName);
  };

  const handleRemoveFood = () => {
    if (canRemove && onRemove) {
      onRemove(); // 전체 FoodTextField 삭제
    } else {
      setFoodName(''); // 텍스트만 지우기
      setIsFoodSelected(false);
      onFoodNameChange?.(''); // 빈 문자열로 업데이트
    }
  };

  const handleFoodSelect = (selectedFood: string) => {
    setFoodName(selectedFood);
    setIsFoodSelected(true); // 음식이 선택되면 선택 상태로 설정
    onFoodNameChange?.(selectedFood);
  };

  const handleTimeClick = () => {
    setIsTimeBottomSheetOpen(true);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    onFoodTimeChange?.(time);
  };

  const handleCloseTimeBottomSheet = () => {
    setIsTimeBottomSheetOpen(false);
  };

  return (
    <div>
      <div>
        <div className="h-[0.9375rem]" />
        <div className="w-full p-[1rem] flex gap-[0.75rem] rounded-[0.94rem] bg-gray-800">
          <button
            type="button"
            onClick={handleTimeClick}
            className="bg-gray-600 text-gray-200 rounded-[0.5rem] px-[0.375rem] py-[0.25rem] flex gap-[0.25rem] hover:bg-gray-500 transition-colors"
          >
            {selectedTime}
          </button>

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
      
      <TimeBottomSheet
        isOpen={isTimeBottomSheetOpen}
        onClose={handleCloseTimeBottomSheet}
        onTimeSelect={handleTimeSelect}
      />
    </div>
  );
};
