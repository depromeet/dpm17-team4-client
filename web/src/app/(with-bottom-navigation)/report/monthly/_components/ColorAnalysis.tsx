'use client';

import React from 'react';
import { DEFECATION_COLOR } from '@/app/(record)/defecation/_components/constants';
import type { PooColor } from '../../daily/types';

export type ColorAnalysisItem = {
  color: PooColor;
  count: number;
  warning?: '전문가 상담 권장';
};

interface ColorAnalysisProps {
  items?: ColorAnalysisItem[];
  message?: string;
}

export function ColorAnalysis({ items, message }: ColorAnalysisProps) {
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
      
      {/* 랭킹 리스트 */}
      <div className="space-y-4">
        {items.map((item, index) => {
          const colorCode = DEFECATION_COLOR[item.color][1];;
          const colorLabel = DEFECATION_COLOR[item.color][0];

          return (
            <div
              key={`${item.color}-${index}`}
              className="flex items-center gap-[12px]"
            >
              {/* 순위 */}
              <span className="text-gray-600 text-body2-sb">{index + 1}</span>
              
              {/* 색상 원형 스와치 */}
              <div 
                className="flex-shrink-0 w-[40px] h-[40px] rounded-full flex items-center justify-center"
                style={{ backgroundColor: colorCode }}
              />

              {/* 이름과 횟수 */}
              <div className="flex-1">
                <p className="text-white text-body2-m">
                  {colorLabel}
                </p>
                <p className="text-gray-500 text-body3-m">{item.count}회</p>
              </div>

              {/* 경고 버튼 */}
              {item.warning && (
                <div className="flex-shrink-0">
                  <div className="bg-red-600 text-white px-3 py-1.5 rounded-[4px] text-body4-sb whitespace-nowrap">
                    {item.warning}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 경고 메시지 */}
      <div className="mt-6 bg-gray-700 rounded-lg px-4 py-3">
        <p className="text-white text-body4-m whitespace-pre-line">
          {message}
        </p>
      </div>
    </>
  );
}
