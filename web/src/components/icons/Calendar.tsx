import { cn } from '@/utils/utils-cn';
import type { IconProps } from './icon.type';

export const CalendarIcon = ({
  size = '24',
  className = '',
  ...props
}: IconProps) => {
  const DATA1 =
    'M3.5 3.83691V1.61426C3.5 1.20004 3.83579 0.864258 4.25 0.864258C4.66421 0.864258 5 1.20004 5 1.61426V3.83691C4.99977 4.25093 4.66407 4.58691 4.25 4.58691C3.83593 4.58691 3.50023 4.25093 3.5 3.83691Z';

  const DATA2 =
    'M15 3.83691V1.61426C15 1.20004 15.3358 0.864258 15.75 0.864258C16.1642 0.864258 16.5 1.20004 16.5 1.61426V3.83691C16.4998 4.25093 16.1641 4.58691 15.75 4.58691C15.3359 4.58691 15.0002 4.25093 15 3.83691Z';

  const DATA3 =
    'M0 9.40546C0 9.36157 0.0381384 9.32812 0.0820312 9.32812H19.9346C19.9698 9.32812 20 9.35453 20 9.38979V19C20 20.1046 19.1046 21 18 21H2C0.895431 21 0 20.1046 0 19V9.40546ZM20 7.76554C20 7.80077 19.9698 7.82812 19.9346 7.82812H0.0820312C0.0381662 7.82812 0 7.79373 0 7.74987V5C0 3.89543 0.895431 3 2 3H18C19.1046 3 20 3.89543 20 5V7.76554Z';

  return (
    <svg
      role="img"
      aria-label="calendar"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 21"
      fill="none"
      className={cn(className)}
      {...props}
    >
      <path d={DATA1} fill={'currentColor'} />
      <path d={DATA2} fill={'currentColor'} />
      <path d={DATA3} fill={'currentColor'} />
    </svg>
  );
};
