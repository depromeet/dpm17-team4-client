'use client';
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

export default function WeeklyReportPage() {
  return (
    <div className="px-4 flex flex-col gap-5">
      <SelectDate />
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
