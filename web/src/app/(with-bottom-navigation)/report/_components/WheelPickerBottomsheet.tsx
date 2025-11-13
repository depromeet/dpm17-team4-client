'use client';

import {
  WheelPicker,
  type WheelPickerOption,
  WheelPickerWrapper,
} from '@ncdai/react-wheel-picker';
import { useEffect, useState } from 'react';
import { BottomSheet } from '@/components/BottomSheet';

type WheelProps = {
  isOpen: boolean;
  title: string;
  description: string;
  options: WheelPickerOption[];
  initialValue: string;
  onApply: (value: string) => void;
  onClose: () => void;
  applyLabel?: string;
};

export function WheelPickerBottomSheet({
  isOpen,
  title,
  description,
  options,
  initialValue,
  onApply,
  onClose,
  applyLabel = '확인',
}: WheelProps) {
  const fallbackValue = initialValue || options[0]?.value || '';
  const [value, setValue] = useState<string>(fallbackValue);

  useEffect(() => {
    if (isOpen) {
      setValue(fallbackValue);
    }
  }, [fallbackValue, isOpen]);

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="px-4 pb-8">
        <h3 className="text-body2-sb text-white text-left mb-[20px]">
          {title}
        </h3>
        <div className="text-body3-m text-gray-400 text-left mb-[20px]">
          {description}
        </div>
        <div className="relative max-h-[240px] overflow-hidden">
          <WheelPickerWrapper className="w-full !text-body1-m [&_[data-rwp-highlight-wrapper]]:!text-body1-m">
            <WheelPicker
              options={options}
              value={value}
              onValueChange={(val: string | number) => setValue(String(val))}
              optionItemHeight={34}
              classNames={{
                optionItem: 'text-gray-500 !text-body1-m',
                highlightWrapper:
                  'bg-[#292D32] !text-body1-m h-[34px] leading-[34px] rounded-[4px] text-white',
              }}
            />
          </WheelPickerWrapper>
        </div>
        <button
          type="button"
          onClick={() => onApply(value)}
          className="w-full mt-6 py-[19px] rounded-[10px] bg-primary-600 text-white text-button-2"
        >
          {applyLabel}
        </button>
      </div>
    </BottomSheet>
  );
}
