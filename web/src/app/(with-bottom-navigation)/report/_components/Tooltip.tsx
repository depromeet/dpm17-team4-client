export const Tooltip = ({ value }: { value: number }) => {
  const calculateValue = value > 2000.0 ? '2L 이상' : `${value}ml`;
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex h-7.5 rounded-[66px] bg-white/12 px-3 py-1.5 shadow-tooltip backdrop-blur-sm">
        <p className="text-body4-sb text-white text-center whitespace-nowrap">
          {calculateValue}
        </p>
      </div>
      <svg
        role="img"
        aria-label="tooltip"
        width="10"
        height="8"
        viewBox="0 0 10 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.152 6.6432C4.54367 7.26987 5.45633 7.26987 5.848 6.6432L10 0H0L4.152 6.6432Z"
          fill="white"
          fillOpacity="0.12"
        />
      </svg>
    </div>
  );
};
