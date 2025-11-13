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
import {
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
} from 'react';
import { ChevronIcon } from '@/components';
import { BottomSheet } from '@/components/BottomSheet';
import { DAYS_OF_WEEK, TOTAL_DAYS } from '@/constants';
import { useHourOptions } from '../utils';

interface DefecationBottomSheetProps {
  isOpen: boolean;
  selectedHour?: string;
  selectedDate?: Date;
  onClose: (shouldClose: boolean, isRegister?: boolean) => void;
  handleDateChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleHourChange: (hour: string) => void;
}

export const DefecationBottomSheet = ({
  isOpen,
  selectedHour,
  selectedDate,
  onClose,
  handleDateChange,
  handleHourChange,
}: DefecationBottomSheetProps) => {
  const hours = useHourOptions();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hasSelectedHour, setHasSelectedHour] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setHasSelectedHour(false);
    }
  }, [isOpen]);

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

    const event = {
      target: {
        value: format(date, 'yyyy-MM-dd'),
      },
    } as ChangeEvent<HTMLInputElement>;
    handleDateChange(event);
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

        <div className="w-full mb-2.5">
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
              const isSelected = selectedDate && isSameDay(date, selectedDate);
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
        <div className="flex items-center justify-start gap-1.5 overflow-x-auto mb-4">
          {hours.map((hour) => {
            const isSelected = selectedHour === hour.time;

            return (
              <button
                key={hour.id}
                type="button"
                onClick={() => {
                  setHasSelectedHour(true);
                  handleHourChange(hour.time);
                }}
                className={`
                  flex items-center justify-center w-[73px] h-10 whitespace-nowrap py-3 px-[22.5px] rounded-lg 
                  text-button-3 border-[1px] transition-colors
                  ${
                    isSelected
                      ? 'bg-primary-500/40 border-primary-600 text-white'
                      : 'bg-gray-700 border-transparent text-white hover:bg-[#4A5058]'
                  }
                `}
              >
                {hour.time}시
              </button>
            );
          })}
        </div>
        <div className="pb-10">
          <button
            type="button"
            onClick={() => {
              onClose(false, true);
            }}
            disabled={!hasSelectedHour}
            className={`text-center text-button-2 w-full h-[56px] rounded-lg bg-primary-600 text-white ${!hasSelectedHour ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            등록
          </button>
        </div>
      </div>
    </BottomSheet>
  );
};
