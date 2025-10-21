'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Navigator } from '@/components';
import { PAGE_ROUTES } from '@/constants';
import { PasswordIndicator } from './_components/passoword-indicator';
import PasswordKeypad from './_components/password-keypad';

const MAX_PASSWORD_LENGTH = 4;

export type Step = 'first' | 'confirm' | 'complete';

export default function SettingPasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [firstPassword, setFirstPassword] = useState('');
  const [step, setStep] = useState<Step>('first');
  const [error, setError] = useState('');

  /** TODO(Yubin): 비밀번호 첫 설정 or 기존 비밀번호 변경 분기 처리  */

  const router = useRouter();

  useEffect(() => {
    if (currentPassword.length === MAX_PASSWORD_LENGTH) {
      if (step === 'first') {
        setFirstPassword(currentPassword);
        setCurrentPassword('');
        setStep('confirm');
        setError('');
      } else if (step === 'confirm') {
        if (currentPassword === firstPassword) {
          setStep('first');
          const message = encodeURIComponent('비밀번호 설정이 완료되었습니다.');
          // TODO: UI 플로우를 위한 임시로 비밀번호 저장
          localStorage.setItem('password', currentPassword);

          router.push(
            `${PAGE_ROUTES.APP_LOCK}?toastMessage=${message}&toastType=success`
          );
        } else {
          toast.error('비밀번호가 일치하지 않습니다.', {
            position: 'top-center',
            duration: 1000,
            style: {
              background: '#3c3c3c',
            },
          });
          setCurrentPassword('');
        }
      }
    }
  }, [currentPassword, step, firstPassword, router.push]);

  const handleAddNumber = (number: string) => {
    if (error) setError('');
    if (currentPassword.length < MAX_PASSWORD_LENGTH) {
      setCurrentPassword((prev) => prev + number);
    }
  };
  const handleDeleteNumber = () => {
    if (error) setError('');
    setCurrentPassword((prev) => prev.slice(0, -1));
  };

  const handleResetPassword = () => {
    setStep('first');
    setCurrentPassword('');
    setFirstPassword('');
    setError('');
  };

  const getTitle = () => {
    if (step === 'first') return '사용할 비밀번호를 입력해주세요';
    if (step === 'confirm') return '비밀번호를 한 번 더 입력해주세요';
    return '';
  };
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Navigator>
        <Navigator.Center>비밀번호 설정</Navigator.Center>
      </Navigator>

      <div className="pt-14 flex-1 flex flex-col">
        {/* 비밀번호 입력 현황 영역*/}
        <PasswordIndicator
          currentPassword={currentPassword}
          title={getTitle}
          onReset={handleResetPassword}
          step={step}
        />
        {/* 숫자 키 판 영역 */}
        <PasswordKeypad
          onAddNumber={handleAddNumber}
          onDeleteNumber={handleDeleteNumber}
        />
        {/* 하단 빈 공간 */}
        <div className="w-full h-16" />
      </div>
    </div>
  );
}
