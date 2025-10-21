import type { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { useModal } from '@/hooks/useModal';
import { Button } from './Button';

interface ModalContentProps {
  onClose: () => void;
  onDelete: () => void;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalContent = ({ onClose, onDelete }: ModalContentProps) => {
  return (
    <>
      <div className="mb-7 flex-col">
        <h1 className="text-body1-m text-white text-center">
          기록을 삭제할까요?
        </h1>
        <p className="text-body4-r text-gray-400 text-center">
          한 번 삭제된 기록은 복구 할 수 없어요.
        </p>
      </div>
      <div className="flex gap-2">
        <Button className="!bg-gray-700 flex-1" onClick={onClose}>
          취소
        </Button>
        <Button
          className="bg-red-600 flex-1 hover:bg-red-600"
          onClick={onDelete}
        >
          삭제
        </Button>
      </div>
    </>
  );
};

export const Modal = ({
  isOpen,
  onClose,
  children,
}: PropsWithChildren<ModalProps>) => {
  const { dialogRef, targetContainer, onClickDialog } = useModal(
    isOpen,
    onClose
  );

  if (!targetContainer) {
    return null;
  }

  return createPortal(
    // biome-ignore lint/a11y/useKeyWithClickEvents: <Backdrop click is mouse-only>
    <dialog
      ref={dialogRef}
      onClick={onClickDialog}
      className="z-10 bg-transparent border-none "
    >
      <div className="fixed inset-0 bg-black/50" />
      {/* biome-ignore lint/a11y/noStaticElementInteractions lint/a11y/useKeyWithClickEvents: <This div is for event propagation stopping> */}
      <div
        className="pt-[1.875rem] pr-4 pl-4 pb-4  w-[19.375rem] rounded-[1.25rem] bg-gray-800 flex-col items-center justify-center fixed left-1/2 top-1/2
    -translate-x-1/2 -translate-y-1/2"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </dialog>,
    targetContainer
  );
};
