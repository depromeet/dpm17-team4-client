'use client';
import { NWaterReport } from '../_components/NWaterReport';
import { StressReport } from '../daily/_components/StressReport';
import { Suggestions } from '../daily/_components/Suggestions';
import { useState } from 'react';
import { DefecationScoreChart } from '../_components/DefecationScoreChart';
import { StressAnalysisChart } from '../_components/StressAnalysisChart';
import { UserAverageChart } from '../_components/UserAverageChart';
import { DefecationAnalysis } from './_components/DefecationAnalysis';
import { MontlyRecord } from './_components/MontlyRecord';
import { SelectDate } from './_components/SelectMonthDate';
import { MonthlyFoodReport } from './_components/MonthlyFoodReport';
import { MonthlyScore } from './_components/MonthlyScore';
import { mockMonthlyReportData } from './mockData';
import { getKoreanDate } from '@/utils/utils-date';

const weekLabels = ['1주차', '2주차', '3주차', '4주차', '5주차'];
export default function MonthlyReportPage() {

  const date = getKoreanDate();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();

  const [month, _setMonth] = useState(currentMonth);
  const [year, _setYear] = useState(currentYear);

  const isNextDisabled = year === currentYear && month === currentMonth;

  return (

    <div className="mt-3 py-0 px-4 flex flex-col items-center gap-5">
      <SelectDate
        currentMonth={month}
        currentYear={year}
        isNextDisabled={isNextDisabled}
      />
      <MontlyRecord recordCounts={mockMonthlyReportData.montlyRecordCounts} currentMonth={month} />
      <DefecationScoreChart scores={mockMonthlyReportData.monthlyScores} labels={weekLabels} />
      <UserAverageChart userAverage={mockMonthlyReportData.userAverage} />
      <MonthlyScore />
      <DefecationAnalysis />
      <StressAnalysisChart
        stressAnalysis={mockMonthlyReportData.stress}
        xLabels={weekLabels}
        displayLabels={weekLabels}
      />
      <MonthlyFoodReport />
      <NWaterReport />
      <StressReport stressData={mockMonthlyReportData.stress} type="monthly" />
      <Suggestions suggestion={mockMonthlyReportData.suggestion} />
    </div>
  );
}
