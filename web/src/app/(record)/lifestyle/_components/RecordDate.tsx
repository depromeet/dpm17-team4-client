'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { getDateDifference, getDateDisplayText } from '@/utils/utils-date';

export const RecordDate = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL parameter에서 날짜 정보 가져오기
  const year = searchParams.get('year') || new Date().getFullYear().toString();
  const month =
    searchParams.get('month') || (new Date().getMonth() + 1).toString();
  const date = searchParams.get('day') || new Date().getDate().toString();

  // 날짜 변경 함수
  const updateDate = useCallback(
    (newYear: number, newMonth: number, newDate: number) => {
      const params = new URLSearchParams(searchParams);
      params.set('year', newYear.toString());
      params.set('month', newMonth.toString());
      params.set('day', newDate.toString());
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  // 이전 날짜로 이동
  const handlePreviousDay = () => {
    const currentDate = new Date(
      parseInt(year, 10),
      parseInt(month, 10) - 1,
      parseInt(date, 10)
    );
    currentDate.setDate(currentDate.getDate() - 1);
    updateDate(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate()
    );
  };

  // 다음 날짜로 이동
  const handleNextDay = () => {
    const currentDate = new Date(
      parseInt(year, 10),
      parseInt(month, 10) - 1,
      parseInt(date, 10)
    );
    currentDate.setDate(currentDate.getDate() + 1);
    updateDate(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate()
    );
  };

  const diffDays = getDateDifference(
    parseInt(year, 10),
    parseInt(month, 10),
    parseInt(date, 10)
  );
  const isPreviousDisabled = false; // 어제로는 항상 갈 수 있음
  const isNextDisabled = diffDays >= 0; // 오늘 이후 날짜로는 갈 수 없음

  return (
    <div className="px-[4.78rem] py-[1.25rem] text-h3 text-white text-center">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handlePreviousDay}
          disabled={isPreviousDisabled}
          className={`transition-opacity ${
            isPreviousDisabled
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:opacity-70'
          }`}
        >
          <ChevronLeft />
        </button>
        <h1>
          {getDateDisplayText(
            parseInt(year, 10),
            parseInt(month, 10),
            parseInt(date, 10)
          )}
        </h1>
        <button
          type="button"
          onClick={handleNextDay}
          disabled={isNextDisabled}
          className={`transition-opacity ${
            isNextDisabled
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:opacity-70'
          }`}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
