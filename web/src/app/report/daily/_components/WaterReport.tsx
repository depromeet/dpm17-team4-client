import type { Water } from '../types';
import { getWaterLevelColor, getWaterNameLabel } from '../utils';

const WATER_HEIGHT = 164;
const WATER_MAX_VALUE = 2000;
const LITER_UNIT = 1000;

export const WaterReport = ({ waterData }: { waterData: Water }) => {
  return (
    <div className="bg-[#272B31] rounded-[14px] py-7 px-6 w-full">
      <p className="text-[#707885] text-body3-m mb-2">물 섭취량 분석 결과</p>
      <p className="text-white text-[18px] font-semibold whitespace-pre-line">
        {waterData.message}
      </p>
      <div className="flex gap-6 items-end justify-center px-4 pt-4 pb-4">
        {waterData.items.map((item) => (
          <div key={item.name} className="flex flex-col items-center">
            <div
              className="rounded-md w-9.5 mb-3"
              style={{
                height: `${(WATER_HEIGHT / WATER_MAX_VALUE) * item.value}px`,
                backgroundColor:
                  item.name === 'STANDARD'
                    ? '#4E5560'
                    : getWaterLevelColor(item.value),
              }}
            />
            <p className="text-[#99A1B1] text-body4-m">
              {getWaterNameLabel(item.name)}
            </p>
            <p
              className="text-body2-m"
              style={{
                color:
                  item.name === 'STANDARD'
                    ? '#ffffff'
                    : getWaterLevelColor(item.value),
              }}
            >
              {item.value >= LITER_UNIT
                ? `${(item.value / LITER_UNIT).toFixed(1).replace(/\.0$/, '')}L`
                : `${item.value}ml`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
