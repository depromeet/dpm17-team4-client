'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import Check from '@/assets/my/check-primary.png';
import { BottomSheet } from '@/components/BottomSheet';

interface GenderSelectBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  currentGender: string;
  onGenderSelect: (gender: string) => void;
}

const GENDER_OPTIONS = [
  { value: 'male', label: '남성' },
  { value: 'female', label: '여성' },
  // { value: 'none', label: '선택 안 함' }, // 개발 중 - 선택안함 옵션 제거
];

export const GenderSelectBottomSheet = ({
  isOpen,
  onClose,
  currentGender,
  onGenderSelect,
}: GenderSelectBottomSheetProps) => {
  const handleGenderSelect = (gender: string) => {
    onGenderSelect(gender);
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between mb-6 ">
          <h2 className="text-lg font-semibold text-white text-left">
            성별을 선택해주세요
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

        <div className="space-y-4">
          {GENDER_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleGenderSelect(option.value)}
              className="w-full flex items-center justify-between py-[4px] rounded-lg hover:bg-gray-700 transition-colors"
            >
              <span
                className={`text-base ${
                  currentGender === option.value
                    ? 'text-primary-600'
                    : 'text-white'
                }`}
              >
                {option.label}
              </span>
              {currentGender === option.value && (
                <Image src={Check} alt="check" className="w-[18px]" />
              )}
            </button>
          ))}
        </div>
      </div>
    </BottomSheet>
  );
};
