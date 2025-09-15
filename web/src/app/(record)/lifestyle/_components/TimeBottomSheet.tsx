import { useState } from 'react';
import { BottomSheet } from '@/components/BottomSheet';

const MEAL_TIMES = [
  {
    id: 'breakfast',
    name: '아침',
    imageUrl: '',
  },
  {
    id: 'lunch',
    name: '점심',
    imageUrl: '',
  },
  {
    id: 'dinner',
    name: '저녁',
    imageUrl: '',
  },
  {
    id: 'snack',
    name: '간식',
    imageUrl: '',
  },
] as const;

interface TimeBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onTimeSelect: (time: string) => void;
}

export const TimeBottomSheet = ({
  isOpen,
  onClose,
  onTimeSelect,
}: TimeBottomSheetProps) => {
  const [selectedTime, setSelectedTime] = useState('');

  const handleTimeSelect = (mealTime: (typeof MEAL_TIMES)[number]) => {
    setSelectedTime(mealTime.name);
    onTimeSelect(mealTime.name);
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="p-[1.5rem]">
        <div className="space-y-[0.75rem]">
          <div className="text-body1-sb text-gray-300 mb-[1rem] flex justify-center">
            식사 시간
          </div>

          <div className="flex justify-center gap-[0.4rem]">
            {MEAL_TIMES.map((mealTime) => (
              <button
                key={mealTime.id}
                onClick={() => handleTimeSelect(mealTime)}
                className={`flex items-center gap-[0.5rem] px-[0.94rem] py-[0.69rem] rounded-[0.625rem] text-white text-body2-m transition-colors h-fit ${
                  selectedTime === mealTime.name
                    ? 'bg-blue-500'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <img
                  src={mealTime.imageUrl}
                  alt={mealTime.name}
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
