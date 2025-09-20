'use client';

import { useState } from 'react';
import { cn } from '@/utils/utils-cn';

type SwitchProps = {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
};

export function Switch({
  checked: controlledChecked,
  onCheckedChange,
  className,
}: SwitchProps) {
  const [internalChecked, setInternalChecked] = useState(false);

  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const handleClick = () => {
    const newChecked = !checked;
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    onCheckedChange?.(newChecked);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={handleClick}
      className={cn(
        'peer inline-flex h-5 w-9 p-[3px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
        checked ? 'bg-primary-500' : 'bg-gray-600',
        className
      )}
      style={{
        minHeight: '24px !important',
        minWidth: '42px !important',
      }}
    >
      <span
        className={cn(
          'pointer-events-none block h-4.5 w-4.5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-300',
          checked ? 'translate-x-[15px]' : 'translate-x-0'
        )}
      />
    </button>
  );
}
