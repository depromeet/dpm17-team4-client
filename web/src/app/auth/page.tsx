'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import toast from 'react-hot-toast';
import bgGradient2 from '@/assets/auth/bg-gradient2.png';
import bgGradient3 from '@/assets/auth/bg-gradient3.png';
import loginCharacter from '@/assets/auth/login-character.png';
import { API_ENDPOINTS, PAGE_ROUTES } from '@/constants';
import { isAndroid } from '@/utils/utils-platform';
import AppleLoginButton from './_components/AppleLoginButton';
import {
  getAccessToken,
  getRefreshToken,
  getUserInfo,
  requestAccessToken,
  setAccessToken,
  setRefreshToken,
  setUserInfo,
  type UserInfo,
} from './_components/AuthSessionProvider';
import { userApi } from '@/apis/userApi';
import KakaoLoginButton from './_components/KakaoLoginButton';

const API_BASE = process.env.NEXT_PUBLIC_API || 'https://kkruk.com';
const KAKAO_LOGIN_INITIATE_URL = `${API_BASE}${API_ENDPOINTS.AUTH.KAKAO_LOGIN}`;
const APPLE_LOGIN_INITIATE_URL = `${API_BASE}${API_ENDPOINTS.AUTH.APPLE_LOGIN}`;

export function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loadingProvider, setLoadingProvider] = useState<
    'kakao' | 'apple' | null
  >(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const toastShownRef = useRef<{ logout?: boolean; deleteUser?: boolean }>({});

  const redirectUri = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return `${window.location.origin}/auth`;
  }, []);

  // 안드로이드가 아닐 때만 Apple 로그인 버튼 표시 (iOS, 웹)
  const showAppleLogin = useMemo(() => !isAndroid(), []);

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

  // 이미 로그인된 상태에서 /auth 접근 시 home으로 리다이렉트 (렌더링 전에 실행)
  useLayoutEffect(() => {
    // 서버 사이드에서는 실행하지 않음
    if (typeof window === 'undefined') return;

    // 인증 콜백 파라미터나 code 파라미터가 있으면 리다이렉트하지 않음 (로그인 진행 중)
    const code = searchParams.get('code');
    if (hasAuthParams || code) {
      console.log('⏸️ 로그인 진행 중 - 리다이렉트 건너뜀', {
        hasAuthParams,
        code: !!code,
      });
      return;
    }

    const accessToken = getAccessToken();

    // accessToken이 있으면 바로 리다이렉트
    if (accessToken) {
      console.log('✅ 이미 로그인된 상태 (토큰 있음) - /home으로 리다이렉트');
      setIsRedirecting(true);
      router.replace('/home');
    }
    // accessToken이 없으면 refreshToken으로 새 토큰 받아오기 시도 (useEffect에서 처리)
  }, [router, hasAuthParams, searchParams]);

  // accessToken이 없을 때 refreshToken으로 새 토큰 받아오기 시도
  useEffect(() => {
    // 서버 사이드에서는 실행하지 않음
    if (typeof window === 'undefined') return;

    // 인증 콜백 파라미터나 code 파라미터가 있으면 건너뜀 (로그인 진행 중)
    const code = searchParams.get('code');
    if (hasAuthParams || code) {
      return;
    }

    const accessToken = getAccessToken();

    // accessToken이 없으면 refreshToken으로 새 토큰 받아오기 시도 (userInfo 유무와 관계없이)
    if (!accessToken) {
      console.log('🔄 accessToken 없음 - refreshToken 확인 중...');
      setIsRedirecting(true); // 로딩 중 표시

      (async () => {
        try {
          // refreshToken이 있는지 먼저 확인
          const refreshToken = await getRefreshToken();
          if (!refreshToken) {
            console.log('❌ refreshToken 없음 - 로그인 페이지 유지');
            setIsRedirecting(false);
            return;
          }

          console.log('🔄 refreshToken 있음 - 새 accessToken 발급 시도');
          const { accessToken: newAccessToken } = await requestAccessToken();
          if (newAccessToken) {
            console.log(
              '✅ refreshToken으로 새 accessToken 발급 성공'
            );
            setAccessToken(newAccessToken);

            // userInfo가 없으면 API에서 사용자 정보 가져오기
            const currentUserInfo = getUserInfo();
            if (!currentUserInfo) {
              try {
                console.log('🔄 userInfo 없음 - 사용자 정보 API 호출 중...');
                const userMeResponse = await userApi.getMe();
                const userData = userMeResponse.data;
                
                // UserData를 UserInfo 형식으로 변환
                const userInfo: UserInfo = {
                  id: String(userData.id),
                  nickname: userData.nickname,
                  profileImage: userData.profileImage,
                  isNew: false, // 재로그인 시에는 신규 사용자가 아님
                  providerType: userData.provider.type,
                };
                
                setUserInfo(userInfo);
                console.log('✅ 사용자 정보 저장 완료');
              } catch (error) {
                console.error('❌ 사용자 정보 가져오기 실패:', error);
                // 사용자 정보 가져오기 실패 시 로그인 페이지 유지
                setIsRedirecting(false);
                return;
              }
            }

            // userInfo 저장이 완료된 후 /home으로 리다이렉트
            // localStorage에 저장된 userInfo가 반영되도록 약간의 지연 추가
            await new Promise((resolve) => setTimeout(resolve, 0));
            console.log('✅ userInfo 저장 완료 - /home으로 리다이렉트');
            router.replace('/home');
          } else {
            console.log(
              '❌ refreshToken으로 새 accessToken 발급 실패 - 로그인 페이지 유지'
            );
            setIsRedirecting(false);
          }
        } catch (error) {
          console.error(
            '❌ refreshToken으로 새 accessToken 발급 중 오류:',
            error
          );
          setIsRedirecting(false);
        }
      })();
    }
  }, [router, hasAuthParams, searchParams]);

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
    const isLogoutSuccess = searchParams.get('toast-logout-success');
    const isDeleteUserSuccess = searchParams.get('toast-user-delete-success');

    if (error) {
      setError(decodeURIComponent(error));
      setLoadingProvider(null); // 에러 발생 시 로딩 해제
    }

    if (isLogoutSuccess && !toastShownRef.current.logout) {
      toastShownRef.current.logout = true;
      toast.success('로그아웃이 완료되었어요', {
        position: 'top-center',
        style: {
          backgroundColor: '#3C3C3F',
          marginTop: '34px',
        },
      });
      // URL에서 파라미터 제거
      const url = new URL(window.location.href);
      url.searchParams.delete('toast-logout-success');
      window.history.replaceState({}, '', url.toString());
    }

    if (isDeleteUserSuccess && !toastShownRef.current.deleteUser) {
      toastShownRef.current.deleteUser = true;
      toast.success('회원 탈퇴가 완료되었어요', {
        position: 'top-center',
        style: {
          backgroundColor: '#3C3C3F',
          marginTop: '34px',
        },
      });
      // URL에서 파라미터 제거
      const url = new URL(window.location.href);
      url.searchParams.delete('toast-user-delete-success');
      window.history.replaceState({}, '', url.toString());
    }
  }, [searchParams]);

  // code 파라미터가 있으면 token 엔드포인트로 요청
  useEffect(() => {
    const code = searchParams.get('code');
    // provider 또는 providerType 파라미터 확인 (백엔드 서버가 providerType으로 보낼 수 있음)
    const providerParam =
      searchParams.get('provider') || searchParams.get('providerType');
    const provider = providerParam ? providerParam.toLowerCase() : 'kakao'; // 기본값은 kakao

    if (!code) return;

    // code 파라미터가 있으면 이미 리디렉션이 일어났으므로 로딩 해제
    setLoadingProvider(null);

    const handleTokenRequest = async () => {
      try {
        const tokenEndpoint =
          provider === 'apple'
            ? API_ENDPOINTS.AUTH.APPLE_TOKEN
            : API_ENDPOINTS.AUTH.KAKAO_TOKEN;

        const tokenUrl = `${API_BASE}${tokenEndpoint}`;
        console.log('🔐 Token 요청 시작:', {
          provider,
          tokenUrl,
          hasCode: !!code,
          code: `${code.substring(0, 20)}...`,
        });

        const response = await fetch(tokenUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code,
          }),
        });

        console.log('📡 Token 응답:', {
          status: response.status,
          ok: response.ok,
          url: response.url,
        });

        // 302 리디렉션도 성공으로 처리 (리디렉션은 fetch가 자동으로 따라감)
        if (!response.ok && response.status !== 302) {
          const errorText = await response.text();
          console.error('❌ Token 요청 실패:', errorText);
          setError('토큰 요청에 실패했습니다.');
          setLoadingProvider(null);
          return;
        }

        const data = await response.json();
        console.log('✅ Token 요청 성공:', data);

        // URL에서 code와 provider 파라미터 제거
        const url = new URL(window.location.href);
        url.searchParams.delete('code');
        url.searchParams.delete('provider');
        window.history.replaceState({}, '', url.toString());

        // 응답에서 사용자 정보가 오면 처리
        if (data.id || data.user) {
          const userInfo = data.user || {
            id: data.id,
            nickname: data.nickname,
            profileImage: data.profileImage,
            isNew: data.isNew,
            providerType: data.providerType || provider.toUpperCase(),
          };
          setUserInfo(userInfo);

          // 신규 사용자일 때만 약관 동의 바텀시트 표시
          if (userInfo.isNew) {
            router.push(`${PAGE_ROUTES.AUTH}/terms-bottomsheet`);
          } else {
            router.push('/home');
          }
        }

        // accessToken과 refreshToken 저장
        if (data.accessToken) {
          setAccessToken(data.accessToken);
        }
        if (data.refreshToken) {
          await setRefreshToken(data.refreshToken);
        }
      } catch (error) {
        console.error('Token 요청 에러:', error);
        setError('토큰 요청 중 오류가 발생했습니다.');
        setLoadingProvider(null);
      }
    };

    handleTokenRequest();
  }, [searchParams, router]);

  useEffect(() => {
    const userInfo = extractUserInfo();
    if (!userInfo) return;

    setUserInfo(userInfo);

    // URL 쿼리 제거
    const url = new URL(window.location.href);
    url.search = '';
    window.history.replaceState({}, '', url.toString());

    // 신규 사용자일 때만 약관 동의 바텀시트 표시
    if (userInfo.isNew) {
      router.push(`${PAGE_ROUTES.AUTH}/terms-bottomsheet`);
    } else {
      // 기존 사용자는 바로 홈으로 이동
      router.push('/home');
    }

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
  }, [extractUserInfo, router]);

  // 디바운스된 로그인 핸들러
  const handleLoginSubmit = useCallback(
    (
      e: React.FormEvent<HTMLFormElement>,
      form: HTMLFormElement,
      provider: 'kakao' | 'apple'
    ) => {
      e.preventDefault();

      // 이미 로딩 중이면 무시
      if (loadingProvider) return;

      // 기존 타이머가 있으면 취소
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // 디바운스 타이머 설정 (300ms)
      debounceTimerRef.current = setTimeout(() => {
        setLoadingProvider(provider);
        // form 제출
        form.submit();
      }, 300);
    },
    [loadingProvider]
  );

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // 로딩 타임아웃 처리 (10초 후 자동 해제)
  useEffect(() => {
    if (!loadingProvider) return;

    const timeoutId = setTimeout(() => {
      setLoadingProvider(null);
    }, 10000); // 10초 후 자동 해제

    return () => {
      clearTimeout(timeoutId);
    };
  }, [loadingProvider]);

  if (hasAuthParams) return null;

  // 리다이렉트 중일 때 로딩 UI 표시
  if (isRedirecting) {
    return (
      <div
        className="
    h-dvh relative overflow-hidden [background-color:var(--Background-Background-Primary,#1D1E20)]
    bg-[radial-gradient(54.67%_121.62%_at_12.93%_70.32%,_rgba(9,4,27,0.20)_0%,_rgba(73,179,169,0.20)_100%)]
    bg-no-repeat
     [background-size:100%_100%]
    bg-[position:center]
    flex flex-col items-center justify-center
    text-white
  "
      >
        <div className="relative z-10 flex flex-col items-center justify-center">
          {/* 로딩 스피너 */}
          <div className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin mb-4" />
          <p className="text-body2-m text-gray-400">로그인 정보를 확인하고 있어요</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
    h-dvh relative overflow-hidden [background-color:var(--Background-Background-Primary,#1D1E20)]
    bg-[radial-gradient(54.67%_121.62%_at_12.93%_70.32%,_rgba(9,4,27,0.20)_0%,_rgba(73,179,169,0.20)_100%)]
    bg-no-repeat
     [background-size:100%_100%]
    bg-[position:center]
    flex flex-col items-center justify-center
    text-white
 
  "
    >
      <div
        className="z-20 image-container"
        style={{ width: '375px', height: '500px', position: 'relative' }} // 부모에 명시적 크기 및 position: relative 지정
      >
        <Image
          src={loginCharacter}
          alt="로그인 캐릭터 이미지"
          fill // 부모 요소를 채움
          style={{ objectFit: 'cover' }} // 이미지 채우는 방식 (cover, contain 등)
          priority
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
        priority
        className="absolute z-10 top-[207.49px] right-0 w-[345px] h-[345px]"
      />
      <Image
        src={bgGradient3}
        width={284}
        height={284}
        alt="배경 그라디언트3"
        priority
        className="absolute z-10 top-[496px] right-0 w-[284px] h-[284px]"
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

        <div className="flex flex-col gap-3 min-h-[7rem]">
          <form
            method="POST"
            action={KAKAO_LOGIN_INITIATE_URL}
            onSubmit={(e) => {
              const form = e.currentTarget;
              handleLoginSubmit(e, form, 'kakao');
            }}
          >
            <input type="hidden" name="redirectUri" value={redirectUri} />
            <input type="hidden" name="responseType" value="code" />
            <KakaoLoginButton
              disabled={!!loadingProvider}
              isLoading={loadingProvider === 'kakao'}
            />
          </form>
          {showAppleLogin ? (
            <form
              method="POST"
              action={APPLE_LOGIN_INITIATE_URL}
              onSubmit={(e) => {
                const form = e.currentTarget;
                handleLoginSubmit(e, form, 'apple');
              }}
            >
              <input type="hidden" name="redirectUri" value={redirectUri} />
              <input type="hidden" name="responseType" value="code" />
              <AppleLoginButton
                disabled={!!loadingProvider}
                isLoading={loadingProvider === 'apple'}
              />
            </form>
          ) : (
            <div className="h-[3.5rem]" aria-hidden="true" />
          )}
        </div>
      </div>
      {/* 하단 여백 */}
      <div className="w-full h-[176px]" />
    </div>
  );
}

function AuthPageFallback() {
  return (
    <div
      className="
    h-dvh relative overflow-hidden [background-color:var(--Background-Background-Primary,#1D1E20)]
    bg-[radial-gradient(54.67%_121.62%_at_12.93%_70.32%,_rgba(9,4,27,0.20)_0%,_rgba(73,179,169,0.20)_100%)]
    bg-no-repeat
     [background-size:100%_100%]
    bg-[position:center]
    flex flex-col items-center justify-center
    text-white
  "
    >
      <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,_#090318_0%,#090318_10%,#404DDC80_40%,_#404DDC00_100%)] bg-no-repeat bg-top [background-size:100%_36.75rem]" />
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<AuthPageFallback />}>
      <AuthContent />
    </Suspense>
  );
}
