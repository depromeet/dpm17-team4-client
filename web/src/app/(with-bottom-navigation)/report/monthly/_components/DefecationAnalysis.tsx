'use client';

import { useState } from 'react';
import { cn } from '@/utils/utils-cn';
import { mockMonthlyReportData } from '../mockData';
import { ColorAnalysis } from './ColorAnalysis';
import { PainAnalysis } from './PainAnalysis';
import { ShapeAnalysis } from './ShapeAnalysis';
import { TimeAnalysis } from './TimeAnalysis';
import { TimeOfDayAnalysis } from './TimeOfDayAnalysis';

type FilterType = '모양' | '소요 시간' | '색상' | '복통' | '배변 시각';

const filterTabs: FilterType[] = [
  '모양',
  '소요 시간',
  '색상',
  '복통',
  '배변 시각',
];

export function DefecationAnalysis() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('모양');

  const filterMessages: Record<FilterType, string | undefined> = {
    모양: mockMonthlyReportData.shape.titleMessage,
    '소요 시간': mockMonthlyReportData.timeDistribution.titleMessage,
    색상: mockMonthlyReportData.color.titleMessage,
    복통: mockMonthlyReportData.pain.titleMessage,
    '배변 시각': mockMonthlyReportData.timeOfDay.titleMessage,
  };

  const displayMessage =
    filterMessages[selectedFilter] ?? '배변 기록 분석 결과';

  return (
    <div className="bg-gray-800 rounded-[14px] py-7 px-6 w-full">
      {/* 타이틀 */}
      <p className="text-[#4E5560] text-body3-m mb-2">배변 기록 분석 결과</p>

      {/* 메인 메시지 */}
      <p className="text-white text-h4 mb-6 whitespace-pre-line">
        {displayMessage}
      </p>

      {/* 필터 탭 */}
      <div className="flex gap-[8px]">
        {filterTabs.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setSelectedFilter(filter)}
            className={cn(
              'px-[10px] py-[4px] rounded-lg transition-colors font-semibold text-[13px] leading-[20px] tracking-[-0.2px] whitespace-nowrap',
              {
                'bg-gray-600 text-white': selectedFilter === filter,
                'bg-gray-700 text-[#4E5560] hover:text-white':
                  selectedFilter !== filter,
              }
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* 필터별 UI 렌더링 */}
      {selectedFilter === '모양' && (
        <ShapeAnalysis items={mockMonthlyReportData.shape.items} />
      )}

      {selectedFilter === '소요 시간' && (
        <TimeAnalysis distribution={mockMonthlyReportData.timeDistribution} />
      )}

      {selectedFilter === '색상' && (
        <ColorAnalysis
          items={mockMonthlyReportData.color.items}
          message={mockMonthlyReportData.color.colorMessage}
        />
      )}

      {selectedFilter === '복통' && (
        <PainAnalysis data={mockMonthlyReportData.pain} />
      )}

      {selectedFilter === '배변 시각' && (
        <TimeOfDayAnalysis items={mockMonthlyReportData.timeOfDay.items} />
      )}
    </div>
  );
}
