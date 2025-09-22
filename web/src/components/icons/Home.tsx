import { cn } from '@/utils/utils-cn';
import type { IconProps } from './icon.type';

export const HomeIcon = ({
  size = '24',
  className = '',
  ...props
}: IconProps) => {
  const DATA =
    'M10.5781 2.47798C11.4252 1.85399 12.5802 1.85438 13.4268 2.47896L21.0244 8.0854C21.6377 8.53788 22.0001 9.25492 22 10.017L21.999 19.5903C21.9988 20.9156 20.924 21.9897 19.5986 21.9897H16.0926C15.4298 21.9897 14.8926 21.4524 14.8926 20.7897V18.5942C14.8926 17.9551 14.3744 17.437 13.7354 17.437H10.2637C9.62454 17.437 9.10645 17.9551 9.10645 18.5942V20.7897C9.10645 21.4524 8.56919 21.9897 7.90645 21.9897H4.40039C3.07505 21.9897 2.00024 20.9156 2 19.5903V10.0112C2 9.24853 2.36255 8.53092 2.97656 8.07857L10.5781 2.47798Z';

  return (
    <svg
      role="img"
      aria-label="home"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn(className)}
      {...props}
    >
      <path d={DATA} fill={'currentColor'} />
    </svg>
  );
};
