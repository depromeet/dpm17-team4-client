import RadialBarChart from './RadialBarChart';

export type DefecationScore = {
  lastWeek: number;
  thisWeek: number;
  dailyScore: number[];
};
interface WeeklyComparisonChartProps {
  defecationScore: DefecationScore;
}

export function WeeklyComparisonChart({
  defecationScore,
}: WeeklyComparisonChartProps) {
  const chartSeries = [defecationScore.lastWeek, defecationScore.thisWeek];
  const chartLabels = Object.keys(defecationScore);

  const scoreDiff = defecationScore.thisWeek - defecationScore.lastWeek;
  const absDiff = Math.abs(scoreDiff);

  const renderScoreMessage = () => {
    if (scoreDiff === 0) {
      return (
        <>
          이번 주 평균 점수가
          <br />
          저번 주 점수와 일치해요.
        </>
      );
    }

    const statusText = scoreDiff > 0 ? '상승했어요' : '하락했어요';

    return (
      <>
        <span>이번 주 평균 점수가</span>
        <br />
        저번 주보다 {absDiff}점
        <br />
        {statusText}
      </>
    );
  };

  return (
    <section className="flex items-center mb-2 ">
      <RadialBarChart
        chartSeries={chartSeries}
        chartLabels={chartLabels}
        defecationDailyScore={defecationScore.dailyScore}
      />
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
        <div className="text-body1-m">{renderScoreMessage()}</div>
      </div>
    </section>
  );
}
