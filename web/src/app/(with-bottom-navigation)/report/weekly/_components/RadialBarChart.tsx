'use client';

import type { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import React from 'react';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function RadialBarChart({
  chartSeries,
  chartLabels,
  defecationDailyScore,
}: {
  chartSeries: number[];
  chartLabels: string[];
  defecationDailyScore: number[];
}) {
  const dailyScore = defecationDailyScore.reduce((arr, cur) => arr + cur);
  const chartOptions: ApexOptions = {
    chart: {
      type: 'radialBar',
      offsetX: 0,
      offsetY: 0,
      parentHeightOffset: 0,
    },
    colors: ['#7850FB', '#4E5560'],
    stroke: {
      lineCap: 'round',
    },
    tooltip: {
      enabled: false,
    },
    states: {
      hover: {
        filter: {
          type: 'none',
        },
      },
      active: {
        filter: {
          type: 'none',
        },
      },
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
          total: {
            show: false,
          },
        },
        track: {
          background: '#333333',
          strokeWidth: '97%',
          margin: 5,
        },
        hollow: {
          size: '45%',
        },
      },
    },
    labels: chartLabels,
  };

  return (
    <div className="relative w-[140px] h-[140px]">
      {/* 배변점수 텍스트 영역 */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-10 scale-90">
        <div className="text-body4-r text-gray-500">배변점수</div>
        <div className="text-h4 text-white">{dailyScore}점</div>
      </div>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="radialBar"
        height={140}
        width={140}
      />
    </div>
  );
}
