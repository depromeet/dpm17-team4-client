'use client';

export type TimeDistribution = {
  within5min: number; // 5분 이내
  over5min: number; // 5분 이상
  over10min: number; // 10분 이상
};

interface TimeAnalysisProps {
  // TODO: 실제 API 연동 시 데이터 fetch 처리
  distribution?: TimeDistribution;
}

// 원형 차트 컴포넌트 (스톱워치 형태)
function TimeDistributionChart({
  distribution,
}: {
  distribution: TimeDistribution;
}) {
  const total =
    distribution.within5min + distribution.over5min + distribution.over10min;
  const within5minPercent =
    total > 0 ? (distribution.within5min / total) * 100 : 0;
  const over5minPercent = total > 0 ? (distribution.over5min / total) * 100 : 0;
  const over10minPercent =
    total > 0 ? (distribution.over10min / total) * 100 : 0;

  // SVG 원형 차트 계산
  const radius = 80;
  const centerX = 100;
  const centerY = 100;

  // 시작 각도 (12시 방향부터 시계방향)
  const startAngle = -90; // 12시 방향
  const within5minAngle = (within5minPercent / 100) * 360;
  const over5minAngle = (over5minPercent / 100) * 360;

  // 각 세그먼트의 시작/끝 각도
  const within5minStart = startAngle;
  const within5minEnd = within5minStart + within5minAngle;
  const over5minStart = within5minEnd;
  const over5minEnd = over5minStart + over5minAngle;
  const over10minStart = over5minEnd;
  const over10minEnd = startAngle + 360;

  // SVG path 생성 함수
  const createArc = (startAngle: number, endAngle: number) => {
    const start = {
      x: centerX + radius * Math.cos((startAngle * Math.PI) / 180),
      y: centerY + radius * Math.sin((startAngle * Math.PI) / 180),
    };
    const end = {
      x: centerX + radius * Math.cos((endAngle * Math.PI) / 180),
      y: centerY + radius * Math.sin((endAngle * Math.PI) / 180),
    };
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${centerX} ${centerY} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y} Z`;
  };

  return (
    <div className="flex flex-col items-center">
      {/* 스톱워치 아이콘 */}
      <div className="relative mb-6">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          role="img"
          aria-label="배변 소요 시간 분포 차트"
        >
          <title>배변 소요 시간 분포 차트</title>
          {/* 5분 이내 - 밝은 회색 */}
          {within5minPercent > 0 && (
            <path
              d={createArc(within5minStart, within5minEnd)}
              fill="#99A1B1"
            />
          )}
          {/* 5분 이상 - 어두운 회색 */}
          {over5minPercent > 0 && (
            <path d={createArc(over5minStart, over5minEnd)} fill="#4E5560" />
          )}
          {/* 10분 이상 - 빨간색 */}
          {over10minPercent > 0 && (
            <path d={createArc(over10minStart, over10minEnd)} fill="#F13A49" />
          )}
          {/* 상단 정보 박스 */}
          <rect
            x={centerX - 17.5}
            y={2}
            width={33}
            height={9}
            rx={2}
            fill="#6B7280"
          />
          <rect x={centerX - 9.5} y={10} width={16} height={9} fill="#6B7280" />
          {/* 원형 border */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke="#6B7280"
            strokeWidth="9"
          />
        </svg>
      </div>
    </div>
  );
}

export function TimeAnalysis({
  distribution: propDistribution,
}: TimeAnalysisProps) {
  const displayDistribution = propDistribution;
  if (!displayDistribution) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-gray-400 text-sm">배변 기록이 없습니다</p>
      </div>
    );
  }

  const legendItems = [
    { label: '5분 이내', color: 'bg-gray-400' },
    { label: '5분 이상', color: 'bg-gray-600' },
    { label: '10분 이상', color: 'bg-red-600' },
  ];

  return (
    <>
      <div className="h-[2rem]" />
      {/* 원형 차트 */}
      <TimeDistributionChart distribution={displayDistribution} />
      {/* 범례 */}
      <div className="flex items-center justify-center gap-[0.625rem]">
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center gap-[0.25rem]">
            <div className={`w-4 h-4 rounded ${item.color} flex-shrink-0`} />
            <span className="text-gray-500 text-body4-r">{item.label}</span>
          </div>
        ))}
      </div>
      {/* 경고 메시지 */}
      <div className="mt-6 bg-red-100 rounded-lg px-4 py-3">
        <p className="text-white text-body4-m">
          소요 시간이 10분이 넘으면 변비·치질 위험도가 올라가요
        </p>
      </div>
    </>
  );
}
