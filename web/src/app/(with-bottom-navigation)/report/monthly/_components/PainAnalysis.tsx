'use client';

interface PainAnalysisProps {
  // TODO: 복통 분석 데이터 타입 정의 필요
  data?: any;
}

export function PainAnalysis({ data }: PainAnalysisProps) {
  return (
    <div className="flex items-center justify-center py-8">
      <p className="text-gray-400 text-sm">복통 분석 UI (추후 구현 예정)</p>
    </div>
  );
}
