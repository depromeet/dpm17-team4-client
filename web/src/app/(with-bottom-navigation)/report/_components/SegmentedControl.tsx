'use client';

import { useRouter } from 'next/navigation';
import type { ReportPeriod } from '../daily/types';

interface SegmentedControlProps {
  currentPeriod: ReportPeriod;
}

export function SegmentedControl({ currentPeriod }: SegmentedControlProps) {
  const router = useRouter();

  const periods = [
    { key: 'daily' as const, label: '일간', route: '/report/daily' },
    { key: 'weekly' as const, label: '주간', route: '/report/weekly' },
    { key: 'monthly' as const, label: '월간', route: '/report/monthly' },
  ];

  const handlePeriodClick = (period: (typeof periods)[0]) => {
    if (period.key !== currentPeriod) {
      router.push(period.route);
    }
  };

  return (
    <div className="px-4">
      <div className="flex bg-gray-800 rounded-lg p-1">
        {periods.map((period) => (
          <button
            type="button"
            key={period.key}
            onClick={() => handlePeriodClick(period)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              currentPeriod === period.key
                ? 'bg-gray-700 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {period.label}
          </button>
        ))}
      </div>
    </div>
  );
}
