'use client';

import type { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface DefecationScoreChartProps {
  scores: number[];
  labels: string[];
}

export const DefecationScoreChart = ({
  scores,
  labels,
}: DefecationScoreChartProps) => {
  if (!scores || !labels || labels.length === 0) {
    return null;
  }

  const chartData = labels
    .map((_, index) => {
      const value = scores[index];
      if (value !== undefined && value !== null) {
        return { x: index, y: value };
      }
      return null;
    })
    .filter((item) => item !== null) as { x: number; y: number }[];

  const seriesData = [
    {
      name: '배변 분석',
      data: chartData,
    },
  ];

  const options: ApexOptions = {
    colors: ['#796AFF'],

    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      events: {
        mouseMove: (event, chartContext, config) => {
          // if (config.seriesIndex === -1 || config.dataPointIndex === -1) {
          //   return;
          // }
          // const tooltip = chartContext.el.querySelector('.apexcharts-tooltip');
          // tooltip.style.setProperty('top', '30px', 'important');
          // tooltip.style.setProperty('left', '20px', 'important');
          // // console.log('ttew', tooltip);
          // const pointsArray = config.globals.pointsArray;
          // // console.log('config:', config); // index 값, pointsArray 확인
          // if (
          //   pointsArray[config.seriesIndex] &&
          //   pointsArray[config.seriesIndex][config.dataPointIndex]
          // ) {
          //   const position =
          //     pointsArray[config.seriesIndex][config.dataPointIndex];
          // }
        },
      },
    },
    tooltip: {
      enabled: true,
      intersect: true,
      shared: false,
      theme: 'dark',
      x: {
        show: false,
      },
      y: {
        title: { formatter: () => '' },
        formatter: (value) => value.toFixed(0),
      },
      custom: ({ series, seriesIndex, dataPointIndex }) => {
        const value = series[seriesIndex][dataPointIndex];

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
      hover: {
        sizeOffset: 0,
      },
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
      borderColor: '#292D32',
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
      type: 'category',
      min: 0,
      max: labels.length - 1,
      tickAmount: labels.length - 1,
      crosshairs: {
        show: false,
      },
      labels: {
        show: true,
        formatter: (value) => {
          const index = Math.round(Number(value));
          return labels[index] || '';
        },
        style: {
          colors: '#707885',
          fontSize: '12px',
          cssClass: 'apexcharts-xaxis-label',
        },
        offsetY: 0,
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
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 4,
      labels: {
        formatter: (val) => {
          return val.toFixed(0);
        },
        style: {
          colors: '#707885',
        },
      },
    },
  };

  return (
    <>
      <style global jsx>{`

.apexcharts-tooltip.apexcharts-theme-dark {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(3px) !important;
  -webkit-backdrop-filter: blur(3px);
  border: none !important; 
  box-shadow: none !important;  
  border-radius: 20px;
  overflow: hidden;
}

.apexcharts-tooltip.apexcharts-theme-dark::before {
  content: '';
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.12),
    transparent
  );
}


.apexcharts-tooltip.apexcharts-theme-dark::after {
  content: '';
  width: 1px;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.8),
    transparent,
    rgba(255, 255, 255, 0.12)
  );
}

.custom-tooltip-container {
  padding: 6px 16px;
}

.custom-tooltip-value {
  color: #eff6ff;
  font-size: 12px;
  font-weight: 600;
}

.apexcharts-tooltip-marker {
  display: none;
}

`}</style>
      <div className="bg-gray-800 rounded-[20px] w-full pt-7 px-3">
        <div className="text-body3-m text-gray-600 px-3">배변 점수</div>
        <ApexChart
          options={options}
          series={seriesData}
          type="line"
          height={296}
        />
      </div>
    </>
  );
};
