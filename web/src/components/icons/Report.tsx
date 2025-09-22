import { cn } from '@/utils/utils-cn';
import type { IconProps } from './icon.type';

export const ReportIcon = ({
  size = '24',
  className = '',
  ...props
}: IconProps) => {
  const DATA =
    'M18 0C19.1046 0 20 0.895431 20 2V18C20 19.1046 19.1046 20 18 20H2C0.895431 20 0 19.1046 0 18V2C0 0.895431 0.895431 0 2 0H18ZM4 8.52246C3.58579 8.52246 3.25 8.85825 3.25 9.27246C3.25 9.68667 3.58579 10.0225 4 10.0225H12C12.4142 10.0225 12.75 9.68667 12.75 9.27246C12.75 8.85825 12.4142 8.52246 12 8.52246H4ZM4 4.2373C3.58595 4.2373 3.25026 4.57234 3.25 4.98633C3.25 5.40054 3.58579 5.73633 4 5.73633L16 5.7373C16.4141 5.7373 16.7497 5.40129 16.75 4.9873C16.75 4.57309 16.4142 4.2373 16 4.2373H4Z';

  return (
    <svg
      role="img"
      aria-label="report"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={cn(className)}
      {...props}
    >
      <path d={DATA} fill={'currentColor'} />
    </svg>
  );
};
