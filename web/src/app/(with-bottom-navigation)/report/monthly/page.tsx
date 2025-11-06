import { NWaterReport } from '../_components/NWaterReport';
import { StressReport } from '../daily/_components/StressReport';
import { Suggestions } from '../daily/_components/Suggestions';
import { DefecationAnalysis } from './_components/DefecationAnalysis';
import { MonthlyFoodReport } from './_components/MonthlyFoodReport';
import { MonthlyScore } from './_components/MonthlyScore';
import { mockMonthlyReportData } from './mockData';

export default function MonthlyReportPage() {
  return (
    <div className="mt-3 py-0 px-4 flex flex-col items-center gap-5">
      <MonthlyScore />
      <DefecationAnalysis />
      <MonthlyFoodReport />
      <NWaterReport />
      <StressReport stressData={mockMonthlyReportData.stress} type="monthly" />
      <Suggestions suggestion={mockMonthlyReportData.suggestion} />
    </div>
  );
}
