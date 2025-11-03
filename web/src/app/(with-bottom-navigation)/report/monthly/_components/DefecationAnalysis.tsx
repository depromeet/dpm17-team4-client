'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/utils/utils-cn';
import { ColorAnalysis, type ColorAnalysisItem } from './ColorAnalysis';
import { PainAnalysis } from './PainAnalysis';
import { type AnalysisItem, ShapeAnalysis } from './ShapeAnalysis';
import { TimeAnalysis, type TimeDistribution } from './TimeAnalysis';
import { TimeOfDayAnalysis, type TimeOfDayItem } from './TimeOfDayAnalysis';

type FilterType = '모양' | '소요 시간' | '색상' | '복통' | '배변 시각';

const filterTabs: FilterType[] = [
  '모양',
  '소요 시간',
  '색상',
  '복통',
  '배변 시각',
];

// Mock 데이터
const mockShapeItems: AnalysisItem[] = [
  {
    shape: 'RABBIT',
    count: 8,
    warning: '변비 주의',
  },
  {
    shape: 'BANANA',
    count: 4,
  },
  {
    shape: 'PORRIDGE',
    count: 2,
    warning: '설사 의심',
  },
];

const mockTimeDistribution: TimeDistribution = {
  within5min: 2, // 5분 이내
  over5min: 4, // 5분 이상
  over10min: 10, // 10분 이상
};

const mockColorItems: ColorAnalysisItem[] = [
  {
    color: 'DARK_BROWN',
    count: 8,
  },
  {
    color: 'GOLD',
    count: 4,
  },
  {
    color: 'RED',
    count: 1,
    warning: '전문가 상담 권장',
  },
];

const mockTimeOfDayItems: TimeOfDayItem[] = [
  {
    period: 'MORNING',
    count: 18,
  },
  {
    period: 'AFTERNOON',
    count: 3,
  },
  {
    period: 'EVENING',
    count: 8,
  },
];

const mockMessage =
  '혈변은 건강의 적신호예요. 대장염, 대장암, 치질 등의 문제일 수 있어요. 빠른 병원 방문을 권장해요.';

export function DefecationAnalysis() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('모양');
  const [displayMessage, setDisplayMessage] = useState<string>(
    '배변 기록 분석 결과'
  );

  // 필터 변경 시 메시지 초기화
  useEffect(() => {
    setDisplayMessage('배변 기록 분석 결과');
  }, []);

  return (
    <div className="bg-gray-800 rounded-[14px] py-7 px-6 w-full">
      {/* 타이틀 */}
      <p className="text-[#707885] text-body3-m mb-2">배변 기록 분석 결과</p>

      {/* 메인 메시지 */}
      <p className="text-white text-[18px] font-semibold mb-6 whitespace-pre-line">
        {displayMessage}
      </p>

      {/* 필터 탭 */}
      <div className="flex gap-[8px] justify-between">
        {filterTabs.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setSelectedFilter(filter)}
            className={cn(
              'w-full py-[4px] rounded-lg transition-colors font-semibold text-[13px] leading-[20px] tracking-[-0.2px] whitespace-nowrap',
              {
                'bg-gray-600 text-white': selectedFilter === filter,
                'bg-gray-700 text-gray-400 hover:text-white':
                  selectedFilter !== filter,
              }
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* 필터별 UI 렌더링 */}
      {selectedFilter === '모양' && <ShapeAnalysis items={mockShapeItems} />}

      {selectedFilter === '소요 시간' && (
        <TimeAnalysis distribution={mockTimeDistribution} />
      )}

      {selectedFilter === '색상' && (
        <ColorAnalysis items={mockColorItems} message={mockMessage} />
      )}

      {selectedFilter === '복통' && <PainAnalysis />}

      {selectedFilter === '배변 시각' && (
        <TimeOfDayAnalysis items={mockTimeOfDayItems} />
      )}
    </div>
  );
}
