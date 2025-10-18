'use client';

import React, { useState, useEffect } from 'react';
import { useAppLock, LockStatus } from '@/utils/appLock';

interface AppLockSettingsProps {
  onClose?: () => void;
}

export default function AppLockSettings({ onClose }: AppLockSettingsProps) {
  const {
    openSettings,
    checkStatus,
    getStatus,
    isEnabled,
    isLocked,
    isBiometricEnabled,
    getAutoLockTimeout,
  } = useAppLock();

  const [lockStatus, setLockStatus] = useState<LockStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInApp, setIsInApp] = useState(false);

  useEffect(() => {
    // React Native WebView 환경인지 확인
    setIsInApp(typeof window !== 'undefined' && !!window.ReactNativeWebView);
  }, []);

  useEffect(() => {
    loadLockStatus();
  }, []);

  const loadLockStatus = async () => {
    setIsLoading(true);
    try {
      const status = await checkStatus();
      setLockStatus(status);
    } catch (error) {
      console.error('잠금 상태 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenNativeSettings = () => {
    try {
      openSettings();
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error('네이티브 설정 열기 실패:', error);
      alert('앱 잠금 설정을 열 수 없습니다. React Native 앱 내에서 실행해주세요.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-600">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">앱 잠금 설정</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* 잠금 상태 표시 */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-700 mb-2">현재 상태</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>잠금 활성화:</span>
              <span className={isEnabled() ? 'text-green-600' : 'text-red-600'}>
                {isEnabled() ? '활성화됨' : '비활성화됨'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>현재 상태:</span>
              <span className={isLocked() ? 'text-red-600' : 'text-green-600'}>
                {isLocked() ? '잠김' : '잠금 해제됨'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>생체인증:</span>
              <span className={isBiometricEnabled() ? 'text-green-600' : 'text-gray-600'}>
                {isBiometricEnabled() ? '사용 가능' : '사용 불가'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>자동 잠금:</span>
              <span className="text-gray-600">
                {getAutoLockTimeout() === 0 ? '즉시' : `${getAutoLockTimeout()}분`}
              </span>
            </div>
          </div>
        </div>

        {/* 설명 */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">앱 잠금 기능</h4>
          <p className="text-sm text-blue-700">
            앱 잠금 기능을 사용하면 앱을 보호할 수 있습니다. 
            PIN 코드나 생체인증(Face ID, Touch ID, 지문인식)을 사용하여 
            앱에 접근할 수 있습니다.
          </p>
        </div>

        {/* 네이티브 설정 열기 버튼 */}
        <button
          onClick={handleOpenNativeSettings}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          {isInApp ? '잠금 설정 열기' : '앱 내에서만 사용 가능'}
        </button>
        
        {!isInApp && (
          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800 text-center">
              ⚠️ 앱 잠금 설정은 React Native 앱 내에서만 사용할 수 있습니다.
              <br />
              웹 브라우저에서는 설정을 변경할 수 없습니다.
            </p>
          </div>
        )}

        {/* 새로고침 버튼 */}
        <button
          onClick={loadLockStatus}
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          상태 새로고침
        </button>
      </div>

      {/* 사용법 안내 */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="font-semibold text-gray-700 mb-2">사용법</h4>
        <ol className="text-sm text-gray-600 space-y-1">
          <li>1. "잠금 설정 열기" 버튼을 클릭합니다</li>
          <li>2. 앱 잠금을 활성화합니다</li>
          <li>3. PIN 코드를 설정합니다</li>
          <li>4. 생체인증을 활성화합니다 (선택사항)</li>
          <li>5. 자동 잠금 시간을 설정합니다</li>
        </ol>
      </div>
    </div>
  );
}
