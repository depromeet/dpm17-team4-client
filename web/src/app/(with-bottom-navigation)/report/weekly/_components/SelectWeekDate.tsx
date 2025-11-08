'use client';

import type { WheelPickerOption } from '@ncdai/react-wheel-picker';
import { useMemo, useState } from 'react';
import { PlayIcon } from '@/components';
import { formatToISOString } from '@/utils/utils-date';
import { WheelPickerBottomSheet } from '../../_components/WheelPickerBottomsheet';

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

export function SelectDate({
  today,
  weekStartDate,
  onWeekChange,
}: {
  today: Date;
  weekStartDate: Date;
  onWeekChange?: (start: Date, end: Date) => void;
}) {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const weekEndDate = getSunday(weekStartDate);

  const handleWeekChange = (delta: number) => {
    const newStart = new Date(weekStartDate);
    newStart.setDate(newStart.getDate() + delta * 7);
    if (delta > 0) {
      const nextMonday = new Date(weekStartDate);
      nextMonday.setDate(nextMonday.getDate() + 7);
      if (nextMonday > today) {
        return;
      }
    }
    const newEnd = getSunday(newStart);

    onWeekChange?.(newStart, newEnd);
  };

  const isNextDisabled = (() => {
    const nextMonday = new Date(weekStartDate);
    nextMonday.setDate(nextMonday.getDate() + 7);
    return nextMonday > today;
  })();

  const weeks = useMemo(() => {
    const currentMonday = getMonday(today);
    return Array.from({ length: 12 }, (_, index) => {
      const start = new Date(currentMonday);
      start.setDate(start.getDate() - index * 7);
      const end = getSunday(start);
      return {
        label: `${formatDateWithDay(start)} - ${formatDateWithDay(end)}`,
        start,
        end,
      };
    }).reverse();
  }, [today]);

  const weekOptions = useMemo<WheelPickerOption[]>(() => {
    return weeks.map((week) => ({
      label: week.label,
      value: formatToISOString(week.start),
    }));
  }, [weeks]);

  const currentWeekValue = useMemo(
    () => formatToISOString(weekStartDate),
    [weekStartDate]
  );

  const handleWeekSelect = (start: Date, end: Date) => {
    onWeekChange?.(start, end);
    setIsBottomSheetOpen(false);
  };

  const handleApply = (selectedValue: string) => {
    if (!selectedValue) {
      setIsBottomSheetOpen(false);
      return;
    }

    //NOTE(seieun): wheel picker 에서 선택한 value(ex. 2025-11-07) 와 week.start(ex. 2025-11-03) 를 비교하여 선택한 주를 찾습니다.
    const selected = weeks.find(
      (week) => formatToISOString(week.start) === selectedValue
    );
    if (selected) {
      handleWeekSelect(selected.start, selected.end);
      onWeekChange?.(selected.start, selected.end);
    } else {
      setIsBottomSheetOpen(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center gap-4 py-4 mt-3">
        <button
          type="button"
          className="p-2"
          onClick={() => handleWeekChange(-1)}
        >
          <PlayIcon type="left" size="16" />
        </button>
        <button
          type="button"
          onClick={() => setIsBottomSheetOpen(true)}
          className="font-medium text-white text-center px-3 py-1 rounded-lg bg-gray-700/30"
        >
          {formatDateWithDay(weekStartDate)} - {formatDateWithDay(weekEndDate)}
        </button>
        <button
          type="button"
          className={`p-2 ${
            isNextDisabled ? 'cursor-not-allowed opacity-40' : ''
          }`}
          onClick={() => handleWeekChange(1)}
          disabled={isNextDisabled}
        >
          <PlayIcon type="right" size="16" />
        </button>
      </div>

      <WheelPickerBottomSheet
        isOpen={isBottomSheetOpen}
        title="주 선택"
        options={weekOptions}
        initialValue={currentWeekValue ?? weekOptions[0]?.value ?? ''}
        onApply={handleApply}
        onClose={() => setIsBottomSheetOpen(false)}
        applyLabel="적용"
      />
    </>
  );
}
