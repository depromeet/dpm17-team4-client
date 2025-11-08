import type { UserAverage } from '@/app/(with-bottom-navigation)/report/_components/UserAverageChart';
import type {
  ReportData,
  Suggestion,
} from '@/app/(with-bottom-navigation)/report/daily/types';
import type { ColorAnalysisItem } from '@/app/(with-bottom-navigation)/report/monthly/_components/ColorAnalysis';
import type { MonthlyRecordCounts } from '@/app/(with-bottom-navigation)/report/monthly/_components/MonthlyRecord';
import type { PainData } from '@/app/(with-bottom-navigation)/report/monthly/_components/PainAnalysis';
import type { AnalysisItem } from '@/app/(with-bottom-navigation)/report/monthly/_components/ShapeAnalysis';
import type { TimeDistribution } from '@/app/(with-bottom-navigation)/report/monthly/_components/TimeAnalysis';
import type { TimeOfDayItem } from '@/app/(with-bottom-navigation)/report/monthly/_components/TimeOfDayAnalysis';
import type {
  MonthlyScore,
  WeeklyMonthlyFoodReport,
  WeeklyMonthlyStress,
  WeeklyMonthlyWater,
} from '@/app/(with-bottom-navigation)/report/monthly/types';

export interface ReportDataResponseDto extends ReportData {}

export interface MonthlyReportResponseDto {
  monthlyScore: MonthlyScore;
  shape: {
    titleMessage: string;
    items: AnalysisItem[];
  };
  timeDistribution: TimeDistribution;
  color: {
    items: ColorAnalysisItem[];
    colorMessage: string;
    titleMessage?: string;
  };
  timeOfDay: {
    titleMessage: string;
    items: TimeOfDayItem[];
  };
  recordCount: MonthlyRecordCounts;
  monthlyScores: number[];
  userAverage: UserAverage;
  pain: PainData;
  food: WeeklyMonthlyFoodReport;
  water: WeeklyMonthlyWater;
  stress: WeeklyMonthlyStress;
  suggestion: Suggestion;
}
