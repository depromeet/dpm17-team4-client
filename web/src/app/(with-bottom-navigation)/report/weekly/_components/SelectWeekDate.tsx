'use client';

import { PlayIcon } from '@/components';
import { getKoreanDate } from '@/utils/utils-date';
import { useState } from 'react';

/**
 * 주어진 날짜의 해당 주 월요일을 반환합니다.
 */
const getMonday = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day; // 일요일이면 -6, 아니면 월요일까지의 차이
  d.setDate(d.getDate() + diff);
  return d;
};

/**
 * 주어진 날짜의 해당 주 일요일을 반환합니다.
 */
const getSunday = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? 0 : 7 - day; // 일요일이면 0, 아니면 일요일까지의 차이
  d.setDate(d.getDate() + diff);
  return d;
};

/**
 * 날짜를 "MM월 DD일" 형식으로 변환합니다.
 */
const formatDateWithDay = (date: Date): string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}월 ${day}일`;

};

export function SelectDate() {
  const today = getKoreanDate();
  const [weekStartDate, _setWeekStartDate] = useState<Date>(getMonday(today));

  const weekEndDate = getSunday(weekStartDate);
  
  const nextWeekMonday = new Date(weekStartDate);
  nextWeekMonday.setDate(nextWeekMonday.getDate() + 7);
  
  const isNextDisabled = nextWeekMonday > today;


  return (
    <div className="flex justify-center items-center gap-4 py-4 mt-3">
      <button type="button" className="p-2" >
        <PlayIcon type="left" size="16" />
      </button>
      <span className="font-medium">
        {formatDateWithDay(weekStartDate)} - {formatDateWithDay(weekEndDate)}
      </span>
      <button
        type="button"
        disabled={isNextDisabled}
        className={`p-2 ${
          isNextDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        <PlayIcon type="right" size="16" />
      </button>
    </div>
  );
}