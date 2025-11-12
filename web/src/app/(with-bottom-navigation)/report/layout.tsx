'use client';

import { usePathname } from 'next/navigation';
import { SegmentedControl } from './_components/SegmentedControl';
import type { ReportPeriod } from './daily/types';

export default function ReportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const getCurrentPeriod = (): ReportPeriod => {
    if (pathname?.includes('/weekly')) return 'weekly';
    if (pathname?.includes('/monthly')) return 'monthly';
    return 'daily'; // default
  };

  const currentPeriod = getCurrentPeriod();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 헤더 */}
      <header className="flex items-center justify-between px-4 py-4">
        <h1 className="text-xl font-bold">리포트</h1>
        {/*TODO(seonghyun): notification*/}
        {/*<Bell className="w-6 h-6" />*/}
      </header>

      {/* 세그먼트 컨트롤 */}
      <SegmentedControl currentPeriod={currentPeriod} />

      {/* 페이지 콘텐츠 */}
      {children}

      {/* 하단 여백 추가 */}
      <div className="h-[80px]"></div>
    </div>
  );
}
