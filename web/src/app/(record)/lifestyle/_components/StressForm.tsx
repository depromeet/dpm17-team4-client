import { useState } from 'react';
import Image from 'next/image';

const STRESS_LEVELS = [
  {
    id: 'very-low',
    range: '0~20',
    imageUrl: '/images/stress-very-low.png',
  },
  {
    id: 'low',
    range: '21~40',
    imageUrl: '/images/stress-low.png',
  },
  {
    id: 'medium',
    range: '41~60',
    imageUrl: '/images/stress-medium.png',
  },
  {
    id: 'high',
    range: '61~80',
    imageUrl: '/images/stress-high.png',
  },
  {
    id: 'very-high',
    range: '81~100',
    imageUrl: '/images/stress-very-high.png',
  },
] as const;

export const StressForm = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>('');

  const handleLevelSelect = (levelId: string) => {
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
                    ? 'border-4 border-white'
                    : 'border-4 border-transparent'
                }`}
              >
                <Image
                  src={level.imageUrl}
                  alt={`stress level ${level.range}`}
                  width={56}
                  height={56}
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
};
