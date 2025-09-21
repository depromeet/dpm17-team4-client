import Image from 'next/image';
import { memo } from 'react';
import { STRESS_LEVELS } from '../constants';
import type { StressLevel } from '../types/entitites';

interface StressFormProps {
  selectedLevel: StressLevel | '';
  setSelectedLevel: (level: StressLevel) => void;
}

export const StressForm = memo(
  ({ selectedLevel, setSelectedLevel }: StressFormProps) => {
    const handleLevelSelect = (levelId: StressLevel) => {
      setSelectedLevel(levelId);
    };

    return (
      <div className="px-[1rem]">
        <div className="h-[0.5rem]" />
        <div className="text-h4 text-gray-400">스트레스</div>
        <div className="h-[0.25rem]" />
        <div className="p-[1.25rem] bg-gray-800 rounded-[0.94rem]">
          <div className="text-body3-m text-gray-300 mb-[1.5rem]">
            오늘 하루 스트레스 점수는 어떤가요?
          </div>

          <div className="flex justify-center gap-[1.5rem] overflow-scroll pl-[4.8rem]">
            {STRESS_LEVELS.map((level) => (
              <button
                key={level.id}
                type="button"
                onClick={() => handleLevelSelect(level.id)}
                className="flex flex-col items-center gap-[0.5rem] transition-all duration-200"
              >
                <div
                  className={`w-[3.5rem] h-[3.5rem] rounded-full flex items-center justify-center transition-all duration-200 overflow-hidden ${
                    selectedLevel === level.id
                      ? 'bg-white'
                      : 'bg-[#2c2c35]'
                  }`}
                >
                  <Image
                    src={level.imageUrl}
                    alt={`stress level ${level.range}`}
                    width={35}
                    height={35}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-body3 text-gray-300 text-center">
                  {level.range}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
);
