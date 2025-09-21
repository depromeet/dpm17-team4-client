
// NOTE(seonghyun): Enum 매핑 함수들
export const getMealTimeLabel = (mealTime: string): string => {
  const mapping: Record<string, string> = {
    BREAKFAST: '아침',
    LUNCH: '점심',
    DINNER: '저녁',
    SNACK: '간식',
  };
  return mapping[mealTime] || mealTime;
};

export const getWaterNameLabel = (name: string): string => {
  const mapping: Record<string, string> = {
    STANDARD: '권장 섭취량',
    YESTERDAY: '어제',
    TODAY: '오늘',
  };
  return mapping[name] || name;
};

export const getWaterLevelLabel = (level: string): string => {
  const mapping: Record<string, string> = {
    HIGH: '충분',
    MEDIUM: '보통',
    LOW: '낮음',
  };
  return mapping[level] || level;
};

export const getColorLabel = (color: string): string => {
  const mapping: Record<string, string> = {
    DEFAULT: '기본',
    GOLD: '금색',
    DARK_BROWN: '갈색',
    RED: '빨간색',
    GREEN: '초록색',
    GRAY: '회색',
  };
  return mapping[color] || color;
};

export const getShapeLabel = (shape: string): string => {
  const mapping: Record<string, string> = {
    RABBIT: '토끼',
    ROCK: '돌',
    CORN: '옥수수',
    BANANA: '바나나',
    CREAM: '크림',
    PORRIDGE: '물',
  };
  return mapping[shape] || shape;
};

// NOTE(seonghyun): 점수 관련 함수들
export const getScoreColor = (score: number): string => {
  if (score <= 20) return 'bg-red-500';
  if (score <= 40) return 'bg-orange-500';
  if (score <= 60) return 'bg-yellow-500';
  if (score <= 80) return 'bg-blue-500';
  return 'bg-green-500';
};

export const getScoreLabel = (score: number): string => {
  if (score <= 20) return '매우 나쁨';
  if (score <= 40) return '나쁨';
  if (score <= 60) return '보통';
  if (score <= 80) return '좋음';
  return '매우 좋음';
};

// NOTE(seonghyun): 날짜 포맷팅 함수
export const formatDate = (date: Date): string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdays[date.getDay()];
  return `${month}월 ${day}일 (${weekday}), 오늘`;
};

// NOTE(seonghyun): 임시 - 식사 시간에 따른 이모지 반환
export const getMealTimeIcon = (mealTime: string): string => {
  switch (mealTime) {
    case 'BREAKFAST':
      return '☀️';
    case 'LUNCH':
      return '🍀';
    case 'DINNER':
      return '🌙';
    case 'SNACK':
      return '🍰';
    default:
      return '🍽️';
  }
};
