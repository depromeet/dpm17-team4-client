'use client';
interface ToggleProps {
  isOn: boolean;
  onSwitch: () => void;
}

export const Toggle = ({ isOn, onSwitch }: ToggleProps) => {
  const containerClass = isOn ? 'bg-primary-500' : 'bg-gray-600';
  const switchClass = isOn ? 'translate-x-[18px]' : '';

  return (
    <div
      className={`w-[42px] h-6 rounded-[10rem] px-[3px] py-[3px] relative flex items-center transition-colors duration-300 ${containerClass}`}
    >
      <div
        className={`bg-white w-[18px] h-[18px] rounded-full absolute shadow-md transform transition-transform duration-300 ${switchClass}`}
        onClick={onSwitch}
      />
    </div>
  );
};
