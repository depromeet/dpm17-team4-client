'use client';

import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { EVENT_KEYS } from '@/constants';

interface BottomSheetProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
}

export const BottomSheet = ({
  isOpen,
  onClose,
  children,
}: BottomSheetProps) => {
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = () => {
    onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end"
      onKeyDown={(e) => {
        if (e.key === EVENT_KEYS.ESCAPE) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={handleBackdropClick}
        role="presentation"
        aria-hidden="true"
      />

      {/* Bottom Sheet */}
      <div
        className={`relative w-full h-fit bg-gray-800 rounded-t-[1.25rem] transform transition-transform duration-300 ease-out`}
        style={{
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
        }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-[0.75rem] pb-[0.5rem]">
          <div className="w-[2.5rem] h-[0.25rem] bg-gray-300 rounded-full" />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>,
    document.body
  );
};
