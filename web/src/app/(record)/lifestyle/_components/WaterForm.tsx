import { Minus, Plus } from 'lucide-react';
import { type ChangeEvent, memo } from 'react';

const TOTAL_STEPS = 10;

interface WaterFormProps {
  waterCups: number;
  setWaterCups: (cups: number) => void;
}

export const WaterForm = memo(({ waterCups, setWaterCups }: WaterFormProps) => {
  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWaterCups(parseInt(e.target.value, 10));
  };

  const handleDecrease = () => {
    if (waterCups > 0) {
      setWaterCups(waterCups - 1);
    }
  };

  const handleIncrease = () => {
    if (waterCups < TOTAL_STEPS) {
      setWaterCups(waterCups + 1);
    }
  };

  const isMinDisabled = waterCups === 0;
  const isMaxDisabled = waterCups === TOTAL_STEPS;

  return (
    <div className="px-[1rem]">
      <div className="p-[1.25rem] bg-gray-800 rounded-[0.94rem]">
        <div className="text-body3-m text-gray-300 mb-[1.5rem] flex justify-between">
          오늘 하루 물을 얼마나 마셨나요?
          <span className="text-body3-m text-gray-300">1잔: 200ml</span>
        </div>

        <div className="flex items-center justify-center gap-[1rem] mb-[1rem]">
          <button
            type="button"
            onClick={handleDecrease}
            disabled={isMinDisabled}
            className={`rounded-full w-[1.5rem] h-[1.5rem] flex items-center justify-center transition-colors ${
              isMinDisabled
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
          >
            <Minus
              className={`w-[1.19rem] h-[1.19rem] ${
                isMinDisabled ? 'text-gray-400' : 'text-white'
              }`}
            />
          </button>
          <div className="text-body2-sb text-white">{waterCups}잔</div>
          <button
            type="button"
            onClick={handleIncrease}
            disabled={isMaxDisabled}
            className={`rounded-full w-[1.5rem] h-[1.5rem] flex items-center justify-center transition-colors ${
              isMaxDisabled
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
          >
            <Plus
              className={`w-[1.19rem] h-[1.19rem] ${
                isMaxDisabled ? 'text-gray-400' : 'text-white'
              }`}
            />
          </button>
        </div>

        {/* Progress Bar Container */}
        <div className="relative w-full max-w-[20rem] mx-auto">
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
        <div className="flex justify-between w-full max-w-[20rem] mx-auto mt-[1rem]">
          <span className="text-body2 text-[#95E6FF]">0잔</span>
          <span className="text-body2 text-blue-400">10잔 이상</span>
        </div>
      </div>
    </div>
  );
});
