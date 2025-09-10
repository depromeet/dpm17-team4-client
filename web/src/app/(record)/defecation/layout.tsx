'use client';

import { DefecationProvider } from './_components/providers/defecation-providers';

export default function DefecationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DefecationProvider>{children}</DefecationProvider>;
}
