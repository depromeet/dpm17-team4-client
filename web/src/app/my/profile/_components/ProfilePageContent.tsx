'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import ChevronRight from '@/assets/home/IC_Chevron_Right.png';
import AppleIcon from '@/assets/my/apple-login.png';
import KakaoIcon from '@/assets/my/kakao-login.png';
import { Navigator } from '@/components/Navigator';
import { useUserMeQuery, useUserUpdateMutation } from '@/hooks';
import { AccountDeletionModal } from './AccountDeletionModal';
import { BirthYearSelectBottomSheet } from './BirthYearSelectBottomSheet';
import { GenderSelectBottomSheet } from './GenderSelectBottomSheet';
import { LogoutModal } from './LogoutModal';
import { NameEditBottomSheet } from './NameEditBottomSheet';
import { ProfileAvatar } from './ProfileAvatar';

interface ProfileState {
  name: string;
  birthYear: string;
  gender: string;
  email: string;
  profileImage: string | null;
  type: 'KAKAO' | 'APPLE';
}

interface BottomSheetState {
  isGenderOpen: boolean;
  isBirthYearOpen: boolean;
  isNameEditOpen: boolean;
  isLogoutModalOpen: boolean;
  isAccountDeletionModalOpen: boolean;
}

export default function ProfilePageContent() {
  const { data: userMeData, isLoading, error } = useUserMeQuery();
  const updateUserMutation = useUserUpdateMutation();
  const [profileState, setProfileState] = useState<ProfileState>({
    name: '',
    birthYear: '2000',
    gender: 'male',
    email: '',
    profileImage: null,
    type: 'KAKAO',
  });

  const [bottomSheetState, setBottomSheetState] = useState<BottomSheetState>({
    isGenderOpen: false,
    isBirthYearOpen: false,
    isNameEditOpen: false,
    isLogoutModalOpen: false,
    isAccountDeletionModalOpen: false,
  });

  useEffect(() => {
    if (userMeData) {
      setProfileState((prev) => ({
        ...prev,
        name: userMeData.nickname,
        birthYear: userMeData.birthYear.toString(),
        gender:
          userMeData.gender === 'M'
            ? 'male'
            : userMeData.gender === 'F'
              ? 'female'
              : 'none',
        email: userMeData.email,
        profileImage: userMeData.profileImage,
        type: userMeData.provider?.type,
      }));
    }
  }, [userMeData]);

  const handleImageChange = async (imageUrl: string) => {
    setProfileState((prev) => ({
      ...prev,
      profileImage: imageUrl,
    }));
    console.log('새로운 프로필 이미지:', imageUrl);

    // TODO: 프로필 이미지 수정 blob 파일 형태로 추가
    try {
      await updateUserMutation.mutateAsync({
        profileImage: imageUrl,
      });
    } catch (error) {
      console.error('프로필 이미지 업데이트 실패:', error);
    }
  };

  const handleGenderClick = () => {
    setBottomSheetState((prev) => ({ ...prev, isGenderOpen: true }));
  };

  const handleBirthYearClick = () => {
    setBottomSheetState((prev) => ({ ...prev, isBirthYearOpen: true }));
  };

  const handleNameClick = () => {
    setBottomSheetState((prev) => ({ ...prev, isNameEditOpen: true }));
  };

  const handleGenderSelect = async (gender: string) => {
    setProfileState((prev) => ({ ...prev, gender }));

    // TODO: 성별 업데이트 선택안함 옵션 서버 대응 필요
    try {
      await updateUserMutation.mutateAsync({
        gender: gender === 'male' ? 'M' : gender === 'female' ? 'F' : null,
      });
    } catch (error) {
      console.error('성별 업데이트 실패:', error);
    }
  };

  const handleBirthYearSelect = async (year: string) => {
    setProfileState((prev) => ({ ...prev, birthYear: year }));

    try {
      await updateUserMutation.mutateAsync({
        birthYear: parseInt(year),
      });
    } catch (error) {
      console.error('출생연도 업데이트 실패:', error);
    }
  };

  const handleNameChange = async (name: string) => {
    setProfileState((prev) => ({ ...prev, name }));
    console.log('변경된 이름:', name);

    try {
      await updateUserMutation.mutateAsync({
        nickname: name,
      });
    } catch (error) {
      console.error('이름 업데이트 실패:', error);
    }
  };

  const handleLogoutClick = () => {
    setBottomSheetState((prev) => ({ ...prev, isLogoutModalOpen: true }));
  };

  const handleAccountDeletionClick = () => {
    setBottomSheetState((prev) => ({
      ...prev,
      isAccountDeletionModalOpen: true,
    }));
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

  const isUpdating = updateUserMutation.isPending;

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Navigator>
          <Navigator.Center>내 정보 수정</Navigator.Center>
        </Navigator>
        <div className="pt-14 flex items-center justify-center min-h-[calc(100vh-56px)]">
          <div className="text-white">로딩 중...</div>
        </div>
      </div>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Navigator>
          <Navigator.Center>내 정보 수정</Navigator.Center>
        </Navigator>
        <div className="pt-14 flex items-center justify-center min-h-[calc(100vh-56px)]">
          <div className="text-red-500">
            사용자 정보를 불러오는데 실패했습니다.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigator>
        <Navigator.Center>내 정보 수정</Navigator.Center>
      </Navigator>
      <div className="pt-14">
        {/* Profile Avatar Section */}
        <ProfileAvatar
          currentImage={profileState.profileImage || undefined}
          onImageChange={handleImageChange}
        />

        {/* Personal Information Section */}
        <div className="px-4 py-4">
          <div className="space-y-4">
            <button
              type="button"
              className="flex items-center justify-between py-3 cursor-pointer w-full"
              onClick={handleNameClick}
              disabled={isUpdating}
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
            </button>
            <button
              type="button"
              className="flex items-center justify-between py-3 cursor-pointer w-full"
            >
              <span className="text-body2-sb">연결된 계정</span>
              <div className="flex items-center space-x-2">
                {profileState.type === 'KAKAO' ? (
                  <Image src={KakaoIcon} alt="kakao" className="w-6 h-6" />
                ) : (
                  <Image src={AppleIcon} alt="apple" className="w-6 h-6" />
                )}
                <span className="text-body2-r text-white">
                  {profileState.email}
                </span>
              </div>
            </button>
            <button
              type="button"
              className="flex items-center justify-between py-3 cursor-pointer w-full"
              onClick={handleBirthYearClick}
              disabled={isUpdating}
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
            </button>
            <button
              type="button"
              className="flex items-center justify-between py-3 cursor-pointer w-full"
              onClick={handleGenderClick}
              disabled={isUpdating}
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
            </button>
          </div>
        </div>

        {/* Account Actions Section 
        TODO: 회원 탈퇴 기능 추가
        TODO: 로그아웃 기능 추가
        */}
        <div className="px-4 py-4">
          <div className="border-t border-gray-700 pt-4">
            <div className="space-y-4">
              <button
                type="button"
                className="flex items-center justify-between py-3 cursor-pointer w-full"
                onClick={handleLogoutClick}
              >
                <span className="text-body2-sb">로그아웃</span>
                <Image
                  src={ChevronRight}
                  alt="chevron right"
                  className="w-5 h-5"
                />
              </button>
              <button
                type="button"
                className="flex items-center justify-between py-3 cursor-pointer w-full"
                onClick={handleAccountDeletionClick}
              >
                <span className="text-body2-sb">회원 탈퇴</span>
                <Image
                  src={ChevronRight}
                  alt="chevron right"
                  className="w-5 h-5"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gender Select Bottom Sheet */}
      <GenderSelectBottomSheet
        isOpen={bottomSheetState.isGenderOpen}
        onClose={() =>
          setBottomSheetState((prev) => ({ ...prev, isGenderOpen: false }))
        }
        currentGender={profileState.gender}
        onGenderSelect={handleGenderSelect}
      />

      {/* Birth Year Select Bottom Sheet */}
      <BirthYearSelectBottomSheet
        isOpen={bottomSheetState.isBirthYearOpen}
        onClose={() =>
          setBottomSheetState((prev) => ({ ...prev, isBirthYearOpen: false }))
        }
        currentYear={profileState.birthYear}
        onYearSelect={handleBirthYearSelect}
      />

      {/* Name Edit Bottom Sheet */}
      <NameEditBottomSheet
        isOpen={bottomSheetState.isNameEditOpen}
        onClose={() =>
          setBottomSheetState((prev) => ({ ...prev, isNameEditOpen: false }))
        }
        currentName={profileState.name}
        onNameChange={handleNameChange}
      />

      {/* Logout Modal */}
      <LogoutModal
        isOpen={bottomSheetState.isLogoutModalOpen}
        onClose={() =>
          setBottomSheetState((prev) => ({ ...prev, isLogoutModalOpen: false }))
        }
      />

      {/* Account Deletion Modal */}
      <AccountDeletionModal
        isOpen={bottomSheetState.isAccountDeletionModalOpen}
        onClose={() =>
          setBottomSheetState((prev) => ({
            ...prev,
            isAccountDeletionModalOpen: false,
          }))
        }
      />
    </div>
  );
}
