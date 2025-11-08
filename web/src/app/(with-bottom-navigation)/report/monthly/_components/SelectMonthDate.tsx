'use client';

import type { WheelPickerOption } from '@ncdai/react-wheel-picker';
import { useMemo, useState } from 'react';
import { PlayIcon } from '@/components/icons';
import { formatToISOString, getKoreanDate } from '@/utils/utils-date';
import { WheelPickerBottomSheet } from '../../_components/WheelPickerBottomsheet';

const MONTH_RANGE = 24;

type SelectDateProps = {
  currentMonth: number;
  currentYear: number;
  isNextDisabled: boolean;
  onMonthChange?: (year: number, month: number) => void;
};

type MonthOption = WheelPickerOption & {
  year: number;
  month: number;
};

const formatYearMonthKey = (year: number, month: number) =>
  formatToISOString(new Date(year, month - 1, 1));

export function SelectDate({
  currentMonth,
  currentYear,
  isNextDisabled,
  onMonthChange,
}: SelectDateProps) {
  const today = useMemo(() => getKoreanDate(), []);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const months = useMemo<MonthOption[]>(() => {
    const baseDate = new Date(today.getFullYear(), today.getMonth(), 1);
    return Array.from({ length: MONTH_RANGE }, (_, index) => {
      const date = new Date(baseDate);
      date.setMonth(baseDate.getMonth() - index);

      return {
        label: `${date.getFullYear()}년 ${date.getMonth() + 1}월`,
        value: formatYearMonthKey(
          date.getFullYear(),
          date.getMonth() + 1
        ),
        year: date.getFullYear(),
        month: date.getMonth() + 1,
      };
    }).reverse();
  }, [today]);

  const monthOptions = useMemo<WheelPickerOption[]>(() => {
    return months.map(({ label, value }) => ({ label, value }));
  }, [months]);

  const currentValue = useMemo(
    () => formatYearMonthKey(currentYear, currentMonth),
    [currentMonth, currentYear]
  );

  const handleMonthSelect = (year: number, month: number) => {
    onMonthChange?.(year, month);
    setIsBottomSheetOpen(false);
  };

  const handleApply = (selectedValue: string) => {
    if (!selectedValue) {
      setIsBottomSheetOpen(false);
      return;
    }

    const selected = months.find(({ value }) => value === selectedValue);
    if (selected) {
      handleMonthSelect(selected.year, selected.month);
    } else {
      setIsBottomSheetOpen(false);
    }
  };

  const handlePrevMonth = () => {
    const prev = new Date(currentYear, currentMonth - 2, 1);
    handleMonthSelect(prev.getFullYear(), prev.getMonth() + 1);
  };

  const handleNextMonth = () => {
    if (isNextDisabled) return;
    const next = new Date(currentYear, currentMonth, 1);
    handleMonthSelect(next.getFullYear(), next.getMonth() + 1);
  };

  return (
    <>
      <div className="flex justify-center items-center gap-4 py-4">
        <button type="button" className="p-2" onClick={handlePrevMonth}>
          <PlayIcon type="left" size="16" />
        </button>
        <button
          type="button"
          onClick={() => setIsBottomSheetOpen(true)}
          className="font-medium text-white text-center px-3 py-1 rounded-lg bg-gray-700/30"
        >
          {currentYear}년 {currentMonth}월
        </button>
        <button
          type="button"
          disabled={isNextDisabled}
          className={`p-2 ${
            isNextDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
          }`}
          onClick={handleNextMonth}
        >
          <PlayIcon type="right" size="16" />
        </button>
      </div>

      <WheelPickerBottomSheet
        isOpen={isBottomSheetOpen}
        title="월 선택"
        options={monthOptions}
        initialValue={currentValue ?? monthOptions[0]?.value ?? ''}
        onApply={handleApply}
        onClose={() => setIsBottomSheetOpen(false)}
        applyLabel="적용"
      />
    </>
  );
}
