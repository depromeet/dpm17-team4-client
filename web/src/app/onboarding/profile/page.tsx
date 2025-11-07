'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { BirthYearSelectBottomSheet } from '@/app/my/profile/_components/BirthYearSelectBottomSheet';
import CalendarIcon from '@/assets/onboarding/calendar.svg';
import { ArrowIcon } from '@/components/icons/Arrow';
import { PAGE_ROUTES } from '@/constants';
import { useUserMeQuery, useUserUpdateMutation } from '@/hooks';
export default function OnboardingProfilePage() {
  const router = useRouter();
  const { data: userMeData, isLoading, error } = useUserMeQuery();
  const updateUserMutation = useUserUpdateMutation();
  const [birthYear, setBirthYear] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [isBirthYearBottomSheetOpen, setIsBirthYearBottomSheetOpen] =
    useState(false);

  // 온보딩 중 이탈 감지 및 회원 탈퇴 처리
  const handleOnboardingExit = useCallback(async () => {
    try {
      const { userApi } = await import('@/apis/userApi');
      await userApi.deleteMe();
      console.log('✅ 온보딩 중 이탈 - 회원 탈퇴 완료');
    } catch (error) {
      console.error('❌ 온보딩 중 이탈 - 회원 탈퇴 실패:', error);
    } finally {
      // 로컬 데이터 정리 및 인증 페이지로 리다이렉트
      const { clearAccessToken, clearUserInfo } = await import(
        '@/app/auth/_components/AuthSessionProvider'
      );
      clearAccessToken();
      clearUserInfo();

      // 세션 캐시도 정리
      try {
        const { clearClientSessionCache } = await import('@/lib/session');
        clearClientSessionCache();
      } catch (error) {
        console.warn('⚠️ 세션 캐시 정리 실패:', error);
      }

      // 인증 페이지로 리다이렉트
      window.location.href = PAGE_ROUTES.AUTH;
    }
  }, []);

  // API 데이터로 초기값 설정
  useEffect(() => {
    if (userMeData) {
      if (userMeData.birthYear) {
        setBirthYear(userMeData.birthYear.toString());
      }
      if (userMeData.gender) {
        setGender(userMeData.gender === 'M' ? 'male' : 'female');
      }
    }
  }, [userMeData]);

  // 온보딩 중 이탈 감지 (브라우저 뒤로가기)
  useEffect(() => {
    const handlePopState = () => {
      // 브라우저 뒤로가기 감지
      handleOnboardingExit();
    };

    // 이벤트 리스너 등록
    window.addEventListener('popstate', handlePopState);

    // 컴포넌트 언마운트 시 정리
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [handleOnboardingExit]);

  const handleComplete = async () => {
    if (birthYear && gender) {
      try {
        await updateUserMutation.mutateAsync({
          birthYear: parseInt(birthYear, 10),
          gender: gender === 'male' ? 'M' : 'F',
        });
        router.push(PAGE_ROUTES.ONBOARDING_COMPLETE);
      } catch (error) {
        console.error('사용자 정보 업데이트 실패:', error);
        // 에러 처리 (토스트 메시지 등)
      }
    }
  };

  const handleBirthYearSelect = (year: string) => {
    setBirthYear(year);
  };

  const handleOpenBirthYearBottomSheet = () => {
    setIsBirthYearBottomSheetOpen(true);
  };

  const handleCloseBirthYearBottomSheet = () => {
    setIsBirthYearBottomSheetOpen(false);
  };

  const isComplete = birthYear && gender;
  const isUpdating = updateUserMutation.isPending;

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="min-h-screen text-white bg-gray-900">
        <div className="fixed top-0 left-0 w-full h-[56px] z-10 bg-gray-900 text-white p-4 flex shrink-0">
          <button
            type="button"
            onClick={handleOnboardingExit}
            className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 z-10"
          >
            <ArrowIcon type="left" />
          </button>
          <div className="flex-1 flex justify-center items-center">
            <span className="text-h3">기본 정보</span>
          </div>
        </div>
        <div className="flex items-center justify-center min-h-[calc(100vh-56px)]">
          <div className="text-white">로딩 중...</div>
        </div>
      </div>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <div className="min-h-screen text-white bg-gray-900">
        <div className="fixed top-0 left-0 w-full h-[56px] z-10 bg-gray-900 text-white p-4 flex shrink-0">
          <button
            type="button"
            onClick={handleOnboardingExit}
            className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 z-10"
          >
            <ArrowIcon type="left" />
          </button>
          <div className="flex-1 flex justify-center items-center">
            <span className="text-h3">기본 정보</span>
          </div>
        </div>
        <div className="flex items-center justify-center min-h-[calc(100vh-56px)]">
          <div className="text-red-500">
            사용자 정보를 불러오는데 실패했습니다.
          </div>
        </div>
      </div>
    );
  }

  console.log(birthYear);

  return (
    <div className="min-h-screen text-white bg-gray-900">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full h-[56px] z-10 bg-gray-900 text-white p-4 flex shrink-0">
        <button
          type="button"
          onClick={handleOnboardingExit}
          className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 z-10"
        >
          {' '}
          <ArrowIcon type="left" />
        </button>
        <div className="flex-1 flex justify-center items-center">
          <span className="text-h3">기본 정보</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pt-20">
        {/* Title */}
        <div className="mb-[30px]">
          <h2 className="text-h3 font-bold mb-2">
            출생 연도와 성별을 <br />
            알려주세요
          </h2>
          <p className="text-gray-400 text-body4-m">
            더 좋은 정보를 제공하기 위해 사용됩니다.
          </p>
        </div>

        {/* Birth Year Section */}
        <div className="mb-8">
          <div className="block text-body3-m text-white mb-3">출생 연도</div>
          <div className="relative">
            <button
              type="button"
              onClick={handleOpenBirthYearBottomSheet}
              className={`w-full px-4 py-4 bg-gray-800 rounded-lg text-left text-body2-r focus:outline-none focus:ring-2 focus:ring-primary-600 ${
                birthYear !== '' ? 'text-white' : 'text-gray-600'
              }`}
            >
              {birthYear !== '' ? `${birthYear}` : '2025'}
            </button>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none">
              <Image src={CalendarIcon} alt="calendar" width={20} height={20} />
            </div>
          </div>
        </div>

        {/* Gender Section */}
        <div className="mb-12">
          <div className="block text-body3-m text-white mb-3">성별</div>
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => setGender('female')}
              className={`flex-1 py-4 px-6 rounded-lg text-button-3 transition-colors ${
                gender === 'female'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              여성
            </button>
            <button
              type="button"
              onClick={() => setGender('male')}
              className={`flex-1 py-4 px-6 rounded-lg text-button-3 transition-colors ${
                gender === 'male'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              남성
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="absolute bottom-8 left-6 right-6">
        <button
          type="button"
          onClick={handleComplete}
          disabled={!isComplete || isUpdating}
          className={`w-full py-[19px] rounded-[10px] text-button-2 transition-colors ${
            isComplete && !isUpdating
              ? 'bg-primary-600 text-white'
              : 'bg-[#523E98] text-[#FFFFFF66] cursor-not-allowed'
          }`}
        >
          {isUpdating ? '저장 중...' : '가입 완료'}
        </button>
      </div>

      {/* Birth Year Bottom Sheet */}
      <BirthYearSelectBottomSheet
        isOpen={isBirthYearBottomSheetOpen}
        onClose={handleCloseBirthYearBottomSheet}
        currentYear={birthYear}
        onYearSelect={handleBirthYearSelect}
      />
    </div>
  );
}
