'use client';

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import { useMemo, useState } from 'react';
import { TOTAL_DAYS } from '@/constants';
import { useCalendarQuery } from '@/hooks';

export const useCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const { startDate, endDate, dateRange } = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const start = startOfWeek(monthStart, { weekStartsOn: 0 });
    const end = endOfWeek(monthEnd, { weekStartsOn: 0 });
    const range = eachDayOfInterval({ start, end });

    return {
      startDate: start,
      endDate: end,
      dateRange: range,
    };
  }, [currentMonth]);

  const { data } = useCalendarQuery(
    format(startDate, 'yyyy-MM-dd'),
    format(endDate, 'yyyy-MM-dd')
  );

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    const today = startOfDay(new Date());
    if (isAfter(startOfDay(date), today)) {
      return;
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

  return {
    data,
    selectedDate,
    currentMonth,
    finalDateRange,
    handlePrevMonth,
    handleNextMonth,
    handleDateClick,
  };
};
