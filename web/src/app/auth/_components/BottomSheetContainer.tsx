'use client';

import { useState } from 'react';
import TermsAgreementBottomSheet from './TermsAgreementBottomSheet';
import TermsContentBottomSheet from './TermsContentBottomSheet';

export type BottomSheetType = 'terms-agreement' | 'terms-content';
export type TermsContentType = 'service' | 'privacy-policy';

interface BottomSheetContainerProps {
  isOpen: boolean;
  onClose: () => void;
  onAgree: () => void;
}

export default function BottomSheetContainer({
  isOpen,
  onClose,
  onAgree,
}: BottomSheetContainerProps) {
  const [bottomSheetType, setBottomSheetType] =
    useState<BottomSheetType>('terms-agreement');
  const [termsContentType, setTermsContentType] =
    useState<TermsContentType>('service');

  const handleTermsAgree = () => {
    //TODO: 약관 동의한 이후에 알림 바텀싯
    setBottomSheetType('terms-agreement');
    onAgree();
  };

  const handleNavigateToService = () => {
    setTermsContentType('service');
    setBottomSheetType('terms-content');
  };

  const handleNavigateToPrivacy = () => {
    setTermsContentType('privacy-policy');
    setBottomSheetType('terms-content');
  };

  const handleNavigateToTermsAgreement = () => {
    setBottomSheetType('terms-agreement');
  };

  return (
    <>
      {bottomSheetType === 'terms-agreement' && (
        <TermsAgreementBottomSheet
          isOpen={isOpen}
          onClose={onClose}
          onAgree={handleTermsAgree}
          onNavigateToService={handleNavigateToService}
          onNavigateToPrivacy={handleNavigateToPrivacy}
        />
      )}
      {bottomSheetType === 'terms-content' && (
        <TermsContentBottomSheet
          isOpen={isOpen}
          onClose={handleNavigateToTermsAgreement}
          onBack={handleNavigateToTermsAgreement}
          type={termsContentType}
        />
      )}
    </>
  );
}
