'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import ChevronRight from '@/assets/home/IC_Chevron_Right.png';
import defaultProfileImage from '@/assets/my/profile-image-1.png';
import { PAGE_ROUTES } from '@/constants';
import { useNavigationContext } from '@/contexts/NavigationContext';
import { useUserMeQuery } from '@/hooks';

export default function MyPageContent() {
  const { data: userMeData } = useUserMeQuery();
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
        <Link
          href={PAGE_ROUTES.MY_PROFILE}
          className="flex items-center space-x-4 cursor-pointer"
        >
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
            <h2 className="text-lg font-semibold">{userMeData?.nickname}</h2>
            <p className="text-sm text-white">{userMeData?.email}</p>
          </div>
          <Image src={ChevronRight} alt="chevron right" className="w-5 h-5" />
        </Link>
      </div>
      <div className="bg-[#292D32] h-[8px] opacity-20" />
      {/* 개발 중 - 설정 섹션 전체 */}
      {/* <div className="bg-gray-700 h-[8px]" /> */}
      {/* <div className="pt-[28px] px-[16px] pb-[24px]">
        <div className="">
          <h3 className="text-sm text-gray-400 mb-4">설정</h3>
          <div className="space-y-4">
            <Link
              href={PAGE_ROUTES.NOTIFICATION_SETTINGS}
              className="flex items-center justify-between py-2 cursor-pointer"
            >
              <span className="text-body2-sb">알림 설정</span>
              <Image
                src={ChevronRight}
                alt="chevron right"
                className="w-5 h-5"
              />
            </Link>
            <div className="flex items-center justify-between py-2 cursor-pointer">
              <span className="text-body2-sb">앱 잠금</span>
              <Link href={PAGE_ROUTES.APP_LOCK}>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">OFF</span>
                  <Image
                    src={ChevronRight}
                    alt="chevron right"
                    className="w-5 h-5"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div> */}

      {/* App Information Section */}
      <div className="px-4">
        <div className="pt-4">
          <h3 className="text-body4-m text-[#707885] mb-4">앱 정보</h3>
          <div className="space-y-4">
            <Link
              href={PAGE_ROUTES.TERMS_PRIVACY}
              className="flex items-center justify-between py-2 cursor-pointer"
            >
              <span className="text-body2-sb">약관 및 개인정보</span>
              <Image
                src={ChevronRight}
                alt="chevron right"
                className="w-5 h-5"
              />
            </Link>
            {/* 개발 중 - 버전 정보 */}
            {/* <div className="flex items-center justify-between py-2">
              <span className="text-body2-sb">1.0 버전</span>
              <div className="flex items-center space-x-2">
                <span className="text-body3-m text-white">업데이트</span>
                <Image
                  src={ChevronRight}
                  alt="chevron right"
                  className="w-5 h-5"
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
