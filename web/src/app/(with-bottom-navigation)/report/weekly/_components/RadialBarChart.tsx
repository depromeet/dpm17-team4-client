'use client';

import type { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface RadialBarChartProps {
  chartSeries: number[];
  chartLabels: string[];
}

export default function RadialBarChart({
  chartSeries,
  chartLabels,
}: RadialBarChartProps) {
  const options: ApexOptions = {
    chart: {
      type: 'radialBar',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: '30%',
          background: 'transparent',
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
        barLabels: {
          enabled: true,
          useSeriesColors: true,
          offsetX: -8,
          fontSize: '16px',
          formatter: function (seriesName, opts) {
            return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex];
          },
        },
      },
    },
    colors: ['#796AFF', '#D1CEEC'],
    labels: chartLabels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: false,
          },
        },
      },
    ],
    legend: {
      show: false,
    },
  };

  return (
    <div className="w-[200px] h-[200px]">
      <ApexChart
        options={options}
        series={chartSeries}
        type="radialBar"
        height={200}
      />
    </div>
  );
}

