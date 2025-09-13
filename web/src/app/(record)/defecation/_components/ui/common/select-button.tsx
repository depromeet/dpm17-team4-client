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
        'rounded-lg',
        {
          'bg-[#454551]': !isSelected,
          'bg-[#5170FF]/50 border-[1px] border-[#5170FF]': isSelected,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
