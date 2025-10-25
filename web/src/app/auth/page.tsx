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
import bgGradient2 from '@/assets/auth/bg-gradient2.png';
import bgGradient3 from '@/assets/auth/bg-gradient3.png';
import loginCharacter from '@/assets/auth/login-character.png';
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
import TermsAgreementBottomSheet from './_components/TermsAgreementBottomSheet';

const API_BASE = process.env.NEXT_PUBLIC_API || 'https://kkruk.com';
const KAKAO_LOGIN_INITIATE_URL = `${API_BASE}${API_ENDPOINTS.AUTH.KAKAO_LOGIN}`;

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [showTermsBottomSheet, setShowTermsBottomSheet] = useState(false);

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

    // 약관 동의 바텀시트 표시
    setShowTermsBottomSheet(true);

    // 토큰은 백그라운드로 시도
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
  }, [extractUserInfo]);

  const handleTermsAgree = () => {
    setShowTermsBottomSheet(false);

    //TODO: 약관 동의한 이후에 알림 바텀싯
    router.push(PAGE_ROUTES.ONBOARDING_PROFILE);
  };

  const handleTermsClose = () => {
    setShowTermsBottomSheet(false);
  };

  if (hasAuthParams) return null;

  return (
    <div
      className="
    min-h-screen relative overflow-hidden [background-color:var(--Background-Background-Primary,#1D1E20)]
    bg-[radial-gradient(54.67%_121.62%_at_12.93%_70.32%,_rgba(9,4,27,0.20)_0%,_rgba(73,179,169,0.20)_100%)]
    bg-no-repeat
     [background-size:100%_100%]
    bg-[position:center]
    flex flex-col items-center justify-center
    text-white
 
  "
    >
      <div className="w-full z-20">
        <Image
          src={loginCharacter}
          alt="로그인 캐릭터 이미지"
          className="w-full"
        />
      </div>
      <div
        className="
    pointer-events-none absolute inset-0 z-10
    bg-[linear-gradient(180deg,_#090318_0%,#090318_10%,#404DDC80_40%,_#404DDC00_100%)]
    bg-no-repeat bg-top
    [background-size:100%_36.75rem]
    
  "
      />
      <Image
        src={bgGradient2}
        alt="배경 그라디언트2"
        width={345}
        height={345}
        className="absolute z-10 top-[207.49px] right-0"
      />
      <Image
        src={bgGradient3}
        width={284}
        height={284}
        alt="배경 그라디언트3"
        className="absolute z-10 top-[496px] right-0"
      />

      <div className="relative z-10">
        <div className="mb-[21px]">
          <div className="text-center text-h2">
            쌓일수록 <br />
            건강해지는 기록
          </div>
          <p className="text-body2-m text-gray-400 text-center mt-3">
            지금 바로 함께 기록하고 관리해봐요
          </p>
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
      {/* 하단 여백 */}
      <div className="w-full h-[176px]" />

      {/* 약관 동의 바텀시트 */}
      <TermsAgreementBottomSheet
        isOpen={showTermsBottomSheet}
        onClose={handleTermsClose}
        onAgree={handleTermsAgree}
      />
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
