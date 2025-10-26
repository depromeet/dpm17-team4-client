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
  const from = searchParams.get('from');
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
            queryKey: [QUERY_KEYS.DEFECATION],
          });
          queryClient.invalidateQueries({ queryKey: QUERY_KEYS.REPORT });

          // 생활 기록에서 온 경우 홈으로, 그렇지 않으면 캘린더로
          if (from === 'lifestyle') {
            router.push('/home');
          } else {
            router.push('/calendar');
          }
        },
        onError: (error) => {
          closeModal();
          console.error(error);
          alert('삭제 중 오류가 발생했습니다');
        },
      }
    );
  };

  const handleBack = () => {
    // 생활 기록에서 온 경우 홈으로, 그렇지 않으면 기본 뒤로가기
    if (from === 'lifestyle') {
      router.push('/home');
    } else {
      router.back();
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-[56px] z-10 bg-gray-900 text-white p-4 flex shrink-0">
        <button
          type="button"
          onClick={handleBack}
          className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 z-10"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <title>뒤로가기</title>
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="flex-1 flex justify-center items-center">
          <Navigator.Center>배변 기록</Navigator.Center>
        </div>
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
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalContent
          onClose={closeModal}
          onDelete={() => {
            if (!toiletRecordId) return;
            handleDelete(Number(toiletRecordId));
          }}
        />
      </Modal>
    </>
  );
};
