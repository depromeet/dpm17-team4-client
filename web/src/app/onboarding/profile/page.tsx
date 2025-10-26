'use client';

import { Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BirthYearSelectBottomSheet } from '@/app/my/profile/_components/BirthYearSelectBottomSheet';
import { Navigator } from '@/components/Navigator';
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

  const handleComplete = async () => {
    if (birthYear && gender) {
      try {
        await updateUserMutation.mutateAsync({
          birthYear: parseInt(birthYear),
          gender: gender === 'male' ? 'M' : 'F',
        });

        //TODO(seieun): 회원가입 완료 페이지로 수정 필요
        router.push(PAGE_ROUTES.HOME);
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
        <Navigator>
          <Navigator.Center>기본 정보</Navigator.Center>
        </Navigator>
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
        <Navigator>
          <Navigator.Center>기본 정보</Navigator.Center>
        </Navigator>
        <div className="flex items-center justify-center min-h-[calc(100vh-56px)]">
          <div className="text-red-500">
            사용자 정보를 불러오는데 실패했습니다.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white bg-gray-900">
      {/* Header */}
      <Navigator>
        <Navigator.Center>기본 정보</Navigator.Center>
      </Navigator>

      {/* Main Content */}
      <div className="px-4 pt-20">
        {/* Title */}
        <div className="mb-[30px]">
          <h2 className="text-2xl font-bold mb-2">
            출생 연도와 성별을 <br />
            알려주세요
          </h2>
          <p className="text-gray-400 text-body4-m">
            더 좋은 정보를 제공하기 위해 사용됩니다.
          </p>
        </div>

        {/* Birth Year Section */}
        <div className="mb-8">
          <div className="block text-sm font-medium text-gray-300 mb-3">
            출생 연도
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={handleOpenBirthYearBottomSheet}
              className={`w-full px-4 py-4 bg-gray-800 rounded-lg text-left text-white focus:outline-none focus:ring-2 focus:ring-primary-600 ${
                birthYear ? 'text-white' : 'text-gray-600'
              }`}
            >
              {birthYear ? `${birthYear}년` : '생년원일'}
            </button>
            <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Gender Section */}
        <div className="mb-12">
          <div className="block text-sm font-medium text-gray-300 mb-3">
            성별
          </div>
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => setGender('female')}
              className={`flex-1 py-4 px-6 rounded-lg font-medium transition-colors ${
                gender === 'female'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              여성
            </button>
            <button
              type="button"
              onClick={() => setGender('male')}
              className={`flex-1 py-4 px-6 rounded-lg font-medium transition-colors ${
                gender === 'male'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
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
          className={`w-full py-4 rounded-lg font-medium transition-colors ${
            isComplete && !isUpdating
              ? 'bg-primary-600 text-white'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
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
