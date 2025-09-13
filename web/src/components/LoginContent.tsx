'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { PAGE_ROUTES } from '../constants/route.constants';

export default function LoginContent() {
  const { isAuthenticated, user, logout, refreshAuthState, isLoading } =
    useAuth();
  const router = useRouter();

  useEffect(() => {
    refreshAuthState(true);
  }, [refreshAuthState]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push(PAGE_ROUTES.AUTH);
    } catch (error) {
      /**NOTE(yubin): 추후 로그아웃 실패 UI 처리 추가 ~~ */
      console.error('로그아웃 실패:', error);
    }
  };
  if (isLoading && !isAuthenticated) {
    return (
      <div className="mb-6 flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-gray-600">로딩 중...</span>
      </div>
    );
  }

  return (
    <div className="mb-6">
      {isAuthenticated ? (
        <>
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
            <p className="font-semibold">로그인됨</p>
            <p className="text-sm">
              안녕하세요, {user?.nickname || user?.email || '사용자'}님!
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            로그아웃
          </button>
        </>
      ) : (
        <div className="text-center">
          <p className="text-gray-600 mb-4">로그인이 필요합니다.</p>
          <button
            type="button"
            onClick={() => router.push(PAGE_ROUTES.AUTH)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            로그인하기
          </button>
        </div>
      )}
    </div>
  );
}
