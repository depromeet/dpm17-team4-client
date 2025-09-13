'use client';

import type { ReactNode } from 'react';
import { DefecationProvider } from './_components/providers/defecation-providers';

export default function DefecationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <DefecationProvider>{children}</DefecationProvider>;
}
