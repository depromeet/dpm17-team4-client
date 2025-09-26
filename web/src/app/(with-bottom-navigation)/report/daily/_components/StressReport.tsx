import Image from 'next/image';
import type { Stress } from '../types';

export const StressReport = ({ stressData }: { stressData: Stress }) => {
  return (
    <div className="flex flex-col space-y-5 mt-9">
      <div className="bg-[#272B31] rounded-[14px] py-7 px-6 w-full">
        <p className="text-[#707885] text-body3-m mb-2">스트레스 분석 결과</p>
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
  );
};
