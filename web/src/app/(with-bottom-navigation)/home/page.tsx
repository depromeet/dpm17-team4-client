'use client';

import { Bell } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  getAccessToken,
  requestAccessToken,
  setAccessToken,
  setUserInfo,
  type UserInfo,
} from '@/app/auth/_components/AuthSessionProvider';
import Character from '@/assets/home/character.png';
import MaskGroup from '@/assets/home/Mask group.svg';
import { useNavigationContext } from '@/contexts/NavigationContext';
import { useUserInfo } from '@/hooks';
import { RecordSection } from './_components/ui';

function HomeContent() {
  const { navHeight } = useNavigationContext();
  const searchParams = useSearchParams();
  const router = useRouter();

  const extractUserInfo = useCallback((): UserInfo | null => {
    const id = searchParams.get('id');
    const nickname = searchParams.get('nickname');
    const profileImage = searchParams.get('profileImage');
    const isNew = searchParams.get('isNew');
    const providerType = searchParams.get('providerType');

    if (id && nickname && profileImage && isNew && providerType) {
      const userInfo = {
        id,
        nickname: decodeURIComponent(nickname),
        profileImage: decodeURIComponent(profileImage),
        isNew: isNew === 'true',
        providerType,
      };
      return userInfo;
    }
    return null;
  }, [searchParams]);

  useEffect(() => {
    (async () => {
      try {
        const userInfo = extractUserInfo();
        const currentAccessToken = getAccessToken();

        // 사용자 정보가 있고 accessToken이 없을 때만 refresh 요청
        if (userInfo && !currentAccessToken) {
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
            reason: !userInfo ? '사용자 정보 없음' : '이미 accessToken 있음',
          });
        }

        // 사용자 정보가 있으면 항상 저장하고 URL 정리
        if (userInfo && typeof window !== 'undefined') {
          setUserInfo(userInfo);
          const url = new URL(window.location.href);
          url.search = '';
          window.history.replaceState({}, '', url.toString());
        }
        if (searchParams.get('toast-defecation')) {
          toast.success('새로운 배변 기록이 등록되었어요!');
        }
        if (searchParams.get('toast-lifestyle')) {
          toast.success('새로운 생활 기록이 등록되었어요!');
        }
        if (
          userInfo ||
          searchParams.get('toast-defecation') ||
          searchParams.get('toast-lifestyle')
        ) {
          router.replace('/home', { scroll: false });
        }
      } catch (error) {
        console.error('Home Auth 처리 중 에러:', error);
      }
    })();
  }, [extractUserInfo]);

  const { userInfo: savedUserInfo } = useUserInfo();

  return (
    <>
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
