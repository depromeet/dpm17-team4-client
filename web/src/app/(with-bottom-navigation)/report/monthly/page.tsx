'use client';
import Image from 'next/image';
import { useState } from 'react';
import EmptyMemoIcon from '@/assets/report/monthly_memo.png';
import {
  INSUFFICIENT_DATA,
  useMonthlyReportQuery,
} from '@/hooks/queries/useMonthlyReportQuery';
import { getKoreanDate } from '@/utils/utils-date';
import { DefecationScoreChart } from '../_components/DefecationScoreChart';
import ReportNotice from '../_components/ReportNotice';
import { StressAnalysisChart } from '../_components/StressAnalysisChart';
import { Suggestions } from '../_components/Suggestions';
import { UserAverageChart } from '../_components/UserAverageChart';
import { WaterReport } from '../_components/WaterReport';
import type { Week } from '../weekly/types';
import { DefecationAnalysis } from './_components/DefecationAnalysis';
import { MonthlyFoodReport } from './_components/MonthlyFoodReport';
import { MonthlyRecord } from './_components/MonthlyRecord';
import { MonthlyScore } from './_components/MonthlyScore';
import { SelectDate } from './_components/SelectMonthDate';

const weekLabels = ['1주차', '2주차', '3주차', '4주차', '5주차'];
export default function MonthlyReportPage() {
  const date = getKoreanDate();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();

  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);

  const yearMonth = `${year}-${String(month).padStart(2, '0')}`;

  const { data, isLoading, isError } = useMonthlyReportQuery({
    yearMonth,
  });
  const reportData = data;
  const isNextDisabled = year === currentYear && month === currentMonth;

  // NOTE(taehyeon): 데이터 부족 에러인 경우 빈 리포트 렌더링
  if (reportData === INSUFFICIENT_DATA) {
    return (
      <div className="bg-report-empty h-[calc(100vh-180px)] w-full flex flex-col">
        <div className="px-4 flex justify-center">
          <SelectDate
            currentMonth={month}
            currentYear={year}
            isNextDisabled={isNextDisabled}
            onMonthChange={(newYear, newMonth) => {
              setYear(newYear);
              setMonth(newMonth);
            }}
          />
        </div>
        <div className="flex flex-col items-center justify-center text-center px-6 min-h-screen fixed top-0 left-0 right-0 bottom-0 pointer-events-none">
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
            리포트 생성을 위해 2주의 기록을 쌓아보세요
          </p>
        </div>
      </div>
    );
  }

  if (!reportData) {
    return null;
  }

  const stressChartData = reportData?.stress
    ? {
        ...reportData.stress,
        items: weekLabels.map((label, index) => ({
          day: label as Week,
          stress: reportData.stress?.items[index]?.stress ?? null,
        })),
      }
    : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4" />
          <p className="text-gray-400">데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center px-6">
          <p className="text-white text-body1-sb mb-2">
            월간 리포트를 불러오는 중 오류가 발생했어요.
          </p>
          <p className="text-gray-400 text-body3-m">
            잠시 후 다시 시도하거나, 네트워크 연결을 확인해 주세요.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="fixed top-[134px] left-[130px] pointer-events-none w-[426px] h-[426px]"
        style={{
          background:
            'radial-gradient(42.57% 42.57% at 50% 50%, rgba(41, 148, 255, 0.10) 0%, rgba(29, 30, 32, 0.10) 100%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="fixed top-[428px] right-[191px] pointer-events-none w-[426px] h-[426px]"
        style={{
          background:
            'radial-gradient(42.57% 42.57% at 50% 50%, rgba(41, 148, 255, 0.10) 0%, rgba(29, 30, 32, 0.10) 100%)',
          filter: 'blur(80px)',
        }}
      />
      <div className="py-0 flex flex-col items-center gap-5 mb-[50px]">
        <SelectDate
          currentMonth={month}
          currentYear={year}
          isNextDisabled={isNextDisabled}
          onMonthChange={(newYear, newMonth) => {
            setYear(newYear);
            setMonth(newMonth);
          }}
        />
        <MonthlyRecord
          recordCounts={reportData.monthlyRecordCounts}
          currentMonth={month}
        />
        <DefecationScoreChart
          scores={reportData.monthlyDefecationScore}
          labels={weekLabels}
        />
        {reportData.userAverage && (
          <UserAverageChart userAverage={reportData.userAverage} />
        )}
        <MonthlyScore monthlyScore={reportData.monthlyScore} />
        <DefecationAnalysis data={reportData} />
        <MonthlyFoodReport food={reportData.food} />
        <WaterReport waterData={reportData.water} type="monthly" />
        {stressChartData && (
          <StressAnalysisChart
            stressAnalysis={stressChartData}
            xLabels={weekLabels}
            displayLabels={weekLabels}
          />
        )}
        {reportData.suggestion && (
          <Suggestions suggestion={reportData.suggestion} />
        )}
      </div>
      <ReportNotice />
    </>
  );
}
