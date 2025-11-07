export interface WeeklyReportMockData {
  defecationScore: {
    lastWeek: number;
    thisWeek: number;
  };
}

// NOTE: 주간 리포트 Mock 데이터
export const WeeklyMockData: WeeklyReportMockData = {
  defecationScore: {
    lastWeek: 75,
    thisWeek: 55,
  },
};
