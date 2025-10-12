import { ChevronDownIcon, MinusIcon, XIcon } from 'lucide-react';
import { type ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from '@/hooks';
import { TIME_LABEL_MAP } from '../constants';
import type { MealTime } from '../types/entitites';
import { FoodList } from './FoodList';
import { TimeBottomSheet } from './TimeBottomSheet';

const DEBOUNCE_DELAY = 300;

interface FoodTextFieldProps {
  id: number;
  initialFoodName: string;
  initialFoodTime: MealTime | '';
  onRemove?: () => void;
  onFoodChange?: (id: number, foodId: number, foodName: string) => void;
  onFoodTimeChange?: (foodTime: MealTime) => void;
  canRemove?: boolean;
}

export const FoodTextField = ({
  id,
  initialFoodName,
  initialFoodTime,
  onRemove,
  onFoodChange,
  onFoodTimeChange,
  canRemove = false,
}: FoodTextFieldProps) => {
  const [foodName, setFoodName] = useState(initialFoodName);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [selectedTime, setSelectedTime] = useState(initialFoodTime);
  const [isTimeBottomSheetOpen, setIsTimeBottomSheetOpen] = useState(false);

  // props가 변경될 때 내부 상태 업데이트
  useEffect(() => {
    setFoodName(initialFoodName);
    // 기존 데이터가 로드되면 타이핑 상태 초기화
    //setIsUserTyping(false);
  }, [initialFoodName]);

  useEffect(() => {
    setSelectedTime(initialFoodTime);
  }, [initialFoodTime]);

  const debouncedFoodName = useDebounce(foodName, DEBOUNCE_DELAY);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFoodName = e.target.value;
    setFoodName(newFoodName);
    setIsUserTyping(true); // 사용자가 타이핑하면 타이핑 상태로 설정
    onFoodChange?.(id, -1, newFoodName); // id와 foodId는 -1로 유지 (직접 입력)
  };

  const handleRemoveFood = () => {
    if (!isUserTyping && canRemove && onRemove) {
      onRemove();
    } else {
      setFoodName('');
      setIsUserTyping(false);
      onFoodChange?.(id, -1, '');
    }
  };

  const handleFoodSelect = (foodId: number, foodName: string) => {
    setFoodName(foodName);
    onFoodChange?.(id, foodId, foodName); // 선택된 음식의 ID와 이름 업데이트
    
    // 음식 선택 후 약간의 지연을 두고 타이핑 상태 해제 (FoodList가 자연스럽게 사라지도록)
    setTimeout(() => {
      setIsUserTyping(false);
    }, 100);
  };

  const handleTimeClick = () => {
    setIsTimeBottomSheetOpen(true);
  };

  const handleTimeSelect = (time: MealTime) => {
    setSelectedTime(time);
    onFoodTimeChange?.(time);
  };

  const handleCloseTimeBottomSheet = () => {
    setIsTimeBottomSheetOpen(false);
  };

  // 선택된 시간이 식사 시간인지 확인
  const isMealTimeSelected =
    selectedTime !== '' && selectedTime in TIME_LABEL_MAP;

    console.log(isUserTyping, 'isUserTyping')
  return (
    <div>
      <div>
        <div className="h-[0.9375rem]" />
        <div className="w-full p-[1rem] flex gap-[0.75rem] rounded-[0.94rem] bg-gray-800 items-center">
          <button
            type="button"
            onClick={handleTimeClick}
            className={`${
              isMealTimeSelected
                ? 'bg-green-600 text-white hover:bg-green-500'
                : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
            } rounded-[0.5rem] px-[0.375rem] py-[0.25rem] flex gap-[0.25rem] transition-colors text-body3-m items-center`}
          >
            {selectedTime in TIME_LABEL_MAP
              ? TIME_LABEL_MAP[selectedTime as MealTime]
              : '시간'}
            <ChevronDownIcon className="w-[1rem] h-[1rem] text-gray-200" />
          </button>

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
            className="bg-gray-600 rounded-full w-[1.5rem] h-[1.5rem] flex items-center justify-center"
          >
            {!isUserTyping ? (
              <MinusIcon className="w-[1rem] h-[1rem] text-gray-200" />
            ) : (
              <XIcon className="w-[1rem] h-[1rem] text-gray-200" />
            )}
          </button>
        </div>
      </div>

      {debouncedFoodName && isUserTyping && foodName.trim().length > 0 && (
        <>
          <div className="h-[0.9375rem]" />
          <FoodList
            debouncedFoodName={debouncedFoodName}
            onFoodSelect={handleFoodSelect}
            isUserTyping={isUserTyping}
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
