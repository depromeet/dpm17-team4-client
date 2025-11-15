'use client';

import { type ChangeEvent, useMemo, useState } from 'react';
import { PlayIcon } from '@/components';
import {
  formatToISOString,
  getDateDisplayText,
  getKoreanDate,
} from '@/utils/utils-date';
import { DailyCalendarSheet } from './DailyCalendarSheet';

const DATE_RANGE = 90;

const formatDateLabel = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
};

export function SelectDate({
  currentDate,
  onDateChange,
}: {
  currentDate: Date;
  onDateChange?: (date: Date) => void;
}) {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const today = useMemo(() => getKoreanDate(), []);

  const dates = useMemo(() => {
    return Array.from({ length: DATE_RANGE }, (_, index) => {
      const date = new Date(today);
      date.setDate(date.getDate() - index);
      return {
        label: formatDateLabel(date),
        value: formatToISOString(date),
        date: date,
      };
    });
  }, [today]);

  const earliestDate = dates[dates.length - 1];
  const latestDate = dates[0];

  const handlePrevDate = () => {
    if (!earliestDate) return;
    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 1);

    if (prevDate < earliestDate.date) {
      return;
    }
    onDateChange?.(prevDate);
  };

  const handleNextDate = () => {
    if (!latestDate) return;
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);

    if (nextDate > latestDate.date) {
      return;
    }
    onDateChange?.(nextDate);
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    onDateChange?.(new Date(e.target.value as string));
  };

  const handleClose = () => {
    setIsBottomSheetOpen(false);
  };

  const isPrevDisabled = useMemo(() => {
    if (!earliestDate) return false;
    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 1);
    return prevDate < earliestDate.date;
  }, [currentDate, earliestDate]);

  const isNextDisabled = useMemo(() => {
    if (!latestDate) return false;
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);
    return nextDate > latestDate.date;
  }, [currentDate, latestDate]);

  return (
    <>
      <div className="flex justify-center items-center gap-2 py-3">
        <button
          type="button"
          className={`p-2 ${
            isPrevDisabled ? 'cursor-not-allowed opacity-40' : ''
          }`}
          disabled={isPrevDisabled}
          onClick={handlePrevDate}
        >
          <PlayIcon type="left" size="16" />
        </button>
        <button
          type="button"
          onClick={() => setIsBottomSheetOpen(true)}
          className="font-medium text-white text-center py-1 rounded-lg"
        >
          {getDateDisplayText(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            currentDate.getDate()
          )}
        </button>
        <button
          type="button"
          className={`p-2 ${
            isNextDisabled ? 'cursor-not-allowed opacity-40' : ''
          }`}
          onClick={handleNextDate}
          disabled={isNextDisabled}
        >
          <PlayIcon type="right" size="16" />
        </button>
      </div>

      <DailyCalendarSheet
        isOpen={isBottomSheetOpen}
        selectedDate={currentDate}
        onClose={handleClose}
        handleDateChange={handleDateChange}
      />
    </>
  );
}
