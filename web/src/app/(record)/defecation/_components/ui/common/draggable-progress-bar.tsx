'use client';

import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/utils/utils-cn';
import { useDragProgress } from '../../hooks/useDragProgress';

type DraggableProgressBarProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'onChange'
> & {
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
};

export function DraggableProgressBar({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  className,
  ...rest
}: DraggableProgressBarProps) {
  const { progressBarRef, percentage, handleMouseDown, handleTouchStart } =
    useDragProgress({
      min,
      max,
      step,
      value,
      onChange,
    });

  return (
    <div
      className={cn(
        'relative h-7.5 w-full cursor-pointer touch-none rounded-full bg-gradient-to-r from-[#78E884] to-[#FF5555]',
        className
      )}
      {...rest}
    >
      <div
        role="progressbar"
        ref={progressBarRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className="relative mx-auto h-full w-77"
      >
        <div
          style={{
            left: `calc(${percentage}% - (${percentage / 100} * 1.375rem))`,
          }}
          className="absolute top-1/2 h-5.5 w-5.5 -translate-y-1/2 rounded-full bg-white"
        />
      </div>
    </div>
  );
}
