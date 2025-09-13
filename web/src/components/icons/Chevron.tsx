import { cn } from '@/utils/utils-cn';
import type { IconProps } from './icon.type';

export const ChevronIcon = ({
  size = '20',
  strokeWidth = '0.4',
  className = '',
  type = 'down',
  ...props
}: { type: 'right' | 'left' | 'up' | 'down' } & IconProps) => {
  const rotationClasses: Record<typeof type, string> = {
    right: '-rotate-90',
    left: 'rotate-90',
    up: 'rotate-180',
    down: 'rotate-0',
  };

  // NOTE(taehyeon): 벡터 데이터
  const DATA =
    'M13.1994 5.80857C13.3779 5.62358 13.3779 5.32373 13.1994 5.13874C13.0208 4.95375 12.7315 4.95375 12.5529 5.13874L7.99992 9.85652L3.44691 5.13874C3.26839 4.95375 2.97901 4.95375 2.80048 5.13874C2.62195 5.32373 2.62195 5.62358 2.80048 5.80857L7.6767 10.8613C7.85523 11.0462 8.14461 11.0462 8.32313 10.8613L13.1994 5.80857Z';

  return (
    <svg
      role="img"
      aria-label="chevron"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={cn(
        'transition-transform duration-300',
        rotationClasses[type],
        className
      )}
      {...props}
    >
      <path
        d={DATA}
        fill={'currentColor'}
        stroke={'currentColor'}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
