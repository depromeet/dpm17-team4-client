import Image from 'next/image';
import { useState } from 'react';
import { BottomSheet } from '@/components/BottomSheet';
import { MEAL_TIMES } from '../constants';
import type { MealTime } from '../types/entitites';

interface TimeBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onTimeSelect: (time: MealTime) => void;
}

export const TimeBottomSheet = ({
  isOpen,
  onClose,
  onTimeSelect,
}: TimeBottomSheetProps) => {
  const [selectedTime, setSelectedTime] = useState('');

  const handleTimeSelect = (mealTime: (typeof MEAL_TIMES)[number]) => {
    setSelectedTime(mealTime.name);
    onTimeSelect(mealTime.id);
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="p-[1.5rem]">
        <div className="space-y-[0.75rem]">
          <div className="text-body1-sb text-gray-300 mb-[1rem] flex justify-center">
            식사 시간
          </div>

          <div className="flex justify-center gap-[0.4rem] w-[100vw]">
            {MEAL_TIMES.map((mealTime) => (
              <button
                key={mealTime.id}
                type="button"
                onClick={() => handleTimeSelect(mealTime)}
                className={`flex items-center gap-[0.5rem] px-[0.94rem] py-[0.69rem] rounded-[0.625rem] text-white text-body2-m transition-colors h-fit ${
                  selectedTime === mealTime.name
                    ? 'bg-green-600'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <Image
                  src={mealTime.imageUrl}
                  alt={mealTime.name}
                  width={19}
                  height={19}
                  className="w-[1.19rem] h-[1.19rem] object-cover"
                />
                <span className="whitespace-nowrap">{mealTime.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </BottomSheet>
  );
};
