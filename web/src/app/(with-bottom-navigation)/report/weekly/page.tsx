'use client';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import EmptyMemoIcon from '@/assets/report/monthly_memo.png';
import { getKoreanDate } from '@/utils/utils-date';
import { DefecationScoreChart } from '../_components/DefecationScoreChart';
import { UserAverageChart } from '../_components/UserAverageChart';
import { SelectDate } from './_components/SelectWeekDate';
import { StressAnalysisChart } from './_components/StressAnalysisChart';
import { WeeklyComparisonChart } from './_components/WeeklyComparisonChart';
import { WeeklyMockData } from './mockData';
import type { DayOfWeek } from './types';

const weekLabels = ['월', '화', '수', '목', '금', '토', '일'];
const allDays: DayOfWeek[] = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
];

const getMonday = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d;
};

const getSunday = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? 0 : 7 - day;
  d.setDate(d.getDate() + diff);
  return d;
};

export default function WeeklyReportPage() {
  const today = useMemo(() => getKoreanDate(), []);
  const initialWeekStart = useMemo(() => getMonday(today), [today]);
  const [weekStartDate, setWeekStartDate] = useState<Date>(initialWeekStart);
  const [selectedWeekRange, setSelectedWeekRange] = useState<{
    start: Date;
    end: Date;
  }>({
    start: initialWeekStart,
    end: getSunday(initialWeekStart),
  });

  const hasWeeklyData =
    WeeklyMockData.defecationScore?.dailyScore?.length &&
    WeeklyMockData.defecationScore.dailyScore.length > 0;

  if (!hasWeeklyData) {
    return (
      <div className="bg-report-empty h-[calc(100vh-180px)] w-full flex flex-col">
        <div className="px-4 pt-6 flex justify-center">
          <SelectDate
            today={today}
            weekStartDate={weekStartDate}
            onWeekChange={(start, end) => {
              setWeekStartDate(start);
              setSelectedWeekRange({ start, end });
            }}
          />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center text-center px-6">
          <Image
            src={EmptyMemoIcon}
            alt="empty report"
            width={32}
            height={32}
            className="mb-5"
            priority
          />
          <p className="text-white text-body1-sb">
            아직 리포트가 생성되지 않았어요.
          </p>
          <p className="text-gray-400 text-body3-m mt-2 whitespace-pre-line">
            일간 기록이 2개 이상 등록되면
            <br />
            주간 리포트를 확인할 수 있어요!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 flex flex-col gap-5">
      <SelectDate
        today={today}
        weekStartDate={weekStartDate}
        onWeekChange={(start, end) => {
          setWeekStartDate(start);
          setSelectedWeekRange({ start, end });
        }}
      />
      <WeeklyComparisonChart defecationScore={WeeklyMockData.defecationScore} />
      <DefecationScoreChart
        scores={WeeklyMockData.defecationScore.dailyScore}
        labels={weekLabels}
      />
      <UserAverageChart userAverage={WeeklyMockData.userAverage} />
      <StressAnalysisChart
        stressAnalysis={WeeklyMockData.stress}
        xLabels={allDays}
        displayLabels={weekLabels}
      />
    </div>
  );
}
