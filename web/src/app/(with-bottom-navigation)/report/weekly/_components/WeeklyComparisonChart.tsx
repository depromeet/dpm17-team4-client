import { WeeklyMockData } from '../mockData';
import RadialBarChart from './RadialBarChart';

export function WeeklyComparisonChart() {
  const chartSeries = [
    WeeklyMockData.defecationScore.lastWeek,
    WeeklyMockData.defecationScore.thisWeek,
  ];
  const chartLabels = Object.keys(WeeklyMockData.defecationScore);

  return (
    <section className="flex justify-between items-center mb-2 ">
      <RadialBarChart chartSeries={chartSeries} chartLabels={chartLabels} />
      <div className="flex flex-col gap-3">
        <div className="flex gap-2.5">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-primary-600 rounded-[2px]" />
            <div className="text-body4-r text-gray-500 whitespace-nowrap">
              이번 주
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-600 rounded-[2px]" />
            <div className="text-body4-r text-gray-500 whitespace-nowrap">
              저번 주
            </div>
          </div>
        </div>
        <div className="text-body1-m">
          이번 주 평균 점수가
          <br />
          저번 주보다 -20점
          <br />
          하락했어요.
        </div>
      </div>
    </section>
  );
}
