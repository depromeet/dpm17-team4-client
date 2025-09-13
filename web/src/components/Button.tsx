import { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from 'react';

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
export const Button = ({
  children,
  size = '48',
  color = 'primary',
  leftIcon,
  rightIcon,
  disabled = false,
  fullWidth = false,
  className = '',
  ...rest
}: ButtonProps) => {
  const sizeClasses = {
    '56': 'py-[16px] px-[24px] text-button-2 rounded-[10px] gap-[4px]',
    '48': 'py-[15px] px-[20px] text-button-2 rounded-[10px] gap-[4px]',
    '40': 'py-[11px] px-[16px] text-button-2 rounded-[8px] gap-[4px]',
    '32': 'py-[8px] px-[12px] text-button-4 rounded-[7px] gap-[2px]',
    '24': 'py-[6px] px-[8px] text-button-4 rounded-[5px] gap-[2px]',
  };

  const colorClasses = {
    primary: disabled
      ? 'bg-[#523e98] text-[#FFFFFF66]'
      : 'bg-primary-600 text-white hover:bg-primary-800',
    secondary: disabled
      ? 'bg-gray-700 text-[#FFFFFF66]'
      : 'bg-gray-800 text-white hover:bg-gray-800',
  };

  const baseClasses = `inline-flex items-center justify-center disabled:cursor-not-allowed ${
    fullWidth ? 'w-full' : ''
  }`;

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      disabled={disabled}
      {...rest}
    >
      {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  );
};
