'use client';

import { Check } from 'lucide-react';
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
  { value: 'none', label: '선택 안 함' },
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
        <h2 className="text-lg font-semibold text-white mb-6 text-left">
          성별을 선택해주세요
        </h2>

        <div className="space-y-4">
          {GENDER_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleGenderSelect(option.value)}
              className="w-full flex items-center justify-between py-4 rounded-lg hover:bg-gray-700 transition-colors"
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
                <Check className="w-5 h-5 text-primary-600" />
              )}
            </button>
          ))}
        </div>
      </div>
    </BottomSheet>
  );
};
