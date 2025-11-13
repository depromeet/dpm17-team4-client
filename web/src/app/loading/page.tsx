'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LottieAnimation from 'react-lottie';
import bgReport from '@/assets/report/bg-report.png';
import animationData from './loading-lottie.json'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const TIME = 3000
export default function LoadingPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/report/daily');
    }, TIME);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* 배경 이미지 */}
      <Image
        src={bgReport}
        alt="background"
        fill
        className="object-cover"
        priority
      />

      {/* 컨텐츠 영역 */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
        {/* 로띠 애니메이션 */}
        <div className="">
          <LottieAnimation
            options={defaultOptions}
            isClickToPauseDisabled
            style={{ width: '60px', height: '60px' }}
          />
        <p className="text-white text-h3">리포트를 생성 중이에요.</p>
        </div>

      </div>
    </div>
  );
}

