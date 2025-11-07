import { cn } from '@/utils/utils-cn';
import type { IconProps } from './icon.type';

export const PlayIcon = ({
  size = '24',
  className = '',
  type = 'right',
  ...props
}: { type?: 'right' | 'left' } & IconProps) => {
  const rotationClasses: Record<typeof type, string> = {
    right: 'rotate-0',
    left: 'rotate-180',
  };

  const DATA = 'M8 5.14v13.72L19 12L8 5.14z';

  return (
    <svg
      role="img"
      aria-label="play"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn(
        'transition-transform duration-300',
        rotationClasses[type],
        className
      )}
      {...props}
    >
      <path d={DATA} fill="currentColor" />
    </svg>
  );
};
