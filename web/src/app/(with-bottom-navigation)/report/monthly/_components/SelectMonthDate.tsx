'use client';

import { PlayIcon } from '@/components/icons';

interface SelectDateProps {
  currentMonth: number;
  currentYear: number;
  isNextDisabled: boolean;
}

export function SelectDate({
  currentMonth,
  currentYear,
  isNextDisabled,
}: SelectDateProps) {
  return (
    <div className="flex justify-center items-center gap-4 py-4 mt-3">
      <button type="button" className="p-2">
        <PlayIcon type="left" size="16" />
      </button>
      <span className="font-medium">
        {currentYear}년 {currentMonth}월
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
