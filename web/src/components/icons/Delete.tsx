import type { IconProps } from './icon.type';

export const DeleteIcon = ({
  size = '24',
  className = '',
  ...props
}: IconProps) => (
  <svg
    role="img"
    aria-label="circle-delete"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <circle cx="12" cy="12" r="10" fill="currentColor" />
    <path
      d="M15.2719 7.79349C15.5299 7.53544 15.9484 7.5355 16.2065 7.79349C16.4646 8.05161 16.4646 8.47003 16.2065 8.72816L12.9343 11.9995L16.2065 15.2717C16.4646 15.5298 16.4646 15.9483 16.2065 16.2064C15.9484 16.4645 15.53 16.4645 15.2719 16.2064L11.9996 12.9342L8.72829 16.2064C8.47016 16.4645 8.05174 16.4645 7.79362 16.2064C7.53562 15.9483 7.53556 15.5298 7.79362 15.2717L11.065 11.9995L7.79362 8.72816C7.53572 8.47001 7.53557 8.05155 7.79362 7.79349C8.05168 7.53548 8.47016 7.5356 8.72829 7.79349L11.9996 11.0648L15.2719 7.79349Z"
      fill="white"
    />
  </svg>
);
