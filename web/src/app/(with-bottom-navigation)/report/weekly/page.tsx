'use client';
import Image from 'next/image';
import { Suspense, useMemo, useState } from 'react';
import emojiOpenMouse from '@/assets/report/emoji_open_mouse.png';
import EmptyMemoIcon from '@/assets/report/monthly_memo.png';
import { useWeeklyReportQuery } from '@/hooks/queries/useWeeklyReportQuery';
import { formatToISOString, getKoreanDate } from '@/utils/utils-date';
import { DefecationScoreChart } from '../_components/DefecationScoreChart';
import { Suggestions } from '../_components/Suggestions';
import { UserAverageChart } from '../_components/UserAverageChart';
import { WaterReport } from '../_components/WaterReport';
import { NullReport } from '../daily/_components/NullReport';
import { SelectDate } from './_components/SelectWeekDate';
import { StressAnalysisChart } from './_components/StressAnalysisChart';
import { WeeklyComparisonChart } from './_components/WeeklyComparisonChart';
import { WeeklyFoodReport } from './_components/WeeklyFoodReport';
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

function WeeklyReportContent() {
  const today = useMemo(() => getKoreanDate(), []);
  const initialWeekStart = useMemo(() => getMonday(today), [today]);
  const [weekStartDate, setWeekStartDate] = useState<Date>(initialWeekStart);

  const { data: weeklyData } = useWeeklyReportQuery({
    dateTime: formatToISOString(weekStartDate),
  });

  // NOTE(taehyeon): 데이터 없는 경우 early return
  if (!weeklyData) {
    return null;
  }

  // NOTE(taehyeon): 데일리 스코어를 통해 배변 기록 2회 이상 있으면 주간 리포트 렌더링
  const hasWeeklyData =
    weeklyData?.defecationScore?.dailyScore?.filter((score) => score > 0)
      .length >= 2;

  // NOTE(taehyeon): 생활 기록 없는 케이스 조건 분기
  const noLifeStyleData =
    weeklyData?.food?.items?.length === 0 &&
    weeklyData?.water?.items?.length === 0 &&
    weeklyData?.stress?.items?.length === 0;

  // NOTE(taehyeon): 배변 기록 2회 이상 없으면 빈 리포트 렌더링
  if (!hasWeeklyData) {
    return (
      <div className="bg-report-empty h-[calc(100vh-180px)] w-full flex flex-col">
        <div className="px-4 flex justify-center">
          <SelectDate
            today={today}
            weekStartDate={weekStartDate}
            onWeekChange={(start) => {
              setWeekStartDate(start);
            }}
          />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center text-center px-6 pb-[205px]">
          <Image
            src={EmptyMemoIcon}
            alt="empty report"
            width={50}
            height={50}
            className="mb-5"
            priority
          />
          <p className="text-white text-body1-sb">
            리포트가 생성되지 않았어요.
          </p>
          <p className="text-[#4E5560] text-body3-m mt-2 whitespace-pre-line">
            아직 데이터가 부족해요!
            <br />
            리포트 생성을 위해 2일의 기록을 채워보세요!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="px-4 flex flex-col gap-5 mb-[50px]">
        <SelectDate
          today={today}
          weekStartDate={weekStartDate}
          onWeekChange={(start) => {
            setWeekStartDate(start);
          }}
        />
        <WeeklyComparisonChart defecationScore={weeklyData?.defecationScore} />
        <DefecationScoreChart
          scores={weeklyData?.defecationScore.dailyScore}
          labels={weekLabels}
        />
        <UserAverageChart userAverage={weeklyData?.userAverage} />
        {noLifeStyleData ? (
          <div className="my-[110px]">
            <NullReport
              mode="lifestyle"
              nullIcon={emojiOpenMouse}
              title="생활"
              description="생활을 기록하면 더 자세한 분석을 얻을 수 있어요"
              type="weekly"
            />
          </div>
        ) : (
          <>
            <WeeklyFoodReport foodData={weeklyData?.food} />
            <WaterReport waterData={weeklyData?.water} type="weekly" />
            <StressAnalysisChart
              stressAnalysis={weeklyData?.stress}
              xLabels={allDays}
              displayLabels={weekLabels}
            />
          </>
        )}
      </div>
      {noLifeStyleData ? null : (
        <Suggestions suggestion={weeklyData?.suggestion} />
      )}
    </div>
  );
}

export default function WeeklyReportPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          로딩 중...
        </div>
      }
    >
      <WeeklyReportContent />
    </Suspense>
  );
}
