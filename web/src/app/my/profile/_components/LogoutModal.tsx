'use client';

import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { useLogout } from '@/hooks';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoutModal = ({ isOpen, onClose }: LogoutModalProps) => {
  const { handleLogout } = useLogout();

  const handleLogoutClick = () => {
    handleLogout();
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="mb-7 flex-col">
        <h1 className="text-body1-m text-white text-center">
          로그아웃하시겠어요?
        </h1>
      </div>
      <div className="flex gap-2">
        <Button className="!bg-gray-700 flex-1" onClick={onClose}>
          취소
        </Button>
        <Button
          className="bg-primary-600 flex-1 hover:bg-primary-800"
          onClick={handleLogoutClick}
        >
          로그아웃
        </Button>
      </div>
    </Modal>
  );
};
