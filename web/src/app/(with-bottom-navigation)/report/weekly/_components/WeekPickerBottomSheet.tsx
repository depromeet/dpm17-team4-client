'use client';

import {
  WheelPicker,
  type WheelPickerOption,
  WheelPickerWrapper,
} from '@ncdai/react-wheel-picker';
import { useEffect, useState } from 'react';
import { BottomSheet } from '@/components/BottomSheet';

type WeekPickerBottomSheetProps = {
  isOpen: boolean;
  title: string;
  options: WheelPickerOption[];
  initialValue: string;
  onApply: (value: string) => void;
  onClose: () => void;
  applyLabel?: string;
};

export function WeekPickerBottomSheet({
  isOpen,
  title,
  options,
  initialValue,
  onApply,
  onClose,
  applyLabel = '확인',
}: WeekPickerBottomSheetProps) {
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
        <div className="relative max-h-[240px] overflow-hidden">
          <WheelPickerWrapper className="w-full text-body1-m [&>.wheel-picker]:py-12">
            <WheelPicker
              options={options}
              value={value}
              onValueChange={(val: string | number) => setValue(String(val))}
              classNames={{
                optionItem: 'text-gray-500 text-body1-m',
                highlightWrapper:
                  'bg-[#292D32] text-body1-m h-[34px] leading-[34px]',
              }}
            />
          </WheelPickerWrapper>
        </div>
        <button
          type="button"
          onClick={() => onApply(value)}
          className="w-full mt-6 py-[14px] rounded-[10px] bg-primary-600 text-white text-button-2"
        >
          {applyLabel}
        </button>
      </div>
    </BottomSheet>
  );
}
