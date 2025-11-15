import { cn } from '@/utils/utils-cn';
import type { IconProps } from './icon.type';

export const XIcon = ({ size = '24', className = '', ...props }: IconProps) => {
  return (
    <svg
      role="img"
      aria-label="x"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn(className)}
      {...props}
    >
      <path
        d="M18.7302 5.26978C19.0899 5.62949 19.0899 6.2127 18.7302 6.5724L13.3026 12L18.7302 17.4276C19.0899 17.7873 19.0899 18.3705 18.7302 18.7302C18.3705 19.0899 17.7873 19.0899 17.4276 18.7302L12 13.3026L6.5724 18.7302C6.2127 19.0899 5.62949 19.0899 5.26978 18.7302C4.91007 18.3705 4.91007 17.7873 5.26978 17.4276L10.6974 12L5.26978 6.5724C4.91007 6.2127 4.91007 5.62949 5.26978 5.26978C5.62949 4.91007 6.2127 4.91007 6.5724 5.26978L12 10.6974L17.4276 5.26978C17.7873 4.91007 18.3705 4.91007 18.7302 5.26978Z"
        fill="white"
      />
    </svg>
  );
};
