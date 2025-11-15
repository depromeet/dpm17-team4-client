import Image, { type StaticImageData } from 'next/image';
import type { ButtonHTMLAttributes } from 'react';

type RecordButtonProps = {
  title: string;
  subtitle: string;
  icon: string | StaticImageData;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>;

const RecordButton = ({
  title,
  subtitle,
  icon,
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
        <div className="text-body1-sb text-white">{subtitle}</div>
        <div className="flex justify-end">
          <Image src={icon} alt="아이콘" width={36} height={36} />
        </div>
      </div>
    </button>
  );
};

export default RecordButton;
