'use client';

import { useState } from 'react';
import { mockMonthlyReportData } from '../monthly/mockData';
import { Tooltip } from './Tooltip';

const WATER_MAX_VALUE = 2000;
const WATER_HEIGHT = 164;

export const NWaterReport = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState<string | null>(null);

  return (
    <div className="bg-[#1B1D20] rounded-[14px] py-7 px-6 w-full">
      <p className="text-[#4E5560] text-body3-m mb-2">물 섭취량 분석 결과</p>
      <p className="text-white text-[18px] font-semibold mb-6 whitespace-pre-line">
        {mockMonthlyReportData.water.message}
      </p>
      <div className="flex flex-col items-center justify-center gap-10 w-full relative pb-[73px]">
        {['충분', '보통', '부족'].map((item) => (
          <div
            key={item}
            className="w-full flex items-center justify-between gap-5"
          >
            <p className="text-body4-m text-[#707885] whitespace-nowrap">
              {item}
            </p>
            <div className="w-full border-t border-[#292D32]" />
          </div>
        ))}

        <div className="flex items-center gap-7 absolute top-[9px] right-[6px] left-[61px]">
          {mockMonthlyReportData.water.items.map((waterItem) => (
            <div key={waterItem.name} className="w-5 h-[194px]">
              <div className="h-full w-full flex flex-col gap-3 items-center justify-end">
                <button
                  type="button"
                  className="relative rounded-[6px] bg-[#7850FB] w-5"
                  onMouseEnter={() => setIsTooltipVisible(waterItem.name)}
                  onMouseLeave={() => setIsTooltipVisible(null)}
                  style={{
                    height: `${(waterItem.value / WATER_MAX_VALUE) * WATER_HEIGHT}px`,
                  }}
                >
                  <div className="z-9999 absolute -top-[46px] left-0 right-0 pointer-events-none">
                    {isTooltipVisible === waterItem.name && (
                      <Tooltip value={Math.round(waterItem.value)} />
                    )}
                  </div>
                </button>
                <p className="text-body4-m text-[#707885] whitespace-nowrap">
                  {waterItem.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
