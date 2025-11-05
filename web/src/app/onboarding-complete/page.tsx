'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import CheckPng from '@/assets/defecation/check.png';
import CompletePng from '@/assets/defecation/complete-succes.png';
import { BottomBtnBar } from '@/components';
import { PAGE_ROUTES } from '@/constants';

export default function OnboardingCompletePage() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push(`${PAGE_ROUTES.HOME}?toast-defecation=false`);
  };

  return (
    <div
      className="min-h-screen text-white relative flex items-center justify-center"
      style={{
        backgroundImage: `url(${CompletePng.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
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

        {/* 메인 텍스트 */}
        <div className="text-center mb-8">
          <h1 className="text-[1.5rem] font-semibold mb-2.5">
            회원가입이 완료되었어요
          </h1>
          <div className="text-[#707885] text-body3-m leading-relaxed">
            <p>지금 바로 함께 기록하고 관리해봐요</p>
          </div>
        </div>
      </div>

      <BottomBtnBar
        onSubmit={handleGoHome}
        text={'홈으로'}
        className="bg-transparent"
      />
    </div>
  );
}
