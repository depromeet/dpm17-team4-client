'use client';

import type { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import streching from '@/assets/report/stretching.png';
import type { WeeklyStress } from '../weekly/types';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export type StressAnalysisChart = {
  message: string;
  image: string;
  items: {
    day: string;
    stress: string | null;
  }[];
};

interface StressAnalysisChartProps {
  stressAnalysis: WeeklyStress;
  xLabels: string[];
  displayLabels: string[];
}
const stressLevelToValue: { [key: string]: number } = {
  VERY_LOW: 0,
  LOW: 25,
  MEDIUM: 50,
  HIGH: 75,
  VERY_HIGH: 100,
};

export function StressAnalysisChart({
  stressAnalysis,
  xLabels,
  displayLabels,
}: StressAnalysisChartProps) {
  const data = new Map<string, number | null>(
    stressAnalysis.items.map((item) => [
      item.day,
      item.stress ? stressLevelToValue[item.stress] : null,
    ])
  );

  const chartData = xLabels
    .map((day, index) => {
      const value = data.get(day);
      if (value !== undefined && value !== null) {
        return { x: index, y: value };
      }
      return null;
    })
    .filter((item) => item !== null) as { x: number; y: number }[];

  const series = [
    {
      name: '스트레스 분석',
      data: chartData,
    },
  ];

  const options: ApexOptions = {
    colors: ['#796AFF'],
    chart: {
      type: 'line',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: false,
      intersect: true,
      shared: false,
      theme: 'dark',
      x: {
        show: false,
      },
      y: {
        title: { formatter: () => '' },
      },
      custom: ({ series, seriesIndex, dataPointIndex }) => {
        const value = series[seriesIndex][dataPointIndex];
        if (value === null) {
          return '';
        }
        return `<div class="custom-tooltip-container">
                <div class="custom-tooltip-value">${value}점</div>
            </div>`;
      },
      marker: { show: false },
      style: { fontSize: '12px' },
      fillSeriesColor: false,
      onDatasetHover: { highlightDataSeries: false },
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
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
      width: 2,
    },
    fill: {
      type: 'solid',
    },
    markers: {
      size: 5,
      colors: ['#796AFF'],
      strokeColors: 'none',
      strokeWidth: 2,
    },
    title: {
      align: 'left',
      style: {
        fontSize: '12px',
        fontWeight: 'bold',
        color: '#292D32',
      },
    },
    grid: {
      borderColor: '#707885',
      padding: {
        left: 10,
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      row: {
        colors: ['transparent', 'transparent'],
        opacity: 0.5,
      },
    },
    xaxis: {
      type: 'numeric',
      min: 0,
      max: displayLabels.length - 1,
      tickAmount: displayLabels.length - 1,
      crosshairs: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
      labels: {
        show: true,
        formatter: (value) => {
          const index = Math.round(Number(value));
          return displayLabels[index] || '';
        },
        style: {
          colors: '#707885',
        },
      },
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 4,
      labels: {
        formatter: (val) => {
          const labelMap: { [key: number]: string } = {
            0: '아예없음',
            25: '조금 있음',
            50: '적당함',
            75: '조금 심함',
            100: '매우 심함',
          };
          return labelMap[val];
        },
        style: {
          colors: '#707885',
        },
      },
    },
  };
  return (
    <section className=" py-7 flex flex-col gap-4 bg-gray-800 rounded-[20px]">
      <div className="flex flex-col">
        <div className="text-body3-m text-gray-600 mb-2  px-6">
          스트레스 분석 결과
        </div>
        <div className="flex justify-center gap-12  px-6">
          <div className="text-h4">{stressAnalysis.message}</div>
          <Image
            src={streching}
            alt="스트레스 분석 결과 이미지"
            width={80}
            height={80}
          />
        </div>
        {/* 꺾은선 그래프 영역 */}
        <div className="w-full">
          <ApexChart
            options={options}
            series={series}
            type="line"
            width="100%"
            height={232}
          />
        </div>
      </div>
    </section>
  );
}
