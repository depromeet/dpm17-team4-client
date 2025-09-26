'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { API_ENDPOINTS } from '@/constants';
import {
  requestAccessToken,
  setAccessToken,
  setUserInfo,
  type UserInfo,
} from './_components/AuthSessionProvider';

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">로그인</h2>
          <p className="text-gray-600">카카오 계정으로 간편하게 시작하세요</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form method="POST" action={KAKAO_LOGIN_INITIATE_URL}>
          <button
            type="submit"
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-black bg-[#FEE500] hover:bg-[#E6CF00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-3"
              viewBox="0 0 24 24"
              fill="currentColor"
              role="img"
              aria-label="카카오 로고"
            >
              <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184S1.5 15.705 1.5 11.185C1.5 6.664 6.201 3 12 3z" />
            </svg>
            카카오로 3초만에 시작하기
          </button>
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
