'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import Check from '@/assets/my/check-primary.png';
import { BottomSheet } from '@/components/BottomSheet';

interface BirthYearSelectBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  currentYear: string;
  onYearSelect: (year: string) => void;
}

const BIRTH_YEAR_OPTIONS = Array.from({ length: 116 }, (_, i) => {
  const year = 2015 - i;
  return { value: year.toString(), label: year.toString() };
});

export const BirthYearSelectBottomSheet = ({
  isOpen,
  onClose,
  currentYear,
  onYearSelect,
}: BirthYearSelectBottomSheetProps) => {
  const handleYearSelect = (year: string) => {
    onYearSelect(year);
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="px-6 pb-6 h-[calc(100vh-80px)]">
        <div className="flex items-center justify-between mb-6 ">
          <h2 className="text-lg font-semibold text-white text-left">
            출생 연도를 선택해주세요
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="p-1 text-white"
          >
            <X className="w-[24px] h-[24px]" />
          </button>
        </div>
        <div className="max-h-full overflow-y-auto space-y-2">
          {BIRTH_YEAR_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleYearSelect(option.value)}
              className="w-full flex items-center justify-between py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <span
                className={`text-base ${
                  currentYear === option.value
                    ? 'text-primary-600'
                    : 'text-white'
                }`}
              >
                {option.label}
              </span>
              {currentYear === option.value && (
                <Image src={Check} alt="check" className="w-[18px]" />
              )}
            </button>
          ))}
        </div>
      </div>
    </BottomSheet>
  );
};
