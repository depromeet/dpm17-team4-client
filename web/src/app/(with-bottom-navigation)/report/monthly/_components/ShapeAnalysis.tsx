'use client';

import React, { useState } from 'react';
import {
  getEmojiShapeIcon,
  getRealShapeIcon,
} from '@/app/(record)/defecation/_components/utils/utils-getShapeIcon';
import { Toggle } from '@/components';
import type { PooShape } from '../../daily/types';
import { getShapeLabel } from '../../daily/utils';

export type AnalysisItem = {
  shape: PooShape;
  count: number;
  warning?: '변비 주의' | '설사 의심' | '수분 충전 필요';
};

interface ShapeAnalysisProps {
  // TODO: 실제 API 연동 시 데이터 fetch 처리
  items?: AnalysisItem[];
}

export function ShapeAnalysis({ items: propItems }: ShapeAnalysisProps) {
  const [showRealShape, setShowRealShape] = useState(false);
  const displayItems = propItems;

  if (!displayItems || displayItems.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-gray-400 text-sm">배변 기록이 없습니다</p>
      </div>
    );
  }

  return (
    <>
      <div className="h-[1.25rem]" />
      {/* 토글 스위치 */}
      <div className="flex items-center justify-start gap-[0.75rem] mb-6">
        <span className="text-white text-sm">실제 모양 보기</span>
        <Toggle
          isOn={showRealShape}
          onSwitch={() => setShowRealShape(!showRealShape)}
        />
      </div>

      {/* 랭킹 리스트 */}
      <div className="space-y-4">
        {displayItems.map((item, index) => {
          const shapeIcon = showRealShape
            ? getRealShapeIcon(item.shape, 32, 32)
            : getEmojiShapeIcon(item.shape, 32, 32);

          if (!shapeIcon) return null;

          return (
            <div
              key={`${item.shape}-${index}`}
              className="flex items-center gap-4"
            >
              {/* 순위 아이콘 */}
              <span className="text-gray-600 text-body2-sb">{index + 1}</span>
              <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-gray-700">
                {shapeIcon}
              </div>

              {/* 이름과 횟수 */}
              <div className="flex-1">
                <p className="text-white text-body2-m">
                  {getShapeLabel(item.shape)}
                </p>
                <p className="text-gray-500 text-body3-m">{item.count}회</p>
              </div>

              {/* 경고 버튼 */}
              {item.warning && (
                <div className="flex-shrink-0">
                  <div className="bg-primary-600 text-white px-3 py-1.5 rounded-lg text-body4-sb whitespace-nowrap">
                    {item.warning}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
