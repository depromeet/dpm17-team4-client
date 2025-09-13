'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { API_ROUTES, PAGE_ROUTES } from '@/constants/route.constants';
import { useAuth } from '@/lib/hooks/useAuth';

function AuthContent() {
  const { isAuthenticated, isLoading, refreshAuthState } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  const handleKakaoLogin = async () => {
    try {
      const mockCode = `mock_code_${Date.now()}`;

      const response = await fetch(API_ROUTES.AUTH_LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: mockCode }),
      });

      if (!response.ok) {
        throw new Error('로그인 실패');
      }

      const user = await response.json();
      console.log('로그인 성공:', user);

      await refreshAuthState();

      router.push(PAGE_ROUTES.HOME);
    } catch (error) {
      console.error('로그인 에러:', error);
      setError('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  /**에러 파라미터 처리*/
  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      switch (errorParam) {
        case 'login_failed':
          setError('카카오 로그인에 실패했습니다. 다시 시도해주세요.');
          break;
        case 'callback_failed':
          setError('로그인 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
          break;
        default:
          setError('알 수 없는 오류가 발생했습니다.');
      }
    }
  }, [searchParams]);

  /**이미 로그인된 경우 메인 페이지로 리다이렉트*/
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push(PAGE_ROUTES.HOME);
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">로그인</h2>
          <p className="text-gray-600">카카오 계정으로 로그인하세요</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <button
            type="button"
            onClick={handleKakaoLogin}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
              role="img"
              aria-label="카카오 로그인"
            >
              <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11L9.5 21.5c-1.5.5-3.5-.5-3.5-2v-1.5c-2.5-1.5-4-4-4-7 0-4.521 4.701-8.185 10.5-8.185z" />
            </svg>
            카카오로 로그인
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Auth() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">로딩 중...</p>
          </div>
        </div>
      }
    >
      <AuthContent />
    </Suspense>
  );
}
