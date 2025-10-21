'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { ChevronIcon, Navigator, Toggle } from '@/components';
import { PAGE_ROUTES } from '@/constants';
import { useToggle } from '@/hooks/useToggle';

export default function AppLockPagesContent() {
  /* TODO(Yubin): 앱 잠금 플로우를 위한 임시 비밀번호 저장 */
  const hasPassword = !!localStorage.getItem('password');

  const { isToggleOn: isAppLock, handleSwitchToggle: onAppLock } =
    useToggle(hasPassword);
  const { isToggleOn: isFaceID } = useToggle();

  const router = useRouter();
  const searchParams = useSearchParams();
  const handleGoSettingsPassword = () => {
    router.push(PAGE_ROUTES.PASSWORD_SETTINGS);
  };

  const handleAppLockToggle = () => {
    onAppLock();
    if (!isAppLock && !hasPassword) {
      router.push(PAGE_ROUTES.PASSWORD_SETTINGS);
    } else {
      console.log('앱 잠금 기능을 비활성화합니다.');
    }
    toast.success(
      !isAppLock ? '앱 잠금 화면을 켰습니다.' : '앱 잠금 화면을 껐습니다.',
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
          {hasPassword && (
            <>
              <li className="text-body2-sb text-white flex justify-between items-center">
                <div>비밀번호 변경</div>
                <ChevronIcon type="right" onClick={handleGoSettingsPassword} />
              </li>
              <li className="text-body2-sb text-white flex justify-between items-center">
                <div>Face ID 사용</div>
                <Toggle isOn={isFaceID} onSwitch={handleFaceIDToggle} />
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
