import { cn } from '@/utils/utils-cn';
import type { IconProps } from './icon.type';

export const UserIcon = ({
  size = '24',
  className = '',
  ...props
}: IconProps) => {
  const DATA1 =
    'M10.0001 -0.000244141C12.5958 -0.000149051 14.7003 2.10427 14.7003 4.69995C14.7002 7.29554 12.5957 9.40005 10.0001 9.40015C7.40445 9.40015 5.30003 7.2956 5.29993 4.69995C5.29993 2.10421 7.40438 -0.000244141 10.0001 -0.000244141Z';

  const DATA2 =
    'M19.5345 17.6168C19.7757 18.8518 18.83 20.0001 17.5716 20.0001H2.42841C1.17 20.0001 0.224278 18.8518 0.465504 17.6168L0.830106 15.75C1.38031 12.933 3.84857 10.9001 6.71884 10.9001H13.2812C16.1514 10.9001 18.6197 12.933 19.1699 15.75L19.5345 17.6168Z';

  return (
    <svg
      role="img"
      aria-label="user"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={cn(className)}
      {...props}
    >
      <path d={DATA1} fill={'currentColor'} />
      <path d={DATA2} fill={'currentColor'} />
    </svg>
  );
};
