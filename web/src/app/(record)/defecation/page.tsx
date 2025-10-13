'use client';

import { useRef } from 'react';
import {
  DefecationAttempt,
  DefecationDetail,
  DefecationTime,
} from './_components/ui';
import type { DefecationDetailRef } from './_components/ui/defecation-detail';

export default function DefecationPage() {
  const colorRef = useRef<HTMLDivElement>(null);
  const defecationDetailRef = useRef<DefecationDetailRef>(null);

  const handleOpenColorSection = () => {
    defecationDetailRef.current?.openColorSection();
  };

  const handleCloseColorSection = () => {
    defecationDetailRef.current?.closeColorSection();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 pt-17 pb-[156px] select-none">
      <div className="text-start space-y-6">
        {/* 배변 시간 선택 영역 */}
        <DefecationTime />

        {/* 배변 시도 기록 영역 */}
        <DefecationAttempt
          colorRef={colorRef}
          onOpenColorSection={handleOpenColorSection}
          onCloseColorSection={handleCloseColorSection}
        />

        {/* 배변 내용 상세 기록 영역 */}
        <DefecationDetail
          ref={defecationDetailRef}
          colorRef={(el) => {
            colorRef.current = el;
          }}
        />
      </div>
    </div>
  );
}
