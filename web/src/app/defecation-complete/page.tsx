'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import CheckPng from '@/assets/defecation/check.png';
import DecorationPng from '@/assets/defecation/decoration.png';
import { BottomBtnBar } from '@/components';

export default function DefecationCompletePage() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/home');
  };

  const handleClose = () => {
    router.push('/home');
  };

  return (
    <div
      className="min-h-screen text-white relative flex items-center justify-center"
      style={{ background: 'linear-gradient(180deg, #1B3275 0%, #17171C 75%)' }}
    >
      <button
        type="button"
        onClick={handleClose}
        className="text-white absolute top-4 right-2.5 p-2.5"
      >
        <X size={24} />
      </button>

      {/* 메인 콘텐츠 */}
      <div className="flex flex-col items-center justify-center px-8 py-16 relative">
        {/* 체크 아이콘 */}
        <div className="relative mb-8">
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl flex-shrink-0"
            style={{ aspectRatio: '1/1' }}
          >
            <Image
              src={CheckPng}
              alt="체크 아이콘"
              width={80}
              height={80}
              className="w-20 h-20"
            />
          </div>
        </div>
        <Image
          src={DecorationPng}
          alt="배경"
          width={252}
          height={88}
          className="absolute top-0"
        />

        {/* 메인 텍스트 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">기록 완료!</h1>
          <div className="text-gray-300 text-base leading-relaxed">
            <p>최근에 먹은 식단까지 기록하면</p>
            <p>더 정확한 원인 분석을 할 수 있어요</p>
          </div>
        </div>
      </div>

      <BottomBtnBar onSubmit={handleGoHome} text={'홈으로'} />
    </div>
  );
}
