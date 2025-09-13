import { cn } from '@/utils/utils-cn';
import type { IconProps } from './icon.type';

export const ChevronThinIcon = ({
  size = '20',
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
    'M16.4994 7.26071C16.7225 7.02947 16.7225 6.65466 16.4994 6.42343C16.2762 6.19219 15.9145 6.19219 15.6913 6.42343L10.0001 12.3206L4.30882 6.42343C4.08567 6.19219 3.72394 6.19219 3.50078 6.42343C3.27763 6.65466 3.27763 7.02947 3.50078 7.26071L9.59606 13.5766C9.81922 13.8078 10.1809 13.8078 10.4041 13.5766L16.4994 7.26071Z';

  return (
    <svg
      role="img"
      aria-label="chevron-thin"
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
