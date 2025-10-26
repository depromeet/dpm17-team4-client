'use client';

import { Bell } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import {
  getAccessToken,
  requestAccessToken,
  setAccessToken,
  setUserInfo,
} from '@/app/auth/_components/AuthSessionProvider';
import Character from '@/assets/home/character.png';
import MaskGroup from '@/assets/home/Mask group.svg';
import { Modal } from '@/components';
import { useNavigationContext } from '@/contexts/NavigationContext';
import { useUserInfo } from '@/hooks';
import { RecordSection, Tutorial } from './_components/ui';

function HomeContent() {
  const { navHeight, handleTabClick } = useNavigationContext();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    handleTabClick('home');
  }, [handleTabClick]);

  const { userInfo: savedUserInfo } = useUserInfo();
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const toastShownRef = useRef(false);

  const handleCloseTutorial = () => {
    setIsTutorialOpen(false);
    // 튜토리얼을 본 후 localStorage에 저장 (사용자별로)
    if (typeof window !== 'undefined' && savedUserInfo?.id) {
      localStorage.setItem(`hasSeenTutorial_${savedUserInfo.id}`, 'true');
    }
  };

  // Toast 표시를 위한 별도 useEffect
  useEffect(() => {
    if (toastShownRef.current) return;

    if (searchParams.get('toast-defecation')) {
      toast.success('새로운 배변 기록이 등록되었어요!');
      toastShownRef.current = true;
    }
    if (searchParams.get('toast-lifestyle')) {
      toast.success('새로운 생활 기록이 등록되었어요!');
      toastShownRef.current = true;
    }
  }, [searchParams]);

  useEffect(() => {
    (async () => {
      try {
        const currentAccessToken = getAccessToken();
        // 신규 사용자이고 튜토리얼을 아직 본 적이 없을 때만 표시
        if (
          savedUserInfo?.isNew === true &&
          typeof window !== 'undefined' &&
          savedUserInfo?.id
        ) {
          const hasSeenTutorial = localStorage.getItem(
            `hasSeenTutorial_${savedUserInfo.id}`
          );
          if (!hasSeenTutorial) {
            setIsTutorialOpen(true);
          }
        }
        // 사용자 정보가 있고 accessToken이 없을 때만 refresh 요청
        if (savedUserInfo && !currentAccessToken) {
          console.log('🔄 Home에서 Refresh 요청 시작...');
          const { accessToken } = await requestAccessToken();
          if (accessToken) {
            console.log('✅ Home에서 AccessToken 발급 완료');
            setAccessToken(accessToken);
          } else {
            console.log('❌ Home에서 AccessToken 발급 실패');
          }
        } else {
          console.log('⏭️ Home에서 Refresh 요청 건너뜀:', {
            reason: !savedUserInfo
              ? '사용자 정보 없음'
              : '이미 accessToken 있음',
          });
        }

        // 사용자 정보가 있으면 항상 저장하고 URL 정리
        if (savedUserInfo && typeof window !== 'undefined') {
          setUserInfo(savedUserInfo);
          const url = new URL(window.location.href);
          url.search = '';
          window.history.replaceState({}, '', url.toString());
          // URL 정리 후 toast ref 리셋
          toastShownRef.current = false;
        }

        if (savedUserInfo) {
          router.replace('/home', { scroll: false });
        }
      } catch (error) {
        console.error('Home Auth 처리 중 에러:', error);
      }
    })();
  }, [router, savedUserInfo]);

  return (
    <>
      <Modal
        isOpen={isTutorialOpen}
        onClose={handleCloseTutorial}
        mode="tutorial"
      >
        <Tutorial onClose={handleCloseTutorial} />
      </Modal>
      <main className="min-w-[3.75rem] min-h-screen text-white relative px-4 pb-20 bg-gradient-to-br from-[#140927] via-[#403397] to-[#4665F3]">
        {/* Radial gradient 배경 */}
        <div className="absolute inset-0 opacity-70">
          <Image
            src={MaskGroup}
            alt="배경 그라디언트"
            className="w-full h-full object-cover"
            priority
          />
        </div>
        {/* 콘텐츠 영역 */}
        <div className="relative z-10">
          <section className="flex justify-between font-bold text-h3 pt-[0.94rem]">
            <span>Logo</span>
            {/* NOTE(yubin):아이콘 교체 */}
            <Bell />
          </section>
          <section className="text-h2 mt-[2.2rem]">
            <h1>
              {savedUserInfo?.nickname || savedUserInfo?.id || '테스터'}님,
              반가워요!
              <br />
              오늘의 기록을 시작할까요?
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              또잇이와 함께 배아픈 이유를 찾아보아요
            </p>
          </section>
          {/* 중앙 아이콘 영역 */}
          <section className="flex justify-center items-center">
            {/* NOTE(yubin):이미지 교체 */}
            <Image
              width={213}
              height={206}
              src={Character}
              alt="홈 화면 중앙 아이콘"
            />
          </section>
        </div>
      </main>
      {/* 기록하기 영역 */}
      <RecordSection navHeight={navHeight} />
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
