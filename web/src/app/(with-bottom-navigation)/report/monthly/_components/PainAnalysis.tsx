'use client';

import { useEffect, useRef, useState } from 'react';

export interface PainData {
  veryLow: number; // 0-10%
  low: number; // 11-30%
  medium: number; // 31-50%
  high: number; // 51-70%
  veryHigh: number; // 71-100%
  titleMessage?: string;
  comparison: {
    direction: 'increased' | 'decreased' | 'same';
    count: number;
  };
}

interface PainAnalysisProps {
  data?: PainData;
}

export function PainAnalysis({ data }: PainAnalysisProps) {
  const [showBubble, setShowBubble] = useState(false);
  const [bubblePosition, setBubblePosition] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState<{
    level: 'veryLow' | 'low' | 'medium' | 'high' | 'veryHigh';
    count: number;
  } | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 버블 숨기기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        showBubble &&
        progressBarRef.current &&
        !progressBarRef.current.contains(e.target as Node)
      ) {
        setShowBubble(false);
      }
    };

    if (showBubble) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showBubble]);

  if (!data) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-gray-400 text-sm">배변 기록이 없습니다</p>
      </div>
    );
  }

  const {
    veryLow = 0,
    low = 0,
    medium = 0,
    high = 0,
    veryHigh = 0,
    comparison = { direction: 'same', count: 0 },
  } = data;

  const total = veryLow + low + medium + high + veryHigh;

  if (total === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-gray-400 text-sm">배변 기록이 없습니다</p>
      </div>
    );
  }

  // 각 레벨의 비율 계산
  const veryLowPercent = (veryLow / total) * 100;
  const lowPercent = (low / total) * 100;
  const mediumPercent = (medium / total) * 100;
  const highPercent = (high / total) * 100;
  const veryHighPercent = (veryHigh / total) * 100;

  const isIncreased = comparison.direction === 'increased';
  const isDecreased = comparison.direction === 'decreased';
  const isSame = comparison.direction === 'same';

  // 프로그래스바 클릭 핸들러
  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // 이벤트 전파 방지
    if (!progressBarRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickPercent = (clickX / rect.width) * 100;

    // 클릭한 위치를 0-100% 범위로 제한
    const clampedPercent = Math.max(0, Math.min(100, clickPercent));

    // 클릭한 위치가 어느 레벨에 해당하는지 판단
    let clickedLevel:
      | 'veryLow'
      | 'low'
      | 'medium'
      | 'high'
      | 'veryHigh'
      | null = null;
    let clickedCount = 0;
    let levelPosition = 0;

    // 각 레벨의 시작 위치 계산
    const veryLowStart = 0;
    const veryLowEnd = veryLowPercent;
    const lowStart = veryLowEnd;
    const lowEnd = lowStart + lowPercent;
    const mediumStart = lowEnd;
    const mediumEnd = mediumStart + mediumPercent;
    const highStart = mediumEnd;
    const highEnd = highStart + highPercent;
    const veryHighStart = highEnd;
    const veryHighEnd = 100;

    // Very Low 영역
    if (
      clampedPercent >= veryLowStart &&
      clampedPercent < veryLowEnd &&
      veryLow > 0
    ) {
      clickedLevel = 'veryLow';
      clickedCount = veryLow;
      levelPosition = veryLowStart + veryLowPercent / 2;
    }
    // Low 영역
    else if (
      clampedPercent >= lowStart &&
      clampedPercent < lowEnd &&
      low > 0
    ) {
      clickedLevel = 'low';
      clickedCount = low;
      levelPosition = lowStart + lowPercent / 2;
    }
    // Medium 영역
    else if (
      clampedPercent >= mediumStart &&
      clampedPercent < mediumEnd &&
      medium > 0
    ) {
      clickedLevel = 'medium';
      clickedCount = medium;
      levelPosition = mediumStart + mediumPercent / 2;
    }
    // High 영역
    else if (
      clampedPercent >= highStart &&
      clampedPercent < highEnd &&
      high > 0
    ) {
      clickedLevel = 'high';
      clickedCount = high;
      levelPosition = highStart + highPercent / 2;
    }
    // Very High 영역
    else if (
      clampedPercent >= veryHighStart &&
      clampedPercent <= veryHighEnd &&
      veryHigh > 0
    ) {
      clickedLevel = 'veryHigh';
      clickedCount = veryHigh;
      levelPosition = veryHighStart + veryHighPercent / 2;
    }

    if (clickedLevel && clickedCount > 0) {
      setSelectedLevel({ level: clickedLevel, count: clickedCount });
      setBubblePosition(levelPosition);
      setShowBubble(true);
    }
  };

  return (
    <div className="mt-6">
      {/* 상단 메시지 박스 */}
      <div
        className={`
          rounded-lg px-4 py-3 mb-[69px]
          ${
            isIncreased
              ? 'bg-red-100'
              : isDecreased
                ? 'bg-blue-900/60'
                : 'bg-gray-700'
          }
        `}
      >
        <p className="text-white text-body4-m flex justify-center">
          {!isSame && (
            <>
              지난달보다 복통이{' '}
              <span
                className={
                  isIncreased
                    ? 'text-red-600 font-semibold'
                    : 'text-blue-600 font-semibold'
                }
              >
                {' '}
                {comparison.count}회{' '}
              </span>{' '}
              {isIncreased ? '늘었어요' : '줄었어요'}
            </>
          )}
        </p>
      </div>

      {/* 프로그래스바 영역 */}
      <div className="relative mb-[4px]">
        {/* 지시자 버블 - 클릭 시에만 표시 */}
        {showBubble && selectedLevel && (
          <div
            className="absolute -top-[38px] transform -translate-x-1/2 z-10"
            style={{ left: `${bubblePosition}%` }}
          >
            <div className="relative">
              {/* 버블 */}
              <div className="bg-gray-700 rounded-lg px-[16px] whitespace-nowrap">
                <span className="text-white text-body4-sb">
                  {selectedLevel.count}회
                </span>
              </div>
              {/* 화살표 */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-700" />
              </div>
            </div>
          </div>
        )}

        {/* 프로그래스바 - 클릭 가능 */}
        {/* biome-ignore lint/a11y/useSemanticElements: 프로그래스바는 div로 구현 필요 */}
        <div
          ref={progressBarRef}
          className="flex h-[30px] rounded-full overflow-hidden cursor-pointer"
          onClick={handleProgressBarClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
            }
          }}
        >
          {/* Very Low  */}
          {veryLowPercent > 0 && (
            <div
              className="bg-[#74CE7E]"
              style={{ width: `${veryLowPercent}%` }}
            />
          )}

          {/* Low  */}
          {lowPercent > 0 && (
            <div className="bg-[#8BB35F]" style={{ width: `${lowPercent}%` }} />
          )}

          {/* Medium  */}
          {mediumPercent > 0 && (
            <div
              className="bg-[#D6AC6A]"
              style={{ width: `${mediumPercent}%` }}
            />
          )}

          {/* High  */}
          {highPercent > 0 && (
            <div
              className="bg-[#E98259]"
              style={{ width: `${highPercent}%` }}
            />
          )}

          {/* Very High  */}
          {veryHighPercent > 0 && (
            <div
              className="bg-[#FB5A58]"
              style={{ width: `${veryHighPercent}%` }}
            />
          )}
        </div>
      </div>

      {/* 하단 라벨 */}
      <div className="flex justify-between items-center">
        <span
          className="text-[#96D89B] font-semibold leading-[22px] tracking-normal"
          style={{
            fontSize: '14px',
          }}
        >
          고통이 뭐죠
        </span>
        <span
          className="text-[#FD5656] font-semibold leading-[22px] tracking-normal"
          style={{
            fontSize: '14px',
          }}
        >
          똥꼬 찢
        </span>
      </div>
    </div>
  );
}
