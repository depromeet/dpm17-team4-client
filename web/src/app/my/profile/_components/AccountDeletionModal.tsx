'use client';

import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { useUserDeleteMutation } from '@/hooks';

interface AccountDeletionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountDeletionModal = ({
  isOpen,
  onClose,
}: AccountDeletionModalProps) => {
  const { mutate: deleteUser, isPending } = useUserDeleteMutation();

  const handleAccountDeletion = () => {
    deleteUser();
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="mb-7 flex-col">
        <h1 className="text-body1-m text-white text-center">
          정말 탈퇴하시겠어요?
        </h1>
        <p className="text-body4-r text-gray-400 text-center mt-2">
          탈퇴 시 계정 정보 및 기록되었던 데이터는 <br />
          모두 삭제되어 복구가 불가해요.
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          className="!bg-gray-700 flex-1"
          onClick={onClose}
          disabled={isPending}
        >
          취소
        </Button>
        <Button
          className="bg-red-600 flex-1 hover:bg-red-700"
          onClick={handleAccountDeletion}
          disabled={isPending}
        >
          {isPending ? '탈퇴 중...' : '탈퇴하기'}
        </Button>
      </div>
    </Modal>
  );
};
