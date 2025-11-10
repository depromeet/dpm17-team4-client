'use client';

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
import forkIcon from '@/assets/home/fork.svg';
import logo from '@/assets/home/logo.png';
import poopIcon from '@/assets/home/poop.svg';
import { Modal } from '@/components';
import { useNavigationContext } from '@/contexts/NavigationContext';
import { useUserInfo } from '@/hooks';
import { RecordSection, Tutorial } from './_components/ui';
import { RecordBadge } from './_components/ui/RecordBadge';
import { homeDataApi } from '@/apis/homeApi';
import { useGetHomeQuery } from '@/hooks/queries/useHomeQuery';
import { HomeResponseData, HomeResponseDto } from './types/dto';
import bgBase from '@/assets/home/bg_base.png'

// import { BottomSheet } from '@/components/BottomSheet';
// import { NotifcationSet } from './_components/ui';

export const homeBackGround= {
    base: bgBase.src
};

interface HomeContentProps {
  data:HomeResponseData
}

function HomeContent({data}:HomeContentProps) {
  const { navHeight, handleTabClick } = useNavigationContext();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { userInfo: savedUserInfo } = useUserInfo();
  // const [isNotificationSheetOpen, setIsNotificationSheetOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const toastShownRef = useRef(false);

  // const handleCloseNotificationSheet = () => {
  //   setIsNotificationSheetOpen(false);
  //   setIsTutorialOpen(true);
  // };

  // const handleEnableNotification = () => {
  //   // NOTE(taehyeon): 알림 설정 페이지로 이동 로직 구현 필요
  //   console.log('🔍 알림 활성화 페이지로 이동');
  // };

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

    if (searchParams.get('toast-defecation') === 'true') {
      toast.success('새로운 배변 기록이 등록되었어요!');
      toastShownRef.current = true;
    }
    if (searchParams.get('toast-lifestyle') === 'true') {
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
          console.log(
            '🔍 신규 사용자 - 알림 설정 바텀시트와 튜토리얼 플로우 시작'
          );
          const hasSeenTutorial = localStorage.getItem(
            `hasSeenTutorial_${savedUserInfo.id}`
          );
          if (!hasSeenTutorial) {
            // NOTE(taehyeon): 알림 기능 구현 완료 시 바텀 시트 여는 로직으로 변경
            setIsTutorialOpen(true);
            // setIsNotificationSheetOpen(true);
          }
        }
        // 사용자 정보가 있고 accessToken이 없을 때만 refresh 요청
        if (!currentAccessToken) {
          console.log('🔄 Home에서 Refresh 요청 시작...');
          const { accessToken } = await requestAccessToken();
          if (accessToken) {
            console.log('✅ Home에서 AccessToken 발급 완료');
            setAccessToken(accessToken);
          } else {
            console.log('❌ Home에서 AccessToken 발급 실패');
          }
        } else {
          console.log('⏭️ Home에서 Refresh 요청 건너뜀:');
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
      {/* 알림 설정 바텀시트 */}
      {/* <BottomSheet
        isOpen={isNotificationSheetOpen}
        onClose={handleCloseNotificationSheet}
      >
        <NotifcationSet
          onEnableNotification={handleEnableNotification}
          onSkip={handleCloseNotificationSheet}
        />
      </BottomSheet> */}

      {/* 튜토리얼 모달 */}
      <Modal
        isOpen={isTutorialOpen}
        onClose={handleCloseTutorial}
        mode="tutorial"
      >
        <Tutorial onClose={handleCloseTutorial} />
      </Modal>

      <Image
        src={homeBackGround.base} 
        alt="배경 이미지"
        fill 
        className="-z-10 bg-cover" 
        priority 
      />
      <main className="min-w-[3.75rem] min-h-screen flex flex-col text-white relative px-4 pb-20 ">
        {/* 콘텐츠 영역 */}
        <div className="relative z-10 flex flex-col flex-1">
          <section className="flex justify-between font-bold text-h3 pt-[0.94rem]">
            <Image src={logo} alt="로고" width={76.57} height={24} />
          </section>
          <section className="text-h2 mt-[2.2rem]">
            <h1>
              {savedUserInfo?.nickname || savedUserInfo?.id || '테스터'}님,
              반가워요!
              <br />
              오늘의 기록을 시작할까요?
            </h1>
            {/* <p className="text-gray-500 text-sm mt-2">
              또잇이와 함께 배아픈 이유를 찾아보아요
            </p> */}
            <div className="flex mt-3">
              <RecordBadge icon={poopIcon} recordCounts={data.toiletRecordCount}>
                배변
              </RecordBadge>
              <RecordBadge icon={forkIcon} recordCounts={2}>
                생활
              </RecordBadge>
            </div>
          </section>
          {/* 중앙 아이콘 영역 */}
          <section className="flex justify-center items-center flex-1">
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

  const {data:homeData} =useGetHomeQuery("2000-02-11")
  if(!homeData) return;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent data={homeData} />
    </Suspense>
  );
}
