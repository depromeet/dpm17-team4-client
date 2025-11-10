'use client';

import Image from 'next/image';
import { useMemo } from 'react';
import triangleDark from '@/assets/report/triangle_dark.png';
import triangleLight from '@/assets/report/triangle_light.png';

export type UserAverage = {
  me: number;
  average: number;
  topPercent: number;
  titleMessage?: string;
};

interface UserAverageChartProps {
  userAverage: UserAverage;
}

export function UserAverageChart({ userAverage }: UserAverageChartProps) {
  const clipFromBottom = 100 - userAverage.topPercent;
  const clipPathStyle = useMemo(
    () => ({
      clipPath: `inset(0 0 ${clipFromBottom}% 0)`,
    }),
    [clipFromBottom]
  );

  return (
    <section className="w-full flex flex-col gap-7 bg-gradient-to-b from-[#252441] to-[#1B1D20] rounded-[20px] px-6 py-7">
      <div>
        <div className="text-gray-600 text-body3-m mb-2">사용자 평균</div>
        <div className="text-h4 text-left">
          이번 주 배변 점수는 <br />
          꾸룩 사용자 중&nbsp;
          <span className="text-primary-600">
            상위{userAverage.topPercent}%
          </span>
          예요
        </div>
      </div>
      <div className="relative w-[156.93px] h-[137.6px] mx-auto">
        <Image
          src={triangleDark}
          alt="전체 비율 이미지"
          fill
          className="z-10 object-contain"
          priority
        />
        <Image
          src={triangleLight}
          alt="나의 비율 이미지"
          fill
          className="z-20 object-contain"
          style={clipPathStyle}
          priority
        />
        <div
          className={`absolute left-0 w-full h-[2px] border-t-1 border-dashed border-[#7850FB] z-30`}
          style={{ top: `${userAverage.topPercent}%` }}
        ></div>
        <div
          className="absolute whitespace-nowrap text-body4-m text-primary-600 z-50"
          style={{
            top: `${userAverage.topPercent}%`,
            transform: 'translateY(-50%)',
            left: '100%',
            marginLeft: '8px',
          }}
        >
          상위 {userAverage.topPercent}%
        </div>

        <div></div>
      </div>
      <div className="flex gap-2.5 items-center">
        <div className="text-body4-m text-gray-500 w-[21px]">나</div>
        <div
          className="bg-primary-600 h-5 rounded-[6px]"
          style={{ width: `${userAverage.me}%` }}
        ></div>
        <div className="text-primary-600 text-body4-m">{userAverage.me}점</div>
      </div>
      <div className="flex gap-2.5 items-center">
        <div className="text-body4-m text-gray-500 whitespace-nowrap w-[21px]">
          평균
        </div>
        <div
          className="bg-primary-600 opacity-20 h-5 rounded-[6px]"
          style={{ width: `${userAverage.average}%` }}
        ></div>
        <div className="text-gray-500 text-body4-m whitespace-nowrap">
          {userAverage.average}점
        </div>
      </div>
    </section>
  );
}
