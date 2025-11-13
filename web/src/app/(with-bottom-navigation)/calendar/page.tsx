'use client';

import { format, isAfter, isSameDay, isSameMonth, startOfDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChevronIcon } from '@/components';
import { DAYS_OF_WEEK } from '@/constants';
import { useNavigationContext } from '@/contexts/NavigationContext';
import { DailyRecord } from './_components/DailyRecord';
import { DefecationRecordBottomSheet } from './_components/DefecationRecordBottomSheet';
import { useCalendar } from './_components/hooks/useCalendar';
import { Tag } from './_components/Tag';

export default function CalendarPage() {
  const router = useRouter();
  const { handleTabClick } = useNavigationContext();

  useEffect(() => {
    handleTabClick('calendar');
  }, [handleTabClick]);
  const {
    data,
    calendarByDateData,
    defecationRecordListData,
    selectedDate,
    currentMonth,
    finalDateRange,
    handlePrevMonth,
    handleNextMonth,
    handleDateClick,
  } = useCalendar();

  const [
    isDefecationRecordBottomSheetOpen,
    setIsDefecationRecordBottomSheetOpen,
  ] = useState(false);

  return (
    <div className="h-screen bg-[#121213] text-white overflow-y-auto pb-32">
      <header className="w-full flex items-center justify-center px-10 py-4 flex-shrink-0">
        <p className="text-[18px] font-semibold">캘린더</p>
      </header>
      <div>
        <div className="flex items-center justify-between mb-[20px] px-4">
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
              const isFutureDateNotCurrentMonth = isFutureDate && !isCurrentMonth;

              const dateRecord = data?.data.results.find(
                (result) => result.date === format(date, 'yyyy-MM-dd')
              );
              const hasActivityRecord = dateRecord?.activityExists ?? false;
              const hasToiletRecord = dateRecord?.toiletExists ?? false;

              const recordType = (() => {
                if (hasActivityRecord && hasToiletRecord) return 'complete';
                if (hasActivityRecord) return 'lifestyle';
                if (hasToiletRecord) return 'defecation';
                return null;
              })();

              return (
                <div
                  key={date.toISOString()}
                  className="relative flex items-start justify-center h-[70px] pt-2"
                >
                  <button
                    type="button"
                    onClick={() => handleDateClick(date)}
                    disabled={isFutureDateNotCurrentMonth}
                    className={`
                        w-7.5 h-7.5 rounded-full flex items-center justify-center text-body3-r transition-colors
                        ${
                          isFutureDateNotCurrentMonth
                            ? 'text-[#4A4A4A] cursor-not-allowed'
                            : isCurrentMonth
                              ? 'text-white hover:bg-gray-700'
                              : 'text-[#707885]'
                        }
                        ${isSelected ? 'bg-gray-700 text-white' : ''}
                      `}
                  >
                    {format(date, 'd')}
                  </button>
                  {!isFutureDateNotCurrentMonth && recordType && (
                    <DailyRecord type={recordType} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex w-full h-2 bg-[#292D32] opacity-20 mt-2.5 mb-5" />

      <div className="px-4">
        <div className="flex items-center justify-between mb-3.5">
          <p className="text-white text-body1-m">
            {selectedDate
              ? format(selectedDate, 'M월 d일 (eee)', { locale: ko })
              : ''}
          </p>
          <button
            type="button"
            onClick={() => {
              const dateParam = selectedDate
                ? format(selectedDate, 'yyyy-MM-dd')
                : '';
              router.push(
                `/report/daily${dateParam ? `?date=${dateParam}` : ''}`
              );
            }}
            className="flex items-center gap-2"
          >
            <p className="text-[#99A1B1] text-button-4">리포트 확인하기</p>
            <ChevronIcon type="right" className="w-3.5 h-3.5 text-[#99A1B1]" />
          </button>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col gap-1 justify-center w-1/3 h-[70px] py-3 px-4 bg-[#1B1D20] rounded-[10px]">
            <p className="text-[#707885] text-body4-m">배변 점수</p>
            <p className="text-white text-body2-sb">
              {calendarByDateData?.data.score ?? 0}점
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsDefecationRecordBottomSheetOpen(true)}
            className="flex flex-col gap-1 justify-center items-start w-1/3 h-[70px] py-3 px-4 bg-[#1B1D20] rounded-[10px]"
          >
            <p className="text-[#707885] text-body4-m">배변 기록</p>
            <p className="text-white text-body2-sb">
              {calendarByDateData?.data.toiletRecordCount ?? 0}회
            </p>
          </button>
          {isDefecationRecordBottomSheetOpen && (
            <DefecationRecordBottomSheet
              isOpen={isDefecationRecordBottomSheetOpen}
              onClose={() => setIsDefecationRecordBottomSheetOpen(false)}
              date={selectedDate ?? new Date()}
              hasRecords={
                !!(
                  defecationRecordListData?.data.items?.length &&
                  defecationRecordListData.data.items.length > 0
                )
              }
              records={defecationRecordListData?.data.items}
            />
          )}
          <button
            type="button"
            onClick={() => {
              if (selectedDate) {
                router.push(
                  `/lifestyle?year=${selectedDate.getFullYear()}&month=${selectedDate.getMonth() + 1}&day=${selectedDate.getDate()}&from=calendar`
                );
              }
            }}
            className="flex flex-col gap-1 justify-center items-start w-1/3 h-[70px] py-3 px-4 bg-[#1B1D20] rounded-[10px]"
          >
            <p className="text-[#707885] text-body4-m">생활 기록</p>
            <p className="text-white text-body2-sb">
              {calendarByDateData?.data.hasActivityRecord ? 'O' : 'X'}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
