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
import bgBad from '@/assets/home/bg_bad.png';
import bgBadDeco from '@/assets/home/bg_bad_deco.png';
import bgBase from '@/assets/home/bg_base.png';
import bgGood from '@/assets/home/bg_good.png';
import bgGoodDeco from '@/assets/home/bg_good_deco.png';
import bgMedium from '@/assets/home/bg_medium.png';
import bgMediumDeco from '@/assets/home/bg_medium_deco.png';
import bgVeryBad from '@/assets/home/bg_very_bad.png';
import bgVeryBadDeco from '@/assets/home/bg_very_bad_deco.png';
import bgVeryGood from '@/assets/home/bg_very_good.png';
import bgVeryGoodDeco from '@/assets/home/bg_very_good_deco.png';
import forkIcon from '@/assets/home/fork.svg';
import logo from '@/assets/home/logo.png';
import poopIcon from '@/assets/home/poop.svg';
import { Modal } from '@/components';
import { useNavigationContext } from '@/contexts/NavigationContext';
import { useUserInfo } from '@/hooks';
import { useGetHomeQuery } from '@/hooks/queries/useHomeQuery';
import { formatToISOString } from '@/utils/utils-date';
import { RecordSection, Tutorial } from './_components/ui';
import { RecordBadge } from './_components/ui/RecordBadge';
import { type HomeResponseData, HomeResponseDto } from './types/dto';

// import { BottomSheet } from '@/components/BottomSheet';
// import { NotifcationSet } from './_components/ui';

type BgStatusKey = keyof typeof homeBackGround;

export const homeBackGround = {
  base: {
    src: bgBase.src,
    deco: bgBase.src,
    message: '반가워요! 오늘의 기록을 시작할까요?',
  },
  good: {
    src: bgGood.src,
    deco: bgGoodDeco.src,
    message: '평화로운 하루,개운하실 것 같아요!',
  },
  bad: {
    src: bgBad.src,
    deco: bgBadDeco.src,
    message: '약간 무리했나봐요 잠시 관리가 필요해요!',
  },
  medium: {
    src: bgMedium.src,
    deco: bgMediumDeco.src,
    message: '별 일 없는 무난한 하루가 되었군요!',
  },
  veryGood: {
    src: bgVeryGood.src,
    deco: bgVeryGoodDeco.src,
    message: '행복한 하루,장 컨디션 아주 굿!',
  },
  veryBad: {
    src: bgVeryBad.src,
    deco: bgVeryBadDeco.src,
    message: '긴급상황 전문가 상담이 필요해요!',
  },
};

interface HomeContentProps {
  data: HomeResponseData;
  currentDate: Date;
  onChangeDate: (direction: 'prev' | 'next') => void;
}

function HomeContent({ data, currentDate, onChangeDate }: HomeContentProps) {
  const { navHeight, handleTabClick } = useNavigationContext();
  const searchParams = useSearchParams();
  const router = useRouter();

  const bgStatus = data.heroImage
    .split('/colon_')[1]
    .split('.png')[0] as BgStatusKey;

  useEffect(() => {
    handleTabClick('home');
  }, [handleTabClick]);

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

  const currentBg = homeBackGround[bgStatus] ?? homeBackGround.base;

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
        src={currentBg.src}
        alt="배경 이미지"
        fill
        className="-z-10 bg-cover"
        priority
      />
      <Image
        src={currentBg.deco}
        alt="배경 데코이미지"
        fill
        className="-z-10 bg-cover animate-bg-fade-pulse"
        priority
      />
      <main
        className="min-w-[3.75rem] h-dvh flex flex-col text-white relative"
        style={{ paddingBottom: `${navHeight + 16}px` }}
      >
        {/* 콘텐츠 영역 */}
        <div className="relative z-10 flex flex-col px-4">
          <section className="flex justify-between font-bold text-h3 pt-[0.94rem]">
            <Image src={logo} alt="로고" width={76.57} height={24} />
          </section>
          <section className="text-h2 mt-[2.2rem] animate-text-blink">
            <h1>
              {!data.hasActivityRecord && data.toiletRecordCount < 1 && (
                <>
                  {savedUserInfo?.nickname || savedUserInfo?.id || '테스터'}님,
                  반가워요!
                  <br />
                  오늘의 기록을 시작할까요?
                  <p className="text-body3-r mt-2 text-gray-500">
                    대장이와 함께 배아픈 이유를 찾아보아요
                  </p>
                </>
              )}
              {data.hasActivityRecord && data.toiletRecordCount === 0 && (
                <>
                  배변기록도 <br />
                  함께 기록해볼까요?
                </>
              )}
              {data.toiletRecordCount > 0 && !data.hasActivityRecord && (
                <>
                  생활기록도 <br />
                  함께 기록해볼까요?
                </>
              )}
              {data.toiletRecordCount > 0 && data.hasActivityRecord && (
                <>
                  업데이트 된<br />
                  리포트를 확인해보세요!
                </>
              )}
            </h1>
            <div className="flex mt-3">
              {data.toiletRecordCount > 0 && (
                <RecordBadge
                  icon={poopIcon}
                  recordCounts={data.toiletRecordCount}
                >
                  배변
                </RecordBadge>
              )}
              {data.hasActivityRecord === true && (
                <RecordBadge icon={forkIcon} recordCounts={1}>
                  생활
                </RecordBadge>
              )}
            </div>
          </section>
        </div>

        <div
          className="flex-1 flex items-center justify-center relative px-4"
          style={{ marginBottom: `${navHeight + 100}px` }}
        >
          <Image
            width={280}
            height={280}
            className="animate-scale-pulse w-fit"
            src={data.heroImage}
            alt="홈 화면 중앙 아이콘"
          />
        </div>
        <RecordSection
          navHeight={navHeight}
          currentDate={currentDate}
          onChangeDate={onChangeDate}
        />
      </main>
      {/* 기록하기 영역 */}
    </>
  );
}

export default function Home() {
  const date = new Date();
  const [selectedDate, setSelectedDate] = useState(date);

  const formattedDate = formatToISOString(selectedDate);
  const { data: homeData, isLoading, error } = useGetHomeQuery(formattedDate);

  const handleDateChange = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);

    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setSelectedDate(newDate);
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>로딩 중...</div>
      </div>
    );
  }
  if (error || !homeData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>데이터를 불러올 수 없습니다.</div>
      </div>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent
        data={homeData}
        currentDate={selectedDate}
        onChangeDate={handleDateChange}
      />
    </Suspense>
  );
}
