'use client';

import { CameraIcon } from 'lucide-react';
import Image from 'next/image';
import ChevronRight from '@/assets/home/IC_Chevron_Right.png';
import AppleIcon from '@/assets/my/apple-login.png';
import KakaoIcon from '@/assets/my/kakao-login.png';
import defaultProfileImage from '@/assets/my/profile-image-1.png';
import { Navigator } from '@/components/Navigator';
import { useUserInfo } from '@/hooks';

export default function ProfilePageContent() {
  const { userInfo } = useUserInfo();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigator>
        <Navigator.Center>내 정보 수정</Navigator.Center>
      </Navigator>
      <div className="pt-[56px]">
        {/* Profile Avatar Section */}
        <div className="flex justify-center py-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <Image
                src={defaultProfileImage}
                alt="Profile"
                width={96}
                height={96}
                className="w-24 h-24 rounded-full"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
              <CameraIcon className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="px-4 py-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <span className="text-body2-sb">이름</span>
              <div className="flex items-center space-x-2">
                <span className="text-body2-r text-white">
                  {userInfo?.nickname}
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
                {userInfo?.providerType === 'kakao' ? (
                  <Image src={KakaoIcon} alt="kakao" className="w-6 h-6" />
                ) : (
                  <Image src={AppleIcon} alt="apple" className="w-6 h-6" />
                )}
                <span className="text-body2-r text-white">
                  example@example.com
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-body2-sb">출생 연도</span>
              <div className="flex items-center space-x-2">
                <span className="text-body2-r text-white">2000</span>
                <Image
                  src={ChevronRight}
                  alt="chevron right"
                  className="w-5 h-5"
                />
              </div>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-body2-sb">성별</span>
              <div className="flex items-center space-x-2">
                <span className="text-body2-r text-white">남성</span>
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
    </div>
  );
}
