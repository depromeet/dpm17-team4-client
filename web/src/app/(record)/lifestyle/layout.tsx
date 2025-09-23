'use client';

import type { ReactNode } from 'react';
import { Navigator } from '@/components';

export default function LifestyleLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navigator title="생활 기록" />
      <div className="h-[56px]" />
      {children}
    </>
  );
}
