'use client';

import { useState } from 'react';
import { InfoIcon } from '@/components';
import { DefecationScoreTooltip } from '../../_components/DefecationScoreTooltip';

const labels = ['매우 나쁨', '나쁨', '보통', '좋음', '매우 좋음'];

type ScoreProgressBarProps = {
  score: number;
};

export const DefecationScore = ({ score }: ScoreProgressBarProps) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);

  return (
    <div className="bg-[#1B1D20] rounded-[14px] py-5 px-6 w-full mt-9">
      <div className="flex justify-between items-center mb-3 text-body2-sb">
        <p>배변 점수</p>
        <button
          type="button"
          onClick={() => {
            console.log('🔍 DefecationScore - onClick');
            setIsTooltipVisible((prev) => !prev);
          }}
          className="flex items-center gap-1 relative"
        >
          <p>{Math.round(score)}점</p>
          <InfoIcon />

          <div className="z-50 absolute -top-[39px] -right-[25px] pointer-events-none">
            {isTooltipVisible && (
              <DefecationScoreTooltip
                text={
                  '배변 상태, 복통 정도, 소요 시간을 분석하여 도출된 점수입니다.'
                }
              />
            )}
          </div>
        </button>
      </div>
      {score < 0 || score > 100 ? (
        <div>확인되지 않은 점수입니다.</div>
      ) : (
        <>
          <div className="w-full bg-white/10 rounded-[10px] h-2.5 relative overflow-hidden">
            <div
              className="h-2.5 rounded-full transition-all duration-300 ease-in-out relative"
              style={{
                width: `${score}%`,
                background: 'linear-gradient(90deg, #FF5555 0%, #78E884 100%)',
                backgroundSize: `${(100 * 100) / Math.max(score, 1)}% 100%`,
                backgroundRepeat: 'no-repeat',
              }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {labels.map((label) => (
              <span key={label} className="text-[#707885] text-body4-m">
                {label}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
