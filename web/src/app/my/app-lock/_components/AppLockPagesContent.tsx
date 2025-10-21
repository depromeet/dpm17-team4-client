'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ChevronIcon, Navigator, Toggle } from '@/components';
import { PAGE_ROUTES } from '@/constants';
import { useToggle } from '@/hooks/useToggle';

export default function AppLockPagesContent() {
  const { isToggleOn: isFaceID } = useToggle();
  const { isToggleOn: isAppLock, handleSwitchToggle: onAppLock } = useToggle();

  const router = useRouter();
  const searchParams = useSearchParams();
  const handleGoSettingsPassword = () => {
    router.push(PAGE_ROUTES.PASSWORD_SETTINGS);
  };
  const handleAppLockToggle = () => {
    onAppLock();
    const newState = !isAppLock;

    if (newState) {
      router.push(PAGE_ROUTES.PASSWORD_SETTINGS);
      return;
    }

    toast.success(
      newState ? '앱 잠금 화면을 켰습니다.' : '앱 잠금 화면을 껐습니다.',
      {
        position: 'top-center',
        style: {
          backgroundColor: '#3c3c3c',
          color: 'white',
        },
      }
    );
  };
  const handleFaceIDToggle = () => {
    toast.error('Face ID 기능은 현재 개발 중입니다.', {
      position: 'top-center',
      style: {
        backgroundColor: '#3c3c3c',
        color: 'white',
      },
    });
  };

  useEffect(() => {
    const toastMessage = searchParams.get('toastMessage');
    const toastType = searchParams.get('toastType');

    if (toastMessage && toastType === 'success') {
      toast.success(decodeURIComponent(toastMessage), {
        position: 'top-center',
      });
      const newPath = window.location.pathname;
      router.replace(newPath);
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigator>
        <Navigator.Center>앱 잠금</Navigator.Center>
      </Navigator>
      <div className="pt-14  px-4">
        <ul className="flex flex-col gap-5 mt-4">
          <li className="text-body2-sb text-white flex justify-between items-center">
            <div>앱 잠금 화면</div>
            <Toggle isOn={isAppLock} onSwitch={handleAppLockToggle} />
          </li>
          <li className="text-body2-sb text-white flex justify-between items-center">
            <div>비밀번호 변경</div>
            <button
              type="button"
              className="p-2 -mr-2"
              aria-label="비밀번호 설정으로 이동"
              onClick={handleGoSettingsPassword}
            >
              <ChevronIcon type="right" />
            </button>
          </li>
          <li className="text-body2-sb text-white flex justify-between items-center">
            <div>Face ID 사용</div>
            <Toggle isOn={isFaceID} onSwitch={handleFaceIDToggle} />
          </li>
        </ul>
      </div>
    </div>
  );
}
