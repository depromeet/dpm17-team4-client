'use client';

import { Plus } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getRecordPath } from '@/app/(with-bottom-navigation)/home/_components/utils/util-route';
import EmptyEmoji from '@/assets/calendar/empty.png';
import { BottomSheet } from '@/components/BottomSheet';
import { getDateDisplayTextFromDate } from '@/utils/utils-date';

interface LifestyleRecordBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  hasRecords: boolean;
}

export const LifestyleRecordBottomSheet = ({
  isOpen,
  onClose,
  date,
  hasRecords,
}: LifestyleRecordBottomSheetProps) => {
  const router = useRouter();

  const path = getRecordPath('lifestyle', date);

  const handleAddRecord = () => {
    router.push(`${path}&from=calendar`);
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="min-h-[508px] bg-gray-800 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-[1rem] py-[1rem]">
          <h2 className=" text-white text-body1-m">
            {getDateDisplayTextFromDate(date)}
          </h2>
          <button
            type="button"
            onClick={handleAddRecord}
            className="flex items-center gap-[0.5rem] text-primary-500 text-body3-m hover:text-primary-500"
          >
            <Plus className="w-[1rem] h-[1rem]" />
            기록 추가
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 px-[1rem] py-[1rem] overflow-hidden flex flex-col items-center">
          {!hasRecords ? (
            <div className="flex h-full flex-1 flex-col items-center justify-center py-[3rem]">
              <div className="text-[4rem] mb-[14px]">
                <Image
                  src={EmptyEmoji}
                  alt="sad emoji"
                  width={40}
                  height={40}
                />
              </div>
              <p className="text-body2-m text-gray-400 text-center">
                작성한 기록이 없어요.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </BottomSheet>
  );
};
