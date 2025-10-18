'use client';

import Link from 'next/link';
import { Suspense, useState, useEffect } from 'react';
import LoginContent from '@/components/LoginContent';
import AppLockSettings from '@/components/AppLockSettings';

function HomeContent() {
  const [showLockSettings, setShowLockSettings] = useState(false);
  const [isInApp, setIsInApp] = useState(false);

  useEffect(() => {
    // React Native WebView 환경인지 확인
    setIsInApp(typeof window !== 'undefined' && !!window.ReactNativeWebView);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          DPM17 Team4 Web View
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center px-6 leading-relaxed">
          React Native WebView 에서
          <br />
          표시되는 웹 페이지입니다.
        </p>
        {/* 유저 정보 표시 */}
        <LoginContent />
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              기능 목록
            </h2>
            <ul className="text-left space-y-2 text-gray-600">
              <li>• React Native 앱에서 웹뷰로 표시</li>
              <li>• Next.js 15 기반</li>
              <li>• TypeScript 지원</li>
              <li>• Tailwind CSS 스타일링</li>
              <li>• 로컬/서버 푸시</li>
              <li>
                •{' '}
                <Link
                  href="/notification-test"
                  className="text-blue-600 hover:text-blue-800 underline transition-colors"
                >
                  알림 테스트 페이지
                </Link>
              </li>
              <li>
                •{' '}
                <Link
                  href="/home"
                  className="text-pink-600 hover:text-green-800 underline transition-colors"
                >
                  홈 페이지
                </Link>
              </li>
              <li>
                •{' '}
                <Link
                  href="/defecation"
                  className="text-green-600 hover:text-green-800 underline transition-colors"
                >
                  배변 기록 페이지
                </Link>
              </li>
              <li>
                •{' '}
                <Link
                  href="/report/daily"
                  className="text-purple-600 hover:text-purple-800 underline transition-colors"
                >
                  일일 리포트 페이지
                </Link>
              </li>
              <li>
                •{' '}
                <button
                  onClick={() => setShowLockSettings(true)}
                  className="text-orange-600 hover:text-orange-800 underline transition-colors cursor-pointer"
                >
                  🔒 앱 잠금 설정
                  {!isInApp && ' (앱 내에서만 사용 가능)'}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* 잠금 설정 모달 */}
        {showLockSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <AppLockSettings onClose={() => setShowLockSettings(false)} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
