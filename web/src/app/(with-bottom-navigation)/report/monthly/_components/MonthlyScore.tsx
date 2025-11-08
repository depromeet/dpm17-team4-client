import Image from 'next/image';
import { getDateFromDateString, getDayName } from '@/utils/utils-date';
import type { MonthlyScore } from '../types';
import BestImage from './assets/Best.png';
import WorstImage from './assets/Worst.png';

export function MonthlyScore({ monthlyScore }: { monthlyScore: MonthlyScore }) {
  return (
    <div className="bg-[#1B1D20] rounded-[14px] py-7 px-6 w-full">
      <p className="text-[#4E5560] text-body3-m mb-2">월간 기록 분석 결과</p>
      <p className="text-white text-[18px] font-semibold mb-6">
        배변 점수가 가장 높았던 날과
        <br />
        가장 낮았던 날이에요
      </p>
      <div className="flex justify-center items-center gap-[11px]">
        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-col items-center gap-1">
            <p className="text-body3-sb text-blue-600">BEST</p>
            <Image src={BestImage} alt="BEST" width={40} height={40} />
          </div>
          <div className="flex items-center justify-between py-2 px-3 rounded-[6px] bg-[#292D32] h-[53px]">
            <div className="w-[40px] flex flex-col text-center">
              <p className="text-[11px] font-normal text-[#707885]">
                {getDayName(new Date(monthlyScore.best.occurredAt))}
                요일
              </p>
              <p className="text-body3-sb text-white">
                {getDateFromDateString(monthlyScore.best.occurredAt)}일
              </p>
            </div>
            <span className="w-[1px] h-full bg-[#3C4149] mx-3" />
            <div className="w-[54px] text-center">
              <p className="text-body3-m text-white">
                {monthlyScore.best.score}점
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-col items-center gap-1">
            <p className="text-body3-sb text-red-600">WORST</p>
            <Image src={WorstImage} alt="WORST" width={40} height={40} />
          </div>
          <div className="flex items-center justify-between py-2 px-3 rounded-[6px] bg-[#292D32] h-[53px]">
            <div className="w-[40px] flex flex-col text-center">
              <p className="text-[11px] font-normal text-[#707885]">
                {getDayName(new Date(monthlyScore.worst.occurredAt))}
                요일
              </p>
              <p className="text-body3-sb text-white">
                {getDateFromDateString(monthlyScore.worst.occurredAt)}일
              </p>
            </div>
            <span className="w-[1px] h-full bg-[#3C4149] mx-3" />
            <div className="w-[54px] text-center">
              <p className="text-body3-m text-white">
                {monthlyScore.worst.score}점
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
