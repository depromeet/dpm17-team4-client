import type { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import { forwardRef } from 'react';

interface ButtonProps
  extends PropsWithChildren,
    ButtonHTMLAttributes<HTMLButtonElement> {
  size?: '56' | '48' | '40' | '32' | '24';
  color?: 'primary' | 'secondary';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

/**
 * @param size
 * @param color
 * @param leftIcon
 * @param rightIcon
 * @param disabled
 * @param fullWidth
 * @returns
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      size = '48',
      color = 'primary',
      leftIcon,
      rightIcon,
      disabled = false,
      fullWidth = false,
      className = '',
      ...rest
    },
    ref
  ) => {
    const sizeClasses = {
      '56': 'py-[19px] px-6 text-button-2 rounded-[0.625rem] gap-1',
      '48': 'py-[0.9375rem] px-5 text-button-2 rounded-[0.625rem] gap-1',
      '40': 'py-[0.6875rem] px-4 text-button-2 rounded-[0.5rem] gap-1',
      '32': 'py-2 px-3 text-button-4 rounded-[0.4375rem] gap-0.5',
      '24': 'py-[0.375rem] px-2 text-button-4 rounded-[0.3125rem] gap-0.5',
    };

    const colorClasses = {
      primary: disabled
        ? 'bg-[#523e98] text-[#FFFFFF66]'
        : 'bg-primary-600 text-white hover:bg-primary-800',
      secondary: disabled
        ? 'bg-gray-700 text-[#FFFFFF66]'
        : 'bg-gray-800 text-white hover:bg-gray-800',
    };

    const baseClasses = `inline-flex items-center justify-center disabled:cursor-not-allowed focus:outline-none focus-visible:outline-none ${
      fullWidth ? 'w-full' : ''
    }`;

    return (
      <button
        ref={ref}
        type="button"
        className={`${baseClasses} ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
        disabled={disabled}
        {...rest}
      >
        {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
