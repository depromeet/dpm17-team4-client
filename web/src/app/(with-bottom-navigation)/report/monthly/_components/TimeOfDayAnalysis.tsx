'use client';

import Image from 'next/image';
import { MEAL_TIMES } from '@/app/(record)/lifestyle/constants';

export type TimeOfDayItem = {
  period: 'MORNING' | 'AFTERNOON' | 'EVENING';
  count: number;
};

interface TimeOfDayAnalysisProps {
  items?: TimeOfDayItem[];
}

const timeOfDayData = {
  MORNING: {
    label: '오전',
    imageUrl: MEAL_TIMES.find((meal) => meal.id === 'BREAKFAST')?.imageUrl,
  },
  AFTERNOON: {
    label: '오후',
    imageUrl: MEAL_TIMES.find((meal) => meal.id === 'LUNCH')?.imageUrl,
  },
  EVENING: {
    label: '저녁',
    imageUrl: MEAL_TIMES.find((meal) => meal.id === 'DINNER')?.imageUrl,
  },
};

export function TimeOfDayAnalysis({ items }: TimeOfDayAnalysisProps) {
  if (!items || items.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-gray-400 text-sm">배변 기록이 없습니다</p>
      </div>
    );
  }

  return (
    <>
      <div className="h-[1.25rem]" />

      {/* 카드 리스트 */}
      <div className="flex gap-4 justify-center">
        {items.map((item) => {
          const data = timeOfDayData[item.period];

          return (
            <div
              key={item.period}
              className="flex-1 bg-gray-700 rounded-lg p-4 flex flex-col items-center"
            >
              {/* 아이콘 */}
              {data.imageUrl && (
                <div className="flex items-center justify-center mb-1">
                  <Image
                    src={data.imageUrl}
                    alt={data.label}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
              )}

              <div className="h-[8px]" />
              {/* 시간대 라벨 */}
              <p className="text-gray-400 text-body4-r">{data.label}</p>

              <div className="h-[2px]" />
              {/* 횟수 */}
              <p className="text-white text-body2-sb">{item.count}회</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
