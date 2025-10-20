'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Modal, Navigator } from '@/components';
import { ModalContent } from '@/components/Modal';
import { QUERY_KEYS } from '@/constants';
import { useDefecationDeleteMutation } from '@/hooks';

export const DefecationNavigator = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const toiletRecordId = searchParams.get('toiletRecordId');
  const isEdit = toiletRecordId !== null;

  const queryClient = useQueryClient();
  const { mutate: deleteDefecation, isPending: isDeleting } =
    useDefecationDeleteMutation();

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (toiletRecordId: number) => {
    deleteDefecation(
      { toiletRecordId },
      {
        onSuccess: () => {
          closeModal();

          queryClient.invalidateQueries({
            queryKey: [...QUERY_KEYS.DEFECATION, toiletRecordId],
          });
          queryClient.invalidateQueries({ queryKey: QUERY_KEYS.REPORT });

          router.push('/calendar');
        },
        onError: (error) => {
          console.error(error);
        },
      }
    );
  };
  return (
    <>
      <Navigator>
        <Navigator.Center>배변 기록</Navigator.Center>
        {isEdit && (
          <Navigator.Right>
            <button
              type="button"
              onClick={openModal}
              disabled={isDeleting}
              className="text-body2-m text-red-600 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? '삭제 중...' : '삭제'}
            </button>
          </Navigator.Right>
        )}
      </Navigator>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalContent
          onClose={closeModal}
          onDelete={() => handleDelete(Number(toiletRecordId ?? 0))}
        />
      </Modal>
    </>
  );
};
