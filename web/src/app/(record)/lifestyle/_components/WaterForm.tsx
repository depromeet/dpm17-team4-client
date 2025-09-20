import { ChangeEvent } from 'react';

const TOTAL_STEPS = 10;

interface WaterFormProps {
  waterCups: number;
  setWaterCups: (cups: number) => void;
}

export const WaterForm = ({ waterCups, setWaterCups }: WaterFormProps) => {
  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWaterCups(parseInt(e.target.value));
  };

  return (
    <div className="px-[1rem]">
      <div className="p-[1.25rem] bg-gray-800 rounded-[0.94rem]">
        <div className="text-body3-m text-gray-300 mb-[1.5rem]">
          오늘 하루 물을 얼마나 마셨나요? (종이컵 기준)
        </div>

        <div className="flex flex-col items-center">
          {/* Current Value Display */}
          <div className="text-h3 text-white mb-[1rem]">{waterCups}잔</div>

          {/* Progress Bar Container */}
          <div className="relative w-full max-w-[20rem]">
            {/* Slider Input */}
            <input
              type="range"
              min="0"
              max={TOTAL_STEPS}
              value={waterCups}
              onChange={handleSliderChange}
              className="w-full h-[1.875rem] rounded-[62.4375rem] appearance-none cursor-pointer px-[0.25rem] py-[0.38rem] bg-gradient-to-r from-[#52DFDB] to-[#008CFF] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:appearance-none"
            />
          </div>

          {/* Range Labels */}
          <div className="flex justify-between w-full max-w-[20rem] mt-[1rem]">
            <span className="text-body2 text-white">0잔</span>
            <span className="text-body2 text-blue-400">10잔 이상</span>
          </div>
        </div>
      </div>
    </div>
  );
};
