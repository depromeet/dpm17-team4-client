import { DefecationAnalysis } from './_components/DefecationAnalysis';
import { MonthlyFoodReport } from './_components/MonthlyFoodReport';
import { MonthlyScore } from './_components/MonthlyScore';

export default function MonthlyReportPage() {
  return (
    <div className="mt-3 py-0 px-4 flex flex-col items-center gap-5">
      <MonthlyScore />
      <DefecationAnalysis />
      <MonthlyFoodReport />
    </div>
  );
}
