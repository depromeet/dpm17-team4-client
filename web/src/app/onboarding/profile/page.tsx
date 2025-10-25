'use client';

import { Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { BirthYearSelectBottomSheet } from '@/app/my/profile/_components/BirthYearSelectBottomSheet';
import { Navigator } from '@/components/Navigator';
import { PAGE_ROUTES } from '@/constants';
import { useUserMeQuery } from '@/hooks';

export default function OnboardingProfilePage() {
  const router = useRouter();
  const { data: userMeData, isLoading, error } = useUserMeQuery();
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

  const handleComplete = () => {
    if (birthYear && gender) {
      // 가입 완료 로직
      console.log('가입 완료:', { birthYear, gender });
      // 다음 단계로 이동하거나 홈으로 이동
      router.push(PAGE_ROUTES.HOME);
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

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="min-h-screen text-white bg-black">
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
      <div className="min-h-screen text-white bg-black">
        <Navigator>
          <Navigator.Center>기본 정보</Navigator.Center>
        </Navigator>
        <div className="flex items-center justify-center min-h-[calc(100vh-56px)]">
          <div className="text-red-500">사용자 정보를 불러오는데 실패했습니다.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white bg-black">
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
            더 질높은 정보를 제공하기 위해 사용됩니다.
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
              className="w-full px-4 py-4 bg-gray-800 rounded-lg text-left text-white focus:outline-none focus:ring-2 focus:ring-primary-600"
            >
              {birthYear ? `${birthYear}년` : '2025'}
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
          disabled={!isComplete}
          className={`w-full py-4 rounded-lg font-medium transition-colors ${
            isComplete
              ? 'bg-primary-600 text-white'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          가입 완료
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
