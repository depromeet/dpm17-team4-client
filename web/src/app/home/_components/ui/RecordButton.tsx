import Image from 'next/image';
import type { ButtonHTMLAttributes } from 'react';
import poopIcon from '@/assets/home/poop.svg';

type RecordButtonProps = {
  title: string;
  subtitle: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>;

const RecordButton = ({
  title,
  subtitle,
  ...buttonProps
}: RecordButtonProps) => {
  return (
    <button
      className="flex items-start bg-gray-800 flex-1 p-[1.12rem] rounded-[0.875rem] text-body3-r cursor-pointer"
      type="button"
      {...buttonProps}
    >
      <div className="text-left flex flex-col flex-1">
        <div className="text-gray-400">{title}</div>
        <div className="text-body1-sb">{subtitle}</div>
        <div className="flex justify-end">
          <Image src={poopIcon} alt="poop 아이콘" />
        </div>
      </div>
    </button>
  );
};

export default RecordButton;
