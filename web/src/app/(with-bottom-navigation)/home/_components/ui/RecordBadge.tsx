import Image from 'next/image';
import type React from 'react';

interface RecordBadgeProps {
  icon: string;
  recordCounts: number;
  children: React.ReactNode;
}

export function RecordBadge({
  icon,
  recordCounts,
  children,
}: RecordBadgeProps) {
  return (
    <div className="rounded-full py-1.5 px-3 text-body4-m flex gap-1 bg-black/20">
      <Image src={icon} alt="기록 심볼" width={18} height={18} />
      <div>{children}</div>
      <div>{recordCounts}</div>
    </div>
  );
}
