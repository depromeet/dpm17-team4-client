'use client';

import { ChevronRightIcon, Plus } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getRecordPath } from '@/app/(with-bottom-navigation)/home/_components/utils/util-route';
import EmptyEmoji from '@/assets/calendar/empty.png';
import { BottomSheet } from '@/components/BottomSheet';
import type { DefecationRecordListResponseDto } from '@/types/dto/defecation.dto';
import { getDateDisplayTextFromDate, getTimeDisplay } from '@/utils/utils-date';

interface DefecationRecordBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  hasRecords: boolean;
  records?: DefecationRecordListResponseDto['items'] | undefined;
}

export const DefecationRecordBottomSheet = ({
  isOpen,
  onClose,
  date,
  hasRecords,
  records,
}: DefecationRecordBottomSheetProps) => {
  const router = useRouter();

  const path = getRecordPath('defecation', date);

  const handleAddRecord = () => {
    router.push(`${path}&from=calendar`);
    onClose();
  };

  const handleRecordSelect = (time: string, toiletRecordId: number) => {
    // NOTE(taehyeon): 서버 api 구현 시 toiletId 를 전달하도록 수정 필요
    router.push(
      `${path}?time=${time}&toiletRecordId=${toiletRecordId}&from=calendar`
    );
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="min-h-[508px] bg-gray-800 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-[1.5rem] py-[1rem]">
          <h2 className=" text-white text-body1-m">
            {getDateDisplayTextFromDate(date)}
          </h2>
          <button
            type="button"
            onClick={handleAddRecord}
            className="flex items-center gap-[0.5rem] text-primary-600 text-body3-m hover:text-primary-500"
          >
            <Plus className="w-[1rem] h-[1rem]" />
            기록 추가
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 px-[1.5rem] py-[1rem] overflow-hidden flex flex-col items-center">
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
          ) : (
            // Records List
            <div className="flex h-full flex-col">
              <div className="flex-1 space-y-[0.75rem] overflow-y-auto">
                {records?.map((record) => (
                  <button
                    key={record.id}
                    type="button"
                    onClick={() =>
                      handleRecordSelect(record.activityTime, record.id)
                    }
                    className={`w-full p-[1rem] rounded-[0.75rem] transition-colors bg-gray-700 hover:bg-gray-600
                  `}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-[0.75rem]">
                        <div className="w-[0.5rem] h-[0.5rem] bg-yellow-600 rounded-full" />
                        <span className="text-body2-m text-white">
                          {getTimeDisplay(record.activityTime)}
                        </span>
                      </div>
                      <ChevronRightIcon className="w-[1.25rem] h-[1.25rem] text-white" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </BottomSheet>
  );
};
