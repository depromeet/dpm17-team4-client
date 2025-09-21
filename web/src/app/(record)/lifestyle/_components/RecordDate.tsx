'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const RecordDate = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL parameter에서 날짜 정보 가져오기
  const year = searchParams.get('year') || new Date().getFullYear().toString();
  const month =
    searchParams.get('month') || (new Date().getMonth() + 1).toString();
  const date = searchParams.get('date') || new Date().getDate().toString();

  // 날짜 변경 함수
  const updateDate = useCallback(
    (newYear: number, newMonth: number, newDate: number) => {
      const params = new URLSearchParams(searchParams);
      params.set('year', newYear.toString());
      params.set('month', newMonth.toString());
      params.set('date', newDate.toString());
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

  // 요일 이름 반환
  const getDayName = (date: Date) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[date.getDay()];
  };

  // 날짜 표시 텍스트 생성
  const getDateDisplayText = () => {
    const targetDate = new Date(
      parseInt(year, 10),
      parseInt(month, 10) - 1,
      parseInt(date, 10)
    );
    const today = new Date();

    // 시간을 00:00:00으로 설정하여 날짜만 비교
    const targetDateOnly = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      targetDate.getDate()
    );
    const todayOnly = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const diffTime = targetDateOnly.getTime() - todayOnly.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    const dayName = getDayName(targetDate);

    if (diffDays === 0) {
      return `${parseInt(month, 10)}월 ${parseInt(date, 10)}일 (${dayName}), 오늘`;
    } else if (diffDays === -1) {
      return `${parseInt(month, 10)}월 ${parseInt(date, 10)}일 (${dayName}), 어제`;
    } else if (diffDays === 1) {
      return `${parseInt(month, 10)}월 ${parseInt(date, 10)}일 (${dayName}), 내일`;
    } else {
      return `${parseInt(month, 10)}월 ${parseInt(date, 10)}일 (${dayName})`;
    }
  };

  return (
    <div className="px-[4.78rem] py-[1.25rem] text-h3 text-white text-center">
      <div className="flex items-center justify-between">
        <button
          onClick={handlePreviousDay}
          className="hover:opacity-70 transition-opacity"
        >
          <ChevronLeft />
        </button>
        <h1>{getDateDisplayText()}</h1>
        <button
          onClick={handleNextDay}
          className="hover:opacity-70 transition-opacity"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
