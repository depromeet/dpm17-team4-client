'use client';
import Image from 'next/image';
import { useState } from 'react';
import EmptyMemoIcon from '@/assets/report/monthly_memo.png';
import { useMonthlyReportQuery } from '@/hooks/queries/useMonthlyReportQuery';
import { getKoreanDate } from '@/utils/utils-date';
import { DefecationScoreChart } from '../_components/DefecationScoreChart';
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
  const hasMonthlyData =
    reportData?.monthlyRecordCounts.totalRecordCounts &&
    reportData?.monthlyRecordCounts.totalRecordCounts > 0;

  if (!hasMonthlyData || !reportData) {
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
            주간 기록이 2개 이상 등록되면{'\n'}월간 리포트를 확인할 수 있어요!
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
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
      </div>
      {reportData.suggestion && (
        <Suggestions suggestion={reportData.suggestion} />
      )}
    </>
  );
}
