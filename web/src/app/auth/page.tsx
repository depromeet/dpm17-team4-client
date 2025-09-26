'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useState } from 'react';
import EllipseBg from '@/assets/auth/Ellipse 322187.png';
import LoginCharacter from '@/assets/auth/login-character.png';
import { API_ENDPOINTS } from '@/constants';
import {
  requestAccessToken,
  setAccessToken,
  setUserInfo,
  type UserInfo,
} from './_components/AuthSessionProvider';
import KakaoLoginButton from './_components/KakaoLoginButton';

const KAKAO_LOGIN_INITIATE_URL = `${process.env.NEXT_PUBLIC_API || 'https://211.188.58.167'}${API_ENDPOINTS.AUTH.KAKAO_LOGIN}`;

function AuthContent() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

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
    const errorParam = searchParams.get('error_message');
    if (errorParam) setError(decodeURIComponent(errorParam));
  }, [searchParams]);

  useEffect(() => {
    (async () => {
      try {
        const userInfo = extractUserInfo();
        const { accessToken } = await requestAccessToken();
        if (accessToken) {
          setAccessToken(accessToken);
        }
        if (userInfo) {
          setUserInfo(userInfo);
          const url = new URL(window.location.href);
          url.search = '';
          window.history.replaceState({}, '', url.toString());
        }
      } catch (error) {
        console.error('Auth 처리 중 에러:', error);
      }
    })();
  }, [extractUserInfo]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#090318] to-[#404DDC00] relative">
      {/* 배경 ellipse 이미지 */}
      <div className="absolute inset-0 opacity-70">
        <Image
          src={EllipseBg}
          alt="배경 ellipse"
          className="w-full h-full object-cover"
          priority
        />
      </div>

      {/* 콘텐츠 영역 */}
      <div className="relative z-10">
        <div className="mb-[5rem]">
          <div className="flex justify-center">
            <Image src={LoginCharacter} alt="로그인 캐릭터 이미지" />
          </div>
          <div className="text-center text-h2 mt-[1.37rem]">
            반가워요 <br />
            지금 바로 함께해요!
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form method="POST" action={KAKAO_LOGIN_INITIATE_URL}>
          <KakaoLoginButton />
        </form>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthContent />
    </Suspense>
  );
}
