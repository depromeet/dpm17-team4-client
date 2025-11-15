'use client';

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import { type ChangeEvent, useEffect, useState } from 'react';
import { ChevronIcon, XIcon } from '@/components';
import { BottomSheet } from '@/components/BottomSheet';
import { DAYS_OF_WEEK, TOTAL_DAYS } from '@/constants';

interface DailyCalendarSheetProps {
  isOpen: boolean;
  selectedDate?: Date;
  onClose: (shouldClose: boolean, isRegister?: boolean) => void;
  handleDateChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const DailyCalendarSheet = ({
  isOpen,
  selectedDate,
  onClose,
  handleDateChange,
}: DailyCalendarSheetProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [tempSelectedDate, setTempSelectedDate] = useState<Date | undefined>(
    selectedDate
  );

  useEffect(() => {
    if (isOpen) {
      setTempSelectedDate(selectedDate);
    }
  }, [isOpen, selectedDate]);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const dateRange = eachDayOfInterval({ start: startDate, end: endDate });

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateClick = (date: Date) => {
    const today = startOfDay(new Date());
    if (isAfter(startOfDay(date), today)) {
      return;
    }

    setTempSelectedDate(date);
  };

  const handleApply = () => {
    if (tempSelectedDate) {
      const event = {
        target: {
          value: format(tempSelectedDate, 'yyyy-MM-dd'),
        },
      } as ChangeEvent<HTMLInputElement>;
      handleDateChange(event);
      onClose(false, true);
    }
  };

  const fixedDateRange = [...dateRange];
  while (fixedDateRange.length < TOTAL_DAYS) {
    const lastDate = fixedDateRange[fixedDateRange.length - 1];
    const nextDate = new Date(lastDate);
    nextDate.setDate(nextDate.getDate() + 1);
    fixedDateRange.push(nextDate);
  }

  const finalDateRange = fixedDateRange.slice(0, TOTAL_DAYS);

  return (
    <BottomSheet isOpen={isOpen} onClose={() => onClose(false, false)}>
      <div className="bg-gray-800 text-white p-4 rounded-lg">
        <div className="flex items-center justify-between mb-5">
          <p className="text-body1-m text-white">일 선택</p>
          <button type="button" onClick={() => onClose(false, false)}>
            <XIcon />
          </button>
        </div>
        <div className="flex items-center justify-center gap-7.5 mb-3.5">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ChevronIcon type="left" />
          </button>
          <p className="text-body1-m">
            {format(currentMonth, 'yyyy년 M월', { locale: ko })}
          </p>
          <button
            type="button"
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ChevronIcon type="right" />
          </button>
        </div>

        <div className="w-full mb-8">
          <div className="grid grid-cols-7 gap-0 mb-2">
            {DAYS_OF_WEEK.map((day) => (
              <div
                key={day}
                className="text-[#707885] text-body4-sb py-2.5 text-center"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-0">
            {finalDateRange.map((date) => {
              const isCurrentMonth = isSameMonth(date, currentMonth);
              const isSelected =
                tempSelectedDate && isSameDay(date, tempSelectedDate);
              const today = startOfDay(new Date());
              const isFutureDate = isAfter(startOfDay(date), today);

              return (
                <div
                  key={date.toISOString()}
                  className="aspect-square flex items-center justify-center"
                >
                  <button
                    type="button"
                    onClick={() => handleDateClick(date)}
                    disabled={isFutureDate}
                    className={`
                        rounded-full flex items-center justify-center text-body3-r transition-colors
                        ${
                          isFutureDate
                            ? 'text-[#4A4A4A] cursor-not-allowed'
                            : isCurrentMonth
                              ? 'text-white hover:bg-gray-700'
                              : 'text-[#707885]'
                        }
                        ${isSelected ? 'w-7.5 h-7.5 bg-gray-600 text-white' : 'w-10 h-10'}
                      `}
                  >
                    {format(date, 'd')}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="pb-10 pt-4">
          <button
            type="button"
            onClick={handleApply}
            className={`text-center text-button-2 w-full h-[56px] rounded-lg bg-primary-600 text-white`}
          >
            적용
          </button>
        </div>
      </div>
    </BottomSheet>
  );
};
