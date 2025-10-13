import type { ReactNode, SVGProps } from 'react';
import { cn } from '@/utils/utils-cn';

type SpeechBubbleProps = {
  children: ReactNode;
  className?: string;
  textClassName?: string;
} & Omit<SVGProps<SVGSVGElement>, 'children' | 'className'>;

export const SpeechBubbleIcon = ({
  children,
  className = '',
  textClassName = '',
  ...props
}: SpeechBubbleProps) => {
  const BUBBLE_PATH_DATA =
    'M68 0C76.2843 0 83 6.71573 83 15C83 23.2843 76.2843 30 68 30H45.958L43.502 33.7227C42.7905 34.8009 41.2095 34.8009 40.498 33.7227L38.042 30H15C6.71573 30 0 23.2843 0 15C0 6.71573 6.71573 0 15 0H68Z';

  return (
    <svg
      role="img"
      aria-label="speech-bubble"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 83 35"
      fill="none"
      className={cn('w-[83px] h-[35px]', className)}
      {...props}
    >
      <path d={BUBBLE_PATH_DATA} fill="#7850FB" />
      <text
        x="50%"
        y="45%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="white"
        className={cn('text-primary-100 text-body4-sb', textClassName)}
      >
        {children}
      </text>
    </svg>
  );
};
