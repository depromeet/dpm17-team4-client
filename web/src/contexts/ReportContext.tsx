'use client';

import { BackgroundColor } from '@/app/(with-bottom-navigation)/report/daily/types';
import { createContext, type ReactNode, useContext, useState } from 'react';

interface ReportContextValue {
  hasPooData: boolean;
  backgroundColor: BackgroundColor;
  setHasPooData: (value: boolean) => void;
  setBackgroundColor: (value: BackgroundColor) => void;
}

const ReportContext = createContext<ReportContextValue | undefined>(undefined);

export function ReportProvider({ children }: { children: ReactNode }) {
  const [hasPooData, setHasPooData] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState<BackgroundColor>('VERY_BAD');

  return (
    <ReportContext.Provider
      value={{ hasPooData, backgroundColor, setHasPooData, setBackgroundColor }}
    >
      {children}
    </ReportContext.Provider>
  );
}

export function useReportContext() {
  const context = useContext(ReportContext);
  if (context === undefined) {
    throw new Error('useReportContext must be used within ReportProvider');
  }
  return context;
}
