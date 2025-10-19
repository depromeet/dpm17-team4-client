'use client';

import Image from 'next/image';
import ChevronRight from '@/assets/home/IC_Chevron_Right.png';
import defaultProfileImage from '@/assets/my-page/profile-image-1.png';
import { useUserInfo } from '@/hooks';
import { useNavigationContext } from '@/contexts/NavigationContext';
import { useEffect } from 'react';

export default function MyPage() {
  const { userInfo } = useUserInfo();
  const { handleTabClick } = useNavigationContext();

  useEffect(() => {
    handleTabClick('my');
  }, [handleTabClick]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Main title */}
      <div className="text-left py-[13px] px-[16px]">
        <h1 className="text-title-main">마이</h1>
      </div>

      {/* Profile Section */}
      <div className="px-[16px] pt-[20px] py-[28px]">
        <div className="flex items-center space-x-4">
          <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center">
            <Image
              src={defaultProfileImage}
              alt="Profile"
              width={48}
              height={48}
              className="w-[48px] h-[48px] rounded-full"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold">{userInfo?.nickname}</h2>
            <p className="text-sm text-gray-400">example@example.com</p>
          </div>
          <Image src={ChevronRight} alt="chevron right" className="w-5 h-5" />
        </div>
      </div>
      <div className="bg-gray-700 h-[8px]" />
      {/* Settings Section */}
      <div className="pt-[28px] px-[16px] pb-[24px]">
        <div className="">
          <h3 className="text-sm text-gray-400 mb-4">설정</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <span className="text-body2-sb">알림 설정</span>
              <Image
                src={ChevronRight}
                alt="chevron right"
                className="w-5 h-5"
              />
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-body2-sb">앱 잠금</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">OFF</span>
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

      {/* App Information Section */}
      <div className="px-4">
        <div className="border-t border-gray-700 pt-4">
          <h3 className="text-sm text-gray-400 mb-4">앱 정보</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <span className="text-body2-sb">약관 및 개인정보</span>
              <Image
                src={ChevronRight}
                alt="chevron right"
                className="w-5 h-5"
              />
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-body2-sb">1.0 버전</span>
              <div className="flex items-center space-x-2">
                <span className="text-body3-m text-white">업데이트</span>
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
