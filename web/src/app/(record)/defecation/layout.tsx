'use client';

import type { ReactNode } from 'react';
import { Navigator } from '@/components';
import { DefecationProvider } from './_components/providers/defecation-providers';
import { DefecationSubmit } from './_components/ui';

export default function DefecationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <DefecationProvider>
      <Navigator title="배변 기록" />
      {children}
      <DefecationSubmit />
    </DefecationProvider>
  );
}
