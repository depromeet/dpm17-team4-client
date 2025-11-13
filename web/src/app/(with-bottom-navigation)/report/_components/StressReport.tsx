import Image from 'next/image';
import type { Stress } from '../daily/types';

export const StressReport = ({ stressData }: { stressData: Stress }) => {
  return (
    <div className="flex flex-col space-y-5 w-[calc(100%-40px)] mx-auto z-10">
      <div className="bg-[#1B1D20] rounded-[14px] py-7 px-6">
        <p className="text-[#4E5560] text-body3-m mb-2">스트레스 분석 결과</p>
        <div className="flex items-start justify-between gap-2 mb-4">
          <p className="text-white text-[18px] font-semibold whitespace-pre-line">
            {stressData.message}
          </p>
          <div className="mt-2 flex justify-end">
            <Image
              src={stressData.image}
              alt="스트레스 이미지"
              width={84}
              height={84}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
