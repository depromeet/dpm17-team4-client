'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronIcon } from '@/components';
import { getDateFromDateString, getDayName } from '@/utils/utils-date';
import { getMealTimeLabel } from '../../daily/utils';
import GreatFoodReportImage from '../../monthly/_components/assets/GreatFoodReport.png';
import { mockWeeklyReportData } from '../mockData';

export function WeeklyFoodReport() {
  const [isExpanded, setIsExpanded] = useState(false);

  const isIncreased =
    mockWeeklyReportData.food.weeklyComparison.lastWeek <
    mockWeeklyReportData.food.weeklyComparison.thisWeek;
  const difference = Math.abs(
    mockWeeklyReportData.food.weeklyComparison.lastWeek -
      mockWeeklyReportData.food.weeklyComparison.thisWeek
  );

  const filteredFoodItems = mockWeeklyReportData.food.items.slice(0, 3);
  const showFoodItems = isExpanded
    ? mockWeeklyReportData.food.items
    : filteredFoodItems;

  return (
    <div className="bg-[#1B1D20] rounded-[14px] py-7 px-6 w-full">
      <p className="text-[#4E5560] text-body3-m mb-2">식단 분석 결과</p>
      {mockWeeklyReportData.food.weeklyComparison.thisWeek === 0 ? (
        <div className="flex items-start justify-between gap-2">
          <p className="text-white text-[18px] font-semibold whitespace-pre-line">
            {mockWeeklyReportData.food.message}
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
        <p className="text-white text-[18px] font-semibold mb-6 whitespace-pre-line">
          {mockWeeklyReportData.food.message}
        </p>
      )}
      {mockWeeklyReportData.food.weeklyComparison.thisWeek !== 0 && (
        <>
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
          <div className="flex flex-col gap-2.5 items-center justify-center">
            {showFoodItems.map((item) => (
              <div
                key={`${item.mealTime}_${item.occurredAt}`}
                className="flex items-center justify-between gap-2.5 py-2 px-4 bg-[#292D32] h-[53px] rounded-[6px]"
              >
                <div className="flex items-center justify-between">
                  <div className="w-[40px] flex flex-col text-center">
                    <p className="text-[11px] font-normal text-[#707885]">
                      {getDayName(new Date(item.occurredAt))}
                      {','}
                      {getDateFromDateString(item.occurredAt)}일
                    </p>
                    <p className="text-body3-sb text-white">
                      {getMealTimeLabel(item.mealTime)}
                    </p>
                  </div>
                  <span className="flex items-center w-[1px] h-[35px] bg-[#3C4149] mx-3" />
                  <div className="w-[155px] text-center">
                    <p className="text-start text-body3-m text-white">
                      {item.foods.join(',')}
                    </p>
                  </div>
                </div>
                <div className="w-[34px] h-5 flex items-center justify-center rounded-[4px] bg-red-600 py-1 px-[7px]">
                  <p className="text-[11px] font-semibold text-white">주의</p>
                </div>
              </div>
            ))}
          </div>

          {mockWeeklyReportData.food.items.length > 3 && (
            <button
              type="button"
              className="w-full flex items-center justify-center gap-1 mt-6"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <p className="text-body3-m text-white">
                {isExpanded ? '접기' : '더 보기'}
              </p>
              <ChevronIcon
                type={isExpanded ? 'up' : 'down'}
                className="w-4 h-4 text-white"
              />
            </button>
          )}
        </>
      )}
    </div>
  );
}
