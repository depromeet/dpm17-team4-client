'use client';

import { useSearchParams } from 'next/navigation';
import { useRef } from 'react';
import { useDefecationQuery } from '@/hooks';
import {
  DefecationAttempt,
  DefecationDetail,
  DefecationTime,
} from './_components/ui';
import type { DefecationDetailRef } from './_components/ui/defecation-detail';

export default function DefecationPage() {
  const searchParams = useSearchParams();
  const toiletRecordId = searchParams.get('toiletRecordId');

  console.log('🔍 DefecationPage - toiletRecordId:', toiletRecordId);

  const colorRef = useRef<HTMLDivElement>(null);
  const defecationDetailRef = useRef<DefecationDetailRef>(null);

  const { data, isLoading, error } = useDefecationQuery(
    toiletRecordId && toiletRecordId !== 'undefined'
      ? Number(toiletRecordId)
      : 0
  );

  console.log(
    '🔍 DefecationPage - data:',
    data,
    'isLoading:',
    isLoading,
    'error:',
    error
  );

  const handleOpenColorSection = () => {
    defecationDetailRef.current?.openColorSection();
  };

  const handleCloseColorSection = () => {
    defecationDetailRef.current?.closeColorSection();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 pt-17 pb-[156px] select-none">
      <div className="flex flex-col gap-3 text-start">
        <div className="mb-3">
          <DefecationTime data={data} />
        </div>

        <div className="mb-3">
          <DefecationAttempt
            data={data}
            colorRef={colorRef}
            onOpenColorSection={handleOpenColorSection}
            onCloseColorSection={handleCloseColorSection}
          />
        </div>

        <DefecationDetail
          ref={defecationDetailRef}
          colorRef={(el) => {
            colorRef.current = el;
          }}
          data={data}
        />
      </div>
    </div>
  );
}
