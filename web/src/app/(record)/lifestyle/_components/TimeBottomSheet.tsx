import { Check, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { BottomSheet } from '@/components/BottomSheet';
import { MEAL_TIMES } from '../constants';
import type { MealTime } from '../types/entitites';

interface TimeBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onTimeSelect: (time: MealTime) => void;
  selectedMealTime: MealTime | '';
}

export const TimeBottomSheet = ({
  isOpen,
  onClose,
  onTimeSelect,
  selectedMealTime,
}: TimeBottomSheetProps) => {
  const [selectedTime, setSelectedTime] = useState(selectedMealTime || '');

  const handleTimeSelect = (mealTime: (typeof MEAL_TIMES)[number]) => {
    setSelectedTime(mealTime.name);
    onTimeSelect(mealTime.id);
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="px-[16px] pb-[20px]">
        <div className="space-y-[0.75rem]">
          <div className="text-body1-m text-white mb-[20px] flex justify-between items-center">
            식사 시간
            <button
              type="button"
              onClick={onClose}
              aria-label="닫기"
              className="p-1 text-white"
            >
              <X className="w-[24px] h-[24px]" />
            </button>
          </div>
          <div className="flex flex-col w-full">
            {MEAL_TIMES.map((mealTime) => (
              <button
                key={mealTime.id}
                type="button"
                onClick={() => handleTimeSelect(mealTime)}
                className={`flex items-center justify-between py-[0.75rem] rounded-[0.625rem] text-body2-m transition-colors h-fit w-full `}
              >
                <div className="flex items-center gap-[0.75rem]">
                  <Image
                    src={mealTime.imageUrl}
                    alt={mealTime.name}
                    width={19}
                    height={19}
                    className="w-[1.19rem] h-[1.19rem] object-cover"
                  />
                  <span
                    className={`whitespace-nowrap ${
                      selectedTime === mealTime.id
                        ? 'text-primary-600 text-body2-sb'
                        : 'text-white text-body2-m'
                    }`}
                  >
                    {mealTime.name}
                  </span>
                </div>
                {selectedTime === mealTime.id && (
                  <Check className="w-[1.19rem] h-[1.19rem] text-primary-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </BottomSheet>
  );
};
