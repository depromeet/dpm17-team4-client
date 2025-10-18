'use client';

import { useEffect, useState } from 'react';
import { useAppLock } from '@/utils/appLock';

interface AppLockSettingsProps {
  onClose?: () => void;
}

export default function AppLockSettings({ onClose }: AppLockSettingsProps) {
  const { openSettings } = useAppLock();

  const [isInApp, setIsInApp] = useState(false);

  useEffect(() => {
    // React Native WebView 환경인지 확인
    setIsInApp(typeof window !== 'undefined' && !!window.ReactNativeWebView);
  }, []);

  const handleOpenNativeSettings = () => {
    try {
      openSettings();
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error('네이티브 설정 열기 실패:', error);
      alert(
        '앱 잠금 설정을 열 수 없습니다. React Native 앱 내에서 실행해주세요.'
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">앱 잠금 설정</h2>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* 간단한 설명 */}
        <div className="text-center text-gray-600 mb-6">
          <p className="text-sm">
            앱을 보호하기 위한 잠금 기능을 설정할 수 있습니다.
          </p>
        </div>

        {/* 네이티브 설정 열기 버튼 */}
        <button
          type="button"
          onClick={handleOpenNativeSettings}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors text-lg"
        >
          {isInApp ? '잠금 설정 열기' : '앱 내에서만 사용 가능'}
        </button>

        {!isInApp && (
          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800 text-center">
              ⚠️ 앱 잠금 설정은 React Native 앱 내에서만 사용할 수 있습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
