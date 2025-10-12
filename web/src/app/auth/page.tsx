'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import LoginCharacter from '@/assets/auth/login-character.png';
import { API_ENDPOINTS, PAGE_ROUTES } from '@/constants';
import AppleLoginButton from './_components/AppleLoginButton';
import {
  getAccessToken,
  requestAccessToken,
  setAccessToken,
  setUserInfo,
  type UserInfo,
} from './_components/AuthSessionProvider';
import KakaoLoginButton from './_components/KakaoLoginButton';

const API_BASE = process.env.NEXT_PUBLIC_API || 'https://211.188.58.167';
const KAKAO_LOGIN_INITIATE_URL = `${API_BASE}${API_ENDPOINTS.AUTH.KAKAO_LOGIN}`;

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  const redirectUri = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return `${window.location.origin}/auth`;
  }, []);

  // ✅ 인증 콜백 파라미터 존재 여부 (있으면 렌더 스킵)
  const hasAuthParams = useMemo(() => {
    return Boolean(
      searchParams.get('id') ||
        searchParams.get('nickname') ||
        searchParams.get('profileImage') ||
        searchParams.get('isNew') ||
        searchParams.get('providerType')
    );
  }, [searchParams]);

  const extractUserInfo = useCallback((): UserInfo | null => {
    const id = searchParams.get('id');
    const nickname = searchParams.get('nickname');
    const profileImage = searchParams.get('profileImage');
    const isNew = searchParams.get('isNew');
    const providerType = searchParams.get('providerType');

    if (id && nickname && profileImage && isNew && providerType) {
      return {
        id,
        nickname: decodeURIComponent(nickname),
        profileImage: decodeURIComponent(profileImage),
        isNew: isNew === 'true',
        providerType,
      };
    }
    return null;
  }, [searchParams]);

  useEffect(() => {
    const error = searchParams.get('erroror_message');
    if (error) setError(decodeURIComponent(error));
  }, [searchParams]);

  useLayoutEffect(() => {
    const userInfo = extractUserInfo();
    if (!userInfo) return;

    setUserInfo(userInfo);

    // URL 쿼리 제거
    const url = new URL(window.location.href);
    url.search = '';
    window.history.replaceState({}, '', url.toString());

    // 먼저 홈으로 이동
    router.replace(PAGE_ROUTES.HOME);

    // 토큰은 백그라운드로 시도 (실패해도 화면은 이미 /home)
    (async () => {
      try {
        const currentAccessToken = getAccessToken();
        if (!currentAccessToken) {
          const { accessToken } = await requestAccessToken();
          if (accessToken) setAccessToken(accessToken);
        }
      } catch (e) {
        console.error('⚠️ AccessToken 갱신 실패(무시하고 진행):', e);
      }
    })();
  }, [extractUserInfo, router]);

  // ✅ 깜빡임 방지: 콜백 파라미터가 보이면 렌더 스킵
  if (hasAuthParams) return null;

  return (
    <div
      className="
    min-h-screen relative overflow-hidden
    [background-color:var(--Background-Background-Primary,#1D1E20)]
    bg-[radial-gradient(54.67%_121.62%_at_12.93%_70.32%,_rgba(9,4,27,0.20)_0%,_rgba(73,179,169,0.20)_100%)]
    bg-no-repeat
     [background-size:100%_100%]
    bg-[position:center]
    flex flex-col items-center justify-center
    text-white
  "
    >
      <div
        className="
    pointer-events-none absolute inset-0 z-10
    bg-[linear-gradient(180deg,_#090318_0%,_#242D58_20%,_#404DDC80_40%,_#404DDC00_100%)]
    bg-no-repeat bg-top
    [background-size:100%_36.75rem]
    
  "
      />

      <div
        className="
      absolute z-10
      bg-[radial-gradient(66.21%_66.21%_at_45.8%_19.42%,_rgba(107,192,213,0.24)_0%,_rgba(92,91,167,0.24)_58.07%,_rgba(37,49,90,0.24)_100%)]
      blur-[10px]
      w-[21.5625rem] h-[21.5625rem]
      rounded-[21.5625rem]
      top-0 left-1/2
      -translate-x-[calc(50%+11.12rem)]
      -translate-y-[3.81rem]
    "
      />
      <div
        className="
      absolute z-10 bottom-0 right-0 translate-x-[6.5rem]
      w-[17.75rem] h-[17.75rem] rounded-[17.75rem]
      bg-[radial-gradient(76.29%_76.29%_at_36.71%_24.88%,_rgba(107,192,213,0.24)_0%,_rgba(92,91,167,0.24)_58.07%,_rgba(30,39,43,0.24)_100%)]
      blur-[10px]
    "
      />

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

        <div className="space-y-4">
          <form method="POST" action={KAKAO_LOGIN_INITIATE_URL}>
            <input type="hidden" name="redirectUri" value={redirectUri} />
            <KakaoLoginButton />
          </form>
          <AppleLoginButton />
        </div>
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
