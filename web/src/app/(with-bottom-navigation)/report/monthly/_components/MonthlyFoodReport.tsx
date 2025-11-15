'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronThinIcon } from '@/components';
import { cn } from '@/utils/utils-cn';
import { formatToDayWithWeekday, formatToMonthDay } from '@/utils/utils-date';
import { getMealTimeLabel } from '../../daily/utils';
import type { MonthlyFoodReport as MonthlyFoodReportType } from '../types';
import GreatFoodReportImage from './assets/GreatFoodReport.png';

type MonthlyFoodReportProps = {
  food?: MonthlyFoodReportType;
};

export function MonthlyFoodReport({ food }: MonthlyFoodReportProps) {
  const [openWeekLabel, setOpenWeekLabel] = useState<string | null>(null);

  if (!food) {
    return null;
  }

  const isIncreased =
    food.monthlyComparison.lastMonth < food.monthlyComparison.thisMonth;
  const difference = Math.abs(
    food.monthlyComparison.lastMonth - food.monthlyComparison.thisMonth
  );

  return (
    <div className="bg-[#1B1D20] rounded-[14px] py-7 px-6 w-[calc(100%-40px)] mx-auto z-10">
      <p className="text-[#4E5560] text-body3-m mb-2">식단 분석 결과</p>
      {food.monthlyComparison.thisMonth === 0 ? (
        <div className="flex items-start justify-between gap-2">
          <p className="text-white text-[18px] font-semibold whitespace-pre-line leading-[1.35]">
            {food.message}
          </p>
          <div className="mt-2 flex justify-end">
            <Image
              src={GreatFoodReportImage}
              alt="좋은 식단 이미지"
              width={80}
              height={80}
            />
          </div>
        </div>
      ) : (
        <p className="text-white text-[18px] font-semibold mb-6 whitespace-pre-line leading-[1.35]">
          {food.message}
        </p>
      )}
      {food.monthlyComparison.thisMonth !== 0 && (
        <>
          {food.monthlyComparison.lastMonth !==
            food.monthlyComparison.thisMonth && (
            <div
              className={`flex items-center justify-center text-center py-2 px-3 w-full rounded-[6px] mb-5 ${isIncreased ? 'bg-red-100' : 'bg-blue-100'}`}
            >
              <p className="text-body4-m text-white">
                {`지난 달보다 자극적인 음식 섭취가 `}
                <span
                  className={`${isIncreased ? 'text-red-600' : 'text-blue-600'}`}
                >
                  {difference}회
                </span>
                {`${isIncreased ? ' 늘었어요' : ' 줄었어요'}`}
              </p>
            </div>
          )}
          <div className="flex flex-col gap-2.5 items-center justify-center">
            {food.weeklyGroups.map((week) => (
              <div
                key={week.weekLabel}
                className="bg-[#292D32] rounded-[6px] py-3 px-4 w-full"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center gap-1">
                    <p className="text-body3-sb text-white">{week.weekLabel}</p>
                    <p className="text-body4-r text-[#707885]">
                      ({formatToMonthDay(week.startDate)} -{' '}
                      {formatToMonthDay(week.endDate)})
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <p
                      className={`text-[14px] font-medium ${week.items.length === 0 ? 'text-[#707885]' : 'text-red-600'}`}
                    >
                      {week.items.length}회
                    </p>
                    <ChevronThinIcon
                      onClick={() => {
                        if (week.items.length === 0) return;
                        setOpenWeekLabel(
                          openWeekLabel === week.weekLabel
                            ? null
                            : week.weekLabel
                        );
                      }}
                      type={openWeekLabel === week.weekLabel ? 'up' : 'down'}
                      className={cn(
                        'will-change-transform transition-transform duration-300 text-white',
                        week.items.length === 0 ? 'opacity-40' : ''
                      )}
                    />
                  </div>
                </div>
                {openWeekLabel === week.weekLabel && (
                  <div className="flex flex-col gap-2 mt-3">
                    {week.items.map((item) => (
                      <div
                        key={`${item.occurredAt}_${item.mealTime}`}
                        className="flex items-start justify-between"
                      >
                        <p className="text-body4-m text-[#707885]">
                          {formatToDayWithWeekday(item.occurredAt)},{' '}
                          {getMealTimeLabel(item.mealTime)}
                        </p>
                        <p className="text-body4-m text-white text-end max-w-[181px]">
                          {item.foods.join(', ')}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
