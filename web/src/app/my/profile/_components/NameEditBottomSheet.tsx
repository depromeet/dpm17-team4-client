'use client';

import { XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BottomSheet } from '@/components/BottomSheet';

interface NameEditBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  onNameChange: (name: string) => void;
}

const MAX_NAME_LENGTH = 9;

export const NameEditBottomSheet = ({
  isOpen,
  onClose,
  currentName,
  onNameChange,
}: NameEditBottomSheetProps) => {
  const [name, setName] = useState(currentName);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setName(currentName);
    }
  }, [isOpen, currentName]);

  useEffect(() => {
    setIsValid(name.length >= 1 && name.length <= MAX_NAME_LENGTH);
  }, [name]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_NAME_LENGTH) {
      setName(value);
    }
  };

  const handleClear = () => {
    setName('');
  };

  const handleSave = () => {
    if (isValid && name.trim()) {
      onNameChange(name.trim());
      onClose();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isValid && name.trim()) {
      handleSave();
    }
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="px-6 pb-6">
        <h2 className="text-lg font-semibold text-white mb-6 text-left">
          변경할 이름을 입력해주세요
        </h2>

        <div className="space-y-4">
          {/* Input Field */}
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              onKeyPress={handleKeyPress}
              placeholder="이름을 입력하세요"
              className="w-full px-4 py-3 border-b border-gray-600  text-white placeholder-gray-400"
            />
            {name && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors flex items-center justify-center bg-gray-600 rounded-full w-[1.5rem] h-[1.5rem]"
              >
                <XIcon className="w-[1rem] h-[1rem] text-gray-200" />
              </button>
            )}
          </div>

          {/* Character Count */}
          <div className="text-right">
            <span className="text-sm text-gray-400">
              {name.length}/{MAX_NAME_LENGTH}
            </span>
          </div>

          {/* Save Button */}
          <button
            type="button"
            onClick={handleSave}
            disabled={!isValid || !name.trim()}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              isValid && name.trim()
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            완료
          </button>
        </div>
      </div>
    </BottomSheet>
  );
};
