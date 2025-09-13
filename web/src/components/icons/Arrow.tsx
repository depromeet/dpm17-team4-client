import { cn } from '@/utils/utils-cn';
import type { IconProps } from './icon.type';

export const ArrowIcon = ({
  size = '20',
  className = '',
  type = 'down',
  ...props
}: { type: 'right' | 'left' | 'up' | 'down' } & IconProps) => {
  const rotationClasses: Record<typeof type, string> = {
    right: 'rotate-180',
    left: 'rotate-0',
    up: 'rotate-90',
    down: '-rotate-90',
  };

  // NOTE(taehyeon): 벡터 데이터
  const DATA =
    'M10.4697 5.46967C10.7626 5.17678 11.2374 5.17678 11.5303 5.46967C11.8231 5.76257 11.8232 6.23733 11.5303 6.53022L6.81055 11.2499H19C19.4142 11.2499 19.75 11.5857 19.75 11.9999C19.75 12.4141 19.4142 12.7499 19 12.7499H6.81055L11.5303 17.4697C11.8231 17.7626 11.8232 18.2373 11.5303 18.5302C11.2374 18.8231 10.7626 18.8231 10.4697 18.5302L4.46973 12.5302C4.43771 12.4982 4.40978 12.4636 4.38477 12.4277C4.35404 12.3836 4.32743 12.3364 4.30664 12.2861C4.28591 12.2358 4.27105 12.1837 4.26172 12.1308C4.25423 12.0883 4.25 12.0446 4.25 11.9999C4.25 11.9546 4.25402 11.9102 4.26172 11.8671C4.27081 11.8163 4.28505 11.7662 4.30469 11.7177L4.30859 11.708C4.32018 11.6806 4.33596 11.6554 4.35059 11.6298C4.38303 11.573 4.42122 11.5182 4.46973 11.4697L10.4697 5.46967Z';

  return (
    <svg
      role="img"
      aria-label="arrow"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
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
