'use client';
import Image from 'next/image';
import { useState } from 'react';
import EmptyMemoIcon from '@/assets/report/monthly_memo.png';
import { getKoreanDate } from '@/utils/utils-date';
import { DefecationScoreChart } from '../_components/DefecationScoreChart';
import { StressAnalysisChart } from '../_components/StressAnalysisChart';
import { Suggestions } from '../_components/Suggestions';
import { UserAverageChart } from '../_components/UserAverageChart';
import { WaterReport } from '../_components/WaterReport';
import { DefecationAnalysis } from './_components/DefecationAnalysis';
import { MonthlyFoodReport } from './_components/MonthlyFoodReport';
import { MonthlyRecord } from './_components/MonthlyRecord';
import { MonthlyScore } from './_components/MonthlyScore';
import { SelectDate } from './_components/SelectMonthDate';
import { mockMonthlyReportData } from './mockData';

const weekLabels = ['1주차', '2주차', '3주차', '4주차', '5주차'];
export default function MonthlyReportPage() {
  const date = getKoreanDate();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();

  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);

  const isNextDisabled = year === currentYear && month === currentMonth;
  const hasMonthlyData =
    mockMonthlyReportData.monthlyRecordCounts.defecationRecordCounts > 0;

  if (!hasMonthlyData) {
    return (
      <div className="bg-report-empty h-[calc(100vh-180px)] w-full flex flex-col">
        <div className="px-4 pt-6 flex justify-center">
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
    <div>
      <div className="mt-3 py-0 px-4 flex flex-col items-center gap-5 mb-[50px]">
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
          recordCounts={mockMonthlyReportData.monthlyRecordCounts}
          currentMonth={month}
        />
        <DefecationScoreChart
          scores={mockMonthlyReportData.monthlyScores}
          labels={weekLabels}
        />
        <UserAverageChart userAverage={mockMonthlyReportData.userAverage} />
        <MonthlyScore />
        <DefecationAnalysis />
        <MonthlyFoodReport />
        <WaterReport waterData={mockMonthlyReportData.water} type="monthly" />
        <StressAnalysisChart
          stressAnalysis={mockMonthlyReportData.stress}
          xLabels={weekLabels}
          displayLabels={weekLabels}
        />
      </div>
      <Suggestions suggestion={mockMonthlyReportData.suggestion} />
    </div>
  );
}
