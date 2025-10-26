'use client';

import { API_ENDPOINTS } from '@/constants';
export interface UserInfo {
  id: string;
  nickname: string;
  profileImage: string;
  isNew: boolean;
  providerType: string;
}

let accessToken: string | null = null;

export const getAccessToken = () => {
  if (accessToken) {
    return accessToken;
  }
  try {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      accessToken = storedToken;
      return storedToken;
    }
  } catch (_error) {}

  return null;
};

export const getUserInfo = (): UserInfo | null => {
  try {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  } catch {
    return null;
  }
};

export const setUserInfo = (userInfo: UserInfo) => {
  try {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  } catch (error) {
    console.error('localStorage 저장 실패:', error);
  }
};

export const clearUserInfo = () => {
  try {
    // userInfo를 먼저 가져와서 userId 확인
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const parsed = JSON.parse(userInfo);
      const userId = parsed?.id;
      
      // 해당 사용자의 튜토리얼 데이터 삭제
      if (userId) {
        localStorage.removeItem(`hasSeenTutorial_${userId}`);
      }
    }
  } catch (error) {
    console.error('localStorage 정리 중 에러:', error);
  }
  
  // userInfo 삭제
  localStorage.removeItem('userInfo');
};

export const clearAccessToken = () => {
  accessToken = null;
  localStorage.removeItem('accessToken');
};

export function setAccessToken(token: string | null) {
  accessToken = token;
  if (token) {
    localStorage.setItem('accessToken', token);
  } else {
    localStorage.removeItem('accessToken');
  }
}

export async function requestAccessToken() {
  console.log('🍪 현재 쿠키 정보:', document.cookie);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || 'https://kkruk.com'}${API_ENDPOINTS.AUTH.REFRESH}`,
    {
      method: 'POST',
      credentials: 'include', // ★ 쿠키 자동 동반 (HttpOnly 쿠키 포함)
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
  );

  console.log('📥 응답 상태:', res.status, res.statusText);

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(errText || `refresh failed: ${res.status}`);
  }

  const ct = res.headers.get('content-type') || '';
  if (!ct.includes('application/json')) {
    const token = (await res.text()).trim();
    return { accessToken: token };
  } else {
    const data = await res.json();
    return typeof data === 'string' ? { accessToken: data } : data;
  }
}

export async function logout() {
  try {
    // 로그아웃 API 호출
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'https://kkruk.com'}${API_ENDPOINTS.AUTH.LOGOUT}`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );

    console.log('📥 로그아웃 응답 상태:', res.status, res.statusText);

    // API 호출이 실패해도 로컬 데이터는 정리
    if (!res.ok) {
      console.warn('⚠️ 로그아웃 API 호출 실패, 로컬 데이터만 정리:', res.status);
    }
  } catch (error) {
    console.error('❌ 로그아웃 API 호출 중 오류:', error);
  } finally {
    // 로컬 저장소 및 메모리에서 토큰과 사용자 정보 제거
    clearAccessToken();
    clearUserInfo();
    
    // 세션 캐시도 정리
    try {
      const { clearClientSessionCache } = await import('@/lib/session');
      clearClientSessionCache();
    } catch (error) {
      console.warn('⚠️ 세션 캐시 정리 실패:', error);
    }
  }
}

export default function AuthSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
