'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUserInfo } from '@/hooks';
import { PAGE_ROUTES } from '../constants/route.constants';

export default function LoginContent() {
  const router = useRouter();
  const { userInfo: savedUserInfo, handleLogOut } = useUserInfo();

  return (
    <>
      {savedUserInfo ? (
        <div className="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            로그인된 유저 정보
          </h3>
          <div className="text-left space-y-1 text-sm text-gray-600">
            <p>
              <strong>ID:</strong> {savedUserInfo.id}
            </p>
            <p>
              <strong>닉네임:</strong> {savedUserInfo.nickname}
            </p>
            <p>
              <strong>신규 유저:</strong>{' '}
              {savedUserInfo.isNew ? '예' : '아니오'}
            </p>
            <p>
              <strong>로그인 방식:</strong> {savedUserInfo.providerType}
            </p>
            <Image
              src={savedUserInfo.profileImage}
              alt="프로필 이미지"
              width={64}
              height={64}
              className="w-16 h-16 rounded-full mx-auto mt-2"
            />
          </div>
          <button
            type="button"
            onClick={handleLogOut}
            className="bg-blue-500 mt-4 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            로그아웃
          </button>
        </div>
      ) : (
        <div className="mb-6">
          <div className="text-center">
            <p className="text-gray-600 mb-4">로그인이 필요합니다.</p>
            <button
              type="button"
              onClick={() => router.push(PAGE_ROUTES.AUTH)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              로그인하기
            </button>
          </div>
        </div>
      )}
    </>
  );
}
