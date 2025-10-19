'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import ChevronRight from '@/assets/home/IC_Chevron_Right.png';
import AppleIcon from '@/assets/my/apple-login.png';
import KakaoIcon from '@/assets/my/kakao-login.png';
import { Navigator } from '@/components/Navigator';
import { useUserInfo } from '@/hooks';
import { ProfileAvatar } from './_components/ProfileAvatar';
import { GenderSelectBottomSheet } from './GenderSelectBottomSheet';
import { BirthYearSelectBottomSheet } from './_components/BirthYearSelectBottomSheet';
import { NameEditBottomSheet } from './_components/NameEditBottomSheet';

interface ProfileState {
  name: string;
  birthYear: string;
  gender: string;
  profileImage: string | null;
}

interface BottomSheetState {
  isGenderOpen: boolean;
  isBirthYearOpen: boolean;
  isNameEditOpen: boolean;
}

export default function ProfilePageContent() {
  const { userInfo } = useUserInfo();
  
  const [profileState, setProfileState] = useState<ProfileState>({
    name: '',
    birthYear: '2000',
    gender: 'male',
    profileImage: null,
  });
  
  const [bottomSheetState, setBottomSheetState] = useState<BottomSheetState>({
    isGenderOpen: false,
    isBirthYearOpen: false,
    isNameEditOpen: false,
  });

  // userInfo가 변경될 때마다 profileState 업데이트
  useEffect(() => {
    if (userInfo) {
      setProfileState(prev => ({
        ...prev,
        name: userInfo.nickname || '',
        // userInfo에서 다른 필드들도 가져올 수 있다면 여기에 추가
      }));
    }
  }, [userInfo]);

  const handleImageChange = (imageUrl: string) => {
    setProfileState(prev => ({
      ...prev,
      profileImage: imageUrl,
    }));
    console.log('새로운 프로필 이미지:', imageUrl);
  };

  const handleGenderClick = () => {
    setBottomSheetState(prev => ({ ...prev, isGenderOpen: true }));
  };

  const handleBirthYearClick = () => {
    setBottomSheetState(prev => ({ ...prev, isBirthYearOpen: true }));
  };

  const handleNameClick = () => {
    setBottomSheetState(prev => ({ ...prev, isNameEditOpen: true }));
  };

  const handleGenderSelect = (gender: string) => {
    setProfileState(prev => ({ ...prev, gender }));
    console.log('선택된 성별:', gender);
  };

  const handleBirthYearSelect = (year: string) => {
    setProfileState(prev => ({ ...prev, birthYear: year }));
    console.log('선택된 출생연도:', year);
  };

  const handleNameChange = (name: string) => {
    setProfileState(prev => ({ ...prev, name }));
    console.log('변경된 이름:', name);
  };

  const getGenderLabel = (gender: string) => {
    switch (gender) {
      case 'male':
        return '남성';
      case 'female':
        return '여성';
      case 'none':
        return '선택 안 함';
      default:
        return '남성';
    }
  };

  console.log(userInfo);
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigator>
        <Navigator.Center>내 정보 수정</Navigator.Center>
      </Navigator>
      <div className="pt-[56px]">
        {/* Profile Avatar Section */}
        <ProfileAvatar 
          currentImage={profileState.profileImage || undefined}
          onImageChange={handleImageChange}
        />

        {/* Personal Information Section */}
        <div className="px-4 py-4">
          <div className="space-y-4">
            <div 
              className="flex items-center justify-between py-3 cursor-pointer"
              onClick={handleNameClick}
            >
              <span className="text-body2-sb">이름</span>
              <div className="flex items-center space-x-2">
                <span className="text-body2-r text-white">
                  {profileState.name}
                </span>
                <Image
                  src={ChevronRight}
                  alt="chevron right"
                  className="w-5 h-5"
                />
              </div>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-body2-sb">연결된 계정</span>
              <div className="flex items-center space-x-2">
                {userInfo?.providerType === 'KAKAO' ? (
                  <Image src={KakaoIcon} alt="kakao" className="w-6 h-6" />
                ) : (
                  <Image src={AppleIcon} alt="apple" className="w-6 h-6" />
                )}
                <span className="text-body2-r text-white">
                  example@example.com
                </span>
              </div>
            </div>
            <div 
              className="flex items-center justify-between py-3 cursor-pointer"
              onClick={handleBirthYearClick}
            >
              <span className="text-body2-sb">출생 연도</span>
              <div className="flex items-center space-x-2">
                <span className="text-body2-r text-white">
                  {profileState.birthYear}
                </span>
                <Image
                  src={ChevronRight}
                  alt="chevron right"
                  className="w-5 h-5"
                />
              </div>
            </div>
            <div 
              className="flex items-center justify-between py-3 cursor-pointer"
              onClick={handleGenderClick}
            >
              <span className="text-body2-sb">성별</span>
              <div className="flex items-center space-x-2">
                <span className="text-body2-r text-white">
                  {getGenderLabel(profileState.gender)}
                </span>
                <Image
                  src={ChevronRight}
                  alt="chevron right"
                  className="w-5 h-5"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Account Actions Section */}
        <div className="px-4 py-4">
          <div className="border-t border-gray-700 pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3">
                <span className="text-body2-sb">로그아웃</span>
                <Image
                  src={ChevronRight}
                  alt="chevron right"
                  className="w-5 h-5"
                />
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-body2-sb">회원 탈퇴</span>
                <Image
                  src={ChevronRight}
                  alt="chevron right"
                  className="w-5 h-5"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gender Select Bottom Sheet */}
      <GenderSelectBottomSheet
        isOpen={bottomSheetState.isGenderOpen}
        onClose={() => setBottomSheetState(prev => ({ ...prev, isGenderOpen: false }))}
        currentGender={profileState.gender}
        onGenderSelect={handleGenderSelect}
      />

      {/* Birth Year Select Bottom Sheet */}
      <BirthYearSelectBottomSheet
        isOpen={bottomSheetState.isBirthYearOpen}
        onClose={() => setBottomSheetState(prev => ({ ...prev, isBirthYearOpen: false }))}
        currentYear={profileState.birthYear}
        onYearSelect={handleBirthYearSelect}
      />

      {/* Name Edit Bottom Sheet */}
      <NameEditBottomSheet
        isOpen={bottomSheetState.isNameEditOpen}
        onClose={() => setBottomSheetState(prev => ({ ...prev, isNameEditOpen: false }))}
        currentName={profileState.name}
        onNameChange={handleNameChange}
      />
    </div>
  );
}
