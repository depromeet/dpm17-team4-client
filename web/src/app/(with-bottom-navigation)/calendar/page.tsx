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
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChevronIcon } from '@/components';
import { DAYS_OF_WEEK, TOTAL_DAYS } from '@/constants';
import { DailyRecord } from './_components/DailyRecord';
import { DefecationRecordBottomSheet } from './_components/DefecationRecordBottomSheet';
import { Tag } from './_components/Tag';

export default function CalendarPage() {
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [
    isDefecationRecordBottomSheetOpen,
    setIsDefecationRecordBottomSheetOpen,
  ] = useState(false);
  const [hasRecords, _setHasRecords] = useState(true);
  const [records, _setRecords] = useState([
    { id: '1', time: '09:00', type: 'morning' as const },
    { id: '2', time: '11:00', type: 'morning' as const },
    { id: '3', time: '13:00', type: 'afternoon' as const },
    { id: '4', time: '19:00', type: 'evening' as const },
    { id: '5', time: '22:00', type: 'evening' as const },
  ]);

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
  return (
    <div className="min-h-screen bg-[#1D1E20] text-white">
      <header className="w-full flex items-center justify-center px-10 py-4">
        <p className="text-[18px] font-semibold">캘린더</p>
      </header>
      <div>
        <div className="flex items-center justify-between mb-5 px-4">
          <p className="text-body1-m">
            {format(currentMonth, 'yyyy년 M월', { locale: ko })}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronIcon type="left" className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronIcon type="right" className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-start gap-1.5 px-4 mb-2.5">
          <Tag type="defecation" />
          <Tag type="lifestyle" />
          <Tag type="complete" />
        </div>

        <div className="w-full mb-2.5">
          <div className="grid grid-cols-7 gap-0 mb-2">
            {DAYS_OF_WEEK.map((day) => (
              <div
                key={day}
                className="text-[#707885] text-body4-sb py-2 text-center h-[34px]"
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
                  className="relative flex items-start justify-center h-[70px] pt-2"
                >
                  <button
                    type="button"
                    onClick={() => handleDateClick(date)}
                    disabled={isFutureDate}
                    className={`
                        w-7.5 h-7.5 rounded-full flex items-center justify-center text-body3-r transition-colors
                        ${
                          isFutureDate
                            ? 'text-[#4A4A4A] cursor-not-allowed'
                            : isCurrentMonth
                              ? 'text-white hover:bg-gray-700'
                              : 'text-[#707885]'
                        }
                        ${isSelected ? 'bg-gray-600 text-white' : ''}
                      `}
                  >
                    {format(date, 'd')}
                  </button>
                  {!isFutureDate && <DailyRecord type="defecation" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex w-full h-2 bg-[#3C4149]/20 mt-2.5 mb-5" />

      <div className="px-4">
        <div className="flex items-center justify-between mb-3.5">
          <p className="text-white text-body1-m">
            {selectedDate
              ? format(selectedDate, 'M월 d일 (eee)', { locale: ko })
              : ''}
          </p>
          <button
            type="button"
            onClick={() => router.push('/report/daily')}
            className="flex items-center gap-2"
          >
            <p className="text-[#99A1B1] text-button-4">리포트 확인하기</p>
            <ChevronIcon type="right" className="w-3.5 h-3.5 text-[#99A1B1]" />
          </button>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col gap-1 justify-center w-1/3 h-[70px] py-3 px-4 bg-[#272B31] rounded-[10px]">
            <p className="text-[#707885] text-body4-m">배변 점수</p>
            <p className="text-white text-body2-sb">45점</p>
          </div>
          <button
            type="button"
            onClick={() => setIsDefecationRecordBottomSheetOpen(true)}
            className="flex flex-col gap-1 justify-center items-start w-1/3 h-[70px] py-3 px-4 bg-[#272B31] rounded-[10px]"
          >
            <p className="text-[#707885] text-body4-m">배변 기록</p>
            <p className="text-white text-body2-sb">1회</p>
          </button>
          {isDefecationRecordBottomSheetOpen && (
            <DefecationRecordBottomSheet
              isOpen={isDefecationRecordBottomSheetOpen}
              onClose={() => setIsDefecationRecordBottomSheetOpen(false)}
              date={selectedDate ?? new Date()}
              hasRecords={hasRecords}
              records={hasRecords ? records : []}
              toiletRecordId={11} // NOTE(taehyeon): 서버 api 구현 시 toiletRecordId 를 전달하도록 수정 필요
            />
          )}
          <button
            type="button"
            onClick={() => {
              if (selectedDate) {
                router.push(
                  `/lifestyle?year=${selectedDate.getFullYear()}&month=${selectedDate.getMonth() + 1}&day=${selectedDate.getDate()}`
                );
              }
            }}
            className="flex flex-col gap-1 justify-center items-start w-1/3 h-[70px] py-3 px-4 bg-[#272B31] rounded-[10px]"
          >
            <p className="text-[#707885] text-body4-m">생활 기록</p>
            <p className="text-white text-body2-sb">O</p>
          </button>
        </div>
      </div>
    </div>
  );
}
