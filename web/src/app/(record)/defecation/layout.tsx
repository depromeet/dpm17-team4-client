'use client';

import { type ReactNode, Suspense } from 'react';
import { DefecationProvider } from './_components/providers/defecation-providers';
import { DefecationSubmit } from './_components/ui';
import { DefecationNavigator } from './_components/ui/common/defecation-navigator';

export default function DefecationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="px-[4.78rem] py-[1.25rem] text-h3 text-white text-center">
          로딩 중...
        </div>
      }
    >
      <DefecationProvider>
        <DefecationNavigator />
        {children}
        <DefecationSubmit />
      </DefecationProvider>
    </Suspense>
  );
}
