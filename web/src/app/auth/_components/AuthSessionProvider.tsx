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
  localStorage.removeItem('userInfo');
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
    `${process.env.NEXT_PUBLIC_API_URL || 'https://211.188.58.167'}${API_ENDPOINTS.AUTH.REFRESH}`,
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

export default function AuthSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
