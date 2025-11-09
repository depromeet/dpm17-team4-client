import type { IconProps } from './icon.type';

export const InfoIcon = ({
  size = '20',
  className = '',
  ...props
}: IconProps) => {
  return (
    <svg
      role="img"
      aria-label="info"
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M14.7115 9C14.7115 5.8456 12.1544 3.28846 9 3.28846C5.8456 3.28846 3.28846 5.8456 3.28846 9C3.28846 12.1544 5.8456 14.7115 9 14.7115C12.1544 14.7115 14.7115 12.1544 14.7115 9ZM15.75 9C15.75 12.7279 12.7279 15.75 9 15.75C5.27208 15.75 2.25 12.7279 2.25 9C2.25 5.27208 5.27208 2.25 9 2.25C12.7279 2.25 15.75 5.27208 15.75 9Z"
        fill="#99A1B1"
      />
      <path
        d="M8.4375 12.75L8.4375 7.5C8.4375 7.18934 8.68934 6.9375 9 6.9375C9.31066 6.9375 9.5625 7.18934 9.5625 7.5L9.5625 12.75C9.5625 13.0607 9.31066 13.3125 9 13.3125C8.68934 13.3125 8.4375 13.0607 8.4375 12.75Z"
        fill="#99A1B1"
      />
      <path
        d="M9 5.25H9.0001"
        stroke="#99A1B1"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
