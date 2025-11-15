'use client';

import { useState } from 'react';
import type { Water, WaterItem } from '../daily/types';
import {
  getMonthlyWaterNameLabel,
  getWaterNameLabel,
  getWeeklyWaterNameLabel,
} from '../daily/utils';
import { Tooltip } from './Tooltip';

const WATER_MAX_VALUE = 2000;
const WATER_HEIGHT = 164;

const DAILY_WATER_ORDER = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
] as const;

const WEEKLY_WATER_ORDER = [
  '1주차',
  '2주차',
  '3주차',
  '4주차',
  '5주차',
] as const;

const fillMissingItems = (
  items: WaterItem[],
  order: readonly string[]
): WaterItem[] => {
  const dataMap = new Map(items.map((item) => [item.name, item]));

  return order.map((name) => {
    const existingData = dataMap.get(name);
    return (
      existingData || {
        name,
        value: 0,
        color: '',
        level: '',
      }
    );
  });
};

const DailyWaterContent = ({
  items,
  isTooltipVisible,
  onTooltipToggle,
}: {
  items: WaterItem[];
  isTooltipVisible: string | null;
  onTooltipToggle: (name: string) => void;
}) => {
  return (
    <>
      {items.map((waterItem) => (
        <div key={waterItem.name} className="w-5 h-[194px]">
          <div className="h-full w-full flex flex-col gap-3 items-center justify-end">
            <button
              type="button"
              className="relative rounded-[6px] w-5"
              onClick={() => onTooltipToggle(waterItem.name)}
              style={{
                height: `${(waterItem.value / WATER_MAX_VALUE) * WATER_HEIGHT}px`,
                backgroundColor:
                  waterItem.name === 'STANDARD' ? '#4E5560' : '#7850FB',
              }}
            >
              <div className="z-50 absolute -top-[46px] left-0 right-0 pointer-events-none">
                {isTooltipVisible === waterItem.name && (
                  <Tooltip value={Math.round(waterItem.value)} />
                )}
              </div>
            </button>
            <p className="text-body4-m text-[#707885] whitespace-nowrap">
              {getWaterNameLabel(waterItem.name)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

const WeeklyWaterContent = ({
  items,
  isTooltipVisible,
  onTooltipToggle,
}: {
  items: WaterItem[];
  isTooltipVisible: string | null;
  onTooltipToggle: (name: string) => void;
}) => {
  const displayItems = fillMissingItems(items, DAILY_WATER_ORDER);

  return (
    <>
      {displayItems.map((waterItem) => (
        <div key={waterItem.name} className="w-5 h-[194px]">
          <div className="h-full w-full flex flex-col gap-3 items-center justify-end">
            {waterItem.value > 0 ? (
              <button
                type="button"
                className="relative rounded-[6px] bg-[#7850FB] w-5"
                onClick={() => onTooltipToggle(waterItem.name)}
                style={{
                  height: `${(waterItem.value / WATER_MAX_VALUE) * WATER_HEIGHT}px`,
                }}
              >
                <div className="z-50 absolute -top-[46px] left-0 right-0 pointer-events-none">
                  {isTooltipVisible === waterItem.name && (
                    <Tooltip value={Math.round(waterItem.value)} />
                  )}
                </div>
              </button>
            ) : (
              <div className="w-5" />
            )}
            <p className="text-body4-m text-[#707885] whitespace-nowrap">
              {getWeeklyWaterNameLabel(waterItem.name)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

const MonthlyWaterContent = ({
  items,
  isTooltipVisible,
  onTooltipToggle,
}: {
  items: WaterItem[];
  isTooltipVisible: string | null;
  onTooltipToggle: (name: string) => void;
}) => {
  const displayItems = fillMissingItems(items, WEEKLY_WATER_ORDER);

  return (
    <>
      {displayItems.map((waterItem) => (
        <div key={waterItem.name} className="w-5 h-[194px]">
          <div className="h-full w-full flex flex-col gap-3 items-center justify-end">
            {waterItem.value > 0 ? (
              <button
                type="button"
                className="relative rounded-[6px] bg-[#7850FB] w-5"
                onClick={() => onTooltipToggle(waterItem.name)}
                style={{
                  height: `${(waterItem.value / WATER_MAX_VALUE) * WATER_HEIGHT}px`,
                }}
              >
                <div className="z-50 absolute -top-[46px] left-0 right-0 pointer-events-none">
                  {isTooltipVisible === waterItem.name && (
                    <Tooltip value={Math.round(waterItem.value)} />
                  )}
                </div>
              </button>
            ) : (
              <div className="w-5" />
            )}
            <p className="text-body4-m text-[#707885] whitespace-nowrap">
              {getMonthlyWaterNameLabel(waterItem.name)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export const WaterReport = ({
  waterData,
  type,
}: {
  waterData: Water;
  type: 'daily' | 'weekly' | 'monthly';
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState<string | null>(null);

  const handleTooltipToggle = (name: string) => {
    if (isTooltipVisible === name) {
      setIsTooltipVisible(null);
    } else {
      setIsTooltipVisible(name);
    }
  };

  const renderWaterContent = () => {
    const commonProps = {
      items: waterData.items,
      isTooltipVisible,
      onTooltipToggle: handleTooltipToggle,
    };

    switch (type) {
      case 'daily':
        return <DailyWaterContent {...commonProps} />;
      case 'weekly':
        return <WeeklyWaterContent {...commonProps} />;
      case 'monthly':
        return <MonthlyWaterContent {...commonProps} />;
      default:
        return null;
    }
  };

  if (type === 'daily') {
    const yesterdayWaterItem = waterData.items.find(
      (item) => item.name === 'YESTERDAY'
    );
    const todayWaterItem = waterData.items.find(
      (item) => item.name === 'TODAY'
    );
    const hasNoWaterData =
      yesterdayWaterItem?.value === 0 && todayWaterItem?.value === 0;

    if (hasNoWaterData) {
      return <NullWaterReport />;
    }
  } else {
    const hasNoWaterData = waterData.items.every((item) => item.value === 0);
    if (hasNoWaterData) {
      return <NullWaterReport />;
    }
  }

  return (
    <div className="bg-[#1B1D20] rounded-[14px] py-7 px-6 w-[calc(100%-40px)] mx-auto z-10">
      <p className="text-[#4E5560] text-body3-m mb-2">물 섭취량 분석 결과</p>
      <p className="text-white text-[18px] font-semibold mb-6 whitespace-pre-line leading-[1.35]">
        {waterData.message}
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

        <div className="flex items-center justify-around absolute top-[9px] right-[6px] left-[61px]">
          {renderWaterContent()}
        </div>
      </div>
    </div>
  );
};

export const NullWaterReport = () => {
  return (
    <div className="bg-[#1B1D20] rounded-[14px] py-7 px-6 w-[calc(100%-40px)] mx-auto z-10">
      <p className="text-[#4E5560] text-body3-m mb-2">물 섭취량 분석 결과</p>
      <p className="text-white text-[18px] font-semibold whitespace-pre-line leading-[1.35]">
        기록한 물 섭취량이 없어요!
        <br />
        규칙적인 기록이 장 건강에 도움이 돼요
      </p>
    </div>
  );
};
