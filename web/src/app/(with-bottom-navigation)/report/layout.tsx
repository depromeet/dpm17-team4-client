'use client';

import { usePathname } from 'next/navigation';
import { useReportContext } from '@/contexts/ReportContext';
import { SegmentedControl } from './_components/SegmentedControl';
import BAD_BG from './daily/_components/assets/BAD.png';
import GOOD_BG from './daily/_components/assets/GOOD.png';
import NORMAL_BG from './daily/_components/assets/NORMAL.png';
import VERY_BAD_BG from './daily/_components/assets/VERY_BAD.png';
import VERY_GOOD_BG from './daily/_components/assets/VERY_GOOD.png';
import type { BackgroundColor, ReportPeriod } from './daily/types';

export default function ReportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { hasPooData, backgroundColor } = useReportContext();

  const getCurrentPeriod = (): ReportPeriod => {
    if (pathname?.includes('/weekly')) return 'weekly';
    if (pathname?.includes('/monthly')) return 'monthly';
    return 'daily'; // default
  };

  const currentPeriod = getCurrentPeriod();

  const getBackgroundColorImage = (
    backgroundColor: BackgroundColor
  ): string => {
    switch (backgroundColor) {
      case 'VERY_BAD':
        return VERY_BAD_BG.src;
      case 'BAD':
        return BAD_BG.src;
      case 'NORMAL':
        return NORMAL_BG.src;
      case 'GOOD':
        return GOOD_BG.src;
      case 'VERY_GOOD':
        return VERY_GOOD_BG.src;
      default:
        return VERY_BAD_BG.src;
    }
  };

  const isShowCustomBackground = hasPooData && currentPeriod === 'daily';

  return (
    <div className="min-h-screen bg-[#121213] text-white">
      {isShowCustomBackground && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '812px',
            backgroundImage: `url(${getBackgroundColorImage(backgroundColor)})`,
            backgroundSize: '100% 812px',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* 콘텐츠 영역 */}
      <div className="relative z-10 min-h-screen">
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
    </div>
  );
}
