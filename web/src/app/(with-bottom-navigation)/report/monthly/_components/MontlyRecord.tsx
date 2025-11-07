import Image from 'next/image';
import memo from '@/assets/report/memo.png';

export type MonthlyRecordCounts = {
  totalRecordCounts: number;
  defecationRecordCounts: number;
  lifestyleRecordCounts: number;
};

interface MonthlyRecordProps {
  recordCounts: MonthlyRecordCounts;
  currentMonth: number;
}

export function MonthlyRecord({
  recordCounts,
  currentMonth,
}: MonthlyRecordProps) {
  return (
    <section className="w-full">
      <div className="flex justify-between">
        <div className="text-body1-m">
          {currentMonth}월 동안 <br /> 총 &nbsp;
          <span className="text-primary-600">
            {recordCounts.totalRecordCounts}
          </span>
          회의 기록을 작성했어요!
        </div>
        <Image src={memo} alt="메모 이미지" width={50} height={50} />
      </div>

      <div className="flex justify-between gap-[11px] mt-4">
        <div className="py-3 px-4 bg-gray-800 rounded-[10px] flex-1">
          <div className="flex gap-1 items-center ">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-600" />
            <div className="text-body4-m">배변 기록</div>
          </div>
          <div className="text-body2-sb">
            {recordCounts.defecationRecordCounts}회
          </div>
        </div>
        <div className="py-3 px-4 bg-gray-800 rounded-[10px] flex-1">
          <div className="flex gap-1 items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
            <div className="text-body4-m">생활 기록</div>
          </div>
          <div className="text-body2-sb">
            {recordCounts.lifestyleRecordCounts}회
          </div>
        </div>
      </div>
    </section>
  );
}
