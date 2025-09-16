'use client';

import type { ComponentProps } from 'react';
import { cn } from '@/utils/utils-cn';

interface SelectButtonProps extends Omit<ComponentProps<'button'>, 'type'> {
  isSelected: boolean;
  children: React.ReactNode;
}

export function SelectButton({
  isSelected,
  children,
  className,
  ...props
}: SelectButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'rounded-xl',
        {
          'bg-gray-700': !isSelected,
          'bg-primary-500/30 border-[1px] border-primary-600': isSelected,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
