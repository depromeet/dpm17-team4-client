'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import {
  clearUserInfo,
  getUserInfo,
  setAccessToken,
  setUserInfo,
  type UserInfo,
} from '../app/auth/_components/AuthSessionProvider';

/**
 * URL 파라미터에서 유저 정보를 추출하고 localStorage에 저장하는 훅
 */
export function useUserInfo() {
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [userInfo, setUserInfoState] = useState<UserInfo | null>(null);

  const extractUserInfo = useCallback((): UserInfo | null => {
    const id = searchParams.get('id');
    const nickname = searchParams.get('nickname');
    const profileImage = searchParams.get('profileImage');
    const isNew = searchParams.get('isNew');
    const providerType = searchParams.get('providerType');

    if (id && nickname && profileImage && isNew && providerType) {
      return {
        id,
        nickname: decodeURIComponent(nickname),
        profileImage: decodeURIComponent(profileImage),
        isNew: isNew === 'true',
        providerType,
      };
    }
    return null;
  }, [searchParams]);

  useEffect(() => {
    const userInfo = extractUserInfo();
    if (userInfo && !isProcessing) {
      setIsProcessing(true);
      setUserInfo(userInfo);
      setUserInfoState(userInfo);
    }
  }, [extractUserInfo, isProcessing]);

  useEffect(() => {
    setUserInfoState(getUserInfo());
  }, []);

  const handleLogOut = () => {
    setAccessToken(null);
    clearUserInfo();
    setUserInfoState(null);
  };

  return {
    userInfo,
    isProcessing,
    handleLogOut,
  };
}
