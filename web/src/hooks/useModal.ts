import { type RefObject, useEffect, useRef, useState } from 'react';
import { usePreventScroll } from './usePreventScroll';

interface UseModalReturn {
  dialogRef: RefObject<HTMLDialogElement | null>;
  targetContainer: HTMLElement | undefined;
  onClickDialog: (e: React.MouseEvent<HTMLDialogElement>) => void;
}

export const useModal = (
  isOpen: boolean,
  onClose: () => void
): UseModalReturn => {
  usePreventScroll(isOpen);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const [targetContainer, setTargetContainer] = useState<HTMLElement>();

  useEffect(() => {
    setTargetContainer(document.getElementById('modal-root') as HTMLElement);
  }, []);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);
  const onClickDialog = (e: React.MouseEvent<HTMLDialogElement>) => {
    onClose();
  };

  return { dialogRef, targetContainer, onClickDialog };
};
