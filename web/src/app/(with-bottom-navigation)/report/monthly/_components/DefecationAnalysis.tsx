'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/utils/utils-cn';
import { ColorAnalysis } from './ColorAnalysis';
import { PainAnalysis } from './PainAnalysis';
import { ShapeAnalysis } from './ShapeAnalysis';
import { TimeAnalysis } from './TimeAnalysis';
import { TimeOfDayAnalysis } from './TimeOfDayAnalysis';
import { mockMonthlyReportData } from '../mockData';
import { getShapeLabel } from '../../daily/utils';
import { DEFECATION_COLOR } from '@/app/(record)/defecation/_components/constants';

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
  const [displayMessage, setDisplayMessage] = useState<string>('배변 기록 분석 결과');

  // 필터 변경 시 메시지 업데이트
  useEffect(() => {
    switch (selectedFilter) {
      case '모양': {
        const shapeItems = mockMonthlyReportData.shape;
        if (shapeItems && shapeItems.length > 0) {
          const mostFrequentShape = shapeItems.reduce((prev, current) =>
            prev.count > current.count ? prev : current
          );
          const shapeLabel = getShapeLabel(mostFrequentShape.shape);
          setDisplayMessage(`가장 많이 확인한 모양은 \n${shapeLabel} 모양이에요`);
        } else {
          setDisplayMessage('배변 기록 분석 결과');
        }
        break;
      }
      case '소요 시간': {
        const distribution = mockMonthlyReportData.timeDistribution;
        const total =
          distribution.within5min +
          distribution.over5min +
          distribution.over10min;
        if (total > 0) {
          const over10minPercent = (distribution.over10min / total) * 100;
          const over5minPercent = (distribution.over5min / total) * 100;
          const within5minPercent = (distribution.within5min / total) * 100;

          if (over10minPercent > 50) {
            setDisplayMessage('배변 소요 시간은 주로 \n10분 이상이었어요');
          } else if (over5minPercent > 50) {
            setDisplayMessage('배변 소요 시간은 주로 \n5분 이상이었어요');
          } else {
            setDisplayMessage('배변 소요 시간은 주로 \n5분 이내였어요');
          }
        } else {
          setDisplayMessage('배변 기록 분석 결과');
        }
        break;
      }
      case '색상': {
        const colorItems = mockMonthlyReportData.color;
        if (colorItems && colorItems.length > 0) {
          const mostFrequentColor = colorItems.reduce((prev, current) =>
            prev.count > current.count ? prev : current
          );
          const colorKey = mostFrequentColor.color as keyof typeof DEFECATION_COLOR;
          const colorLabel = DEFECATION_COLOR[colorKey]?.[0] || '';
          setDisplayMessage(`가장 많이 확인한 색상은 \n${colorLabel}이에요`);
        } else {
          setDisplayMessage('배변 기록 분석 결과');
        }
        break;
      }
      case '배변 시각': {
        const timeOfDayItems = mockMonthlyReportData.timeOfDay;
        if (timeOfDayItems && timeOfDayItems.length > 0) {
          const mostFrequentPeriod = timeOfDayItems.reduce((prev, current) =>
            prev.count > current.count ? prev : current
          );
          const periodLabel =
            mostFrequentPeriod.period === 'MORNING'
              ? '오전'
              : mostFrequentPeriod.period === 'AFTERNOON'
                ? '오후'
                : '저녁';
          setDisplayMessage(`이번 달은 주로 \n${periodLabel}에 성공했어요`);
        } else {
          setDisplayMessage('배변 기록 분석 결과');
        }
        break;
      }
      case '복통': {
        setDisplayMessage('배변 기록 분석 결과');
        break;
      }
      default:
        setDisplayMessage('배변 기록 분석 결과');
    }
  }, [selectedFilter]);

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
      {selectedFilter === '모양' && (
        <ShapeAnalysis items={mockMonthlyReportData.shape} />
      )}

      {selectedFilter === '소요 시간' && (
        <TimeAnalysis distribution={mockMonthlyReportData.timeDistribution} />
      )}

      {selectedFilter === '색상' && (
        <ColorAnalysis
          items={mockMonthlyReportData.color}
          message={mockMonthlyReportData.colorMessage}
        />
      )}

      {selectedFilter === '복통' && <PainAnalysis />}

      {selectedFilter === '배변 시각' && (
        <TimeOfDayAnalysis items={mockMonthlyReportData.timeOfDay} />
      )}
    </div>
  );
}
