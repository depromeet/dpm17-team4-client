'use client';

import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { BottomSheet } from '@/components/BottomSheet';

interface TermsAgreementBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onAgree: () => void;
  onNavigateToService?: () => void;
  onNavigateToPrivacy?: () => void;
}

export default function TermsAgreementBottomSheet({
  isOpen,
  onClose,
  onAgree,
  onNavigateToService,
  onNavigateToPrivacy,
}: TermsAgreementBottomSheetProps) {
  const [allAgreed, setAllAgreed] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  const handleAllAgree = () => {
    const newAllAgreed = !allAgreed;
    setAllAgreed(newAllAgreed);
    setTermsAgreed(newAllAgreed);
    setPrivacyAgreed(newAllAgreed);
  };

  const handleTermsAgree = () => {
    const newTermsAgreed = !termsAgreed;
    setTermsAgreed(newTermsAgreed);
    if (newTermsAgreed && privacyAgreed) {
      setAllAgreed(true);
    } else {
      setAllAgreed(false);
    }
  };

  const handlePrivacyAgree = () => {
    const newPrivacyAgreed = !privacyAgreed;
    setPrivacyAgreed(newPrivacyAgreed);
    if (termsAgreed && newPrivacyAgreed) {
      setAllAgreed(true);
    } else {
      setAllAgreed(false);
    }
  };

  const handleNext = () => {
    if (termsAgreed && privacyAgreed) {
      onAgree();
    }
  };

  const handleTermsClick = () => {
    if (onNavigateToService) {
      onNavigateToService();
    }
  };

  const handlePrivacyClick = () => {
    if (onNavigateToPrivacy) {
      onNavigateToPrivacy();
    }
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        {/* Title */}
        <h2 className="text-white text-xl font-bold mb-2">약관 동의</h2>
        <p className="text-gray-400 text-sm mb-6">
          서비스 이용을 위해 약관에 동의해 주세요
        </p>

        {/* Agreement Options */}
        <div className="space-y-4 mb-8">
          {/* All Agree */}
          <button
            type="button"
            className="flex items-center justify-between p-4 bg-[#3C414999] rounded-[8px] cursor-pointer border-[1px] border-[#FFFFFF1A] w-full text-left"
            onClick={handleAllAgree}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  allAgreed
                    ? 'bg-primary-600 border-primary-600'
                    : 'border-gray-400'
                }`}
              >
                {allAgreed && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    role="img"
                    aria-label="체크 표시"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <span className="text-white font-medium">
                모든 약관에 동의합니다.
              </span>
            </div>
          </button>

          {/* Terms of Service */}
          <div className="flex items-center justify-between pl-4 w-full">
            <button
              type="button"
              className="flex items-center space-x-3 cursor-pointer text-left flex-1"
              onClick={handleTermsAgree}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  termsAgreed
                    ? 'bg-primary-600 border-primary-600'
                    : 'border-gray-400'
                }`}
              >
                {termsAgreed && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    role="img"
                    aria-label="체크 표시"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <span className="text-white">
                이용약관 동의 <span className="text-primary-400">(필수)</span>
              </span>
            </button>
            <button
              type="button"
              onClick={handleTermsClick}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Privacy Policy */}
          <div className="flex items-center justify-between pl-4 w-full">
            <button
              type="button"
              className="flex items-center space-x-3 cursor-pointer text-left flex-1"
              onClick={handlePrivacyAgree}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  privacyAgreed
                    ? 'bg-primary-600 border-primary-600'
                    : 'border-gray-400'
                }`}
              >
                {privacyAgreed && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    role="img"
                    aria-label="체크 표시"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <span className="text-white">
                개인정보처리방침 동의{' '}
                <span className="text-primary-400">(필수)</span>
              </span>
            </button>
            <button
              type="button"
              onClick={handlePrivacyClick}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          disabled={!termsAgreed || !privacyAgreed}
          className={`w-full py-4 rounded-lg font-medium transition-colors ${
            termsAgreed && privacyAgreed
              ? 'bg-primary-600 text-white'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          다음
        </button>
      </div>
    </BottomSheet>
  );
}
