'use client';

import { API_ENDPOINTS } from '@/constants';
import {
  isWebViewAvailable as checkWebViewAvailable,
  postMessageToWebView,
  setupWebViewMessageListener,
} from '@/services/webViewService';

// isWebViewAvailable을 export하여 다른 곳에서도 사용 가능하도록
export const isWebViewAvailable = checkWebViewAvailable;
export interface UserInfo {
  id: string;
  nickname: string;
  profileImage: string;
  isNew: boolean;
  providerType: string;
}

let accessToken: string | null = null;

// Access Token: sessionStorage 사용 (탭 닫으면 자동 삭제, 더 안전)
export const getAccessToken = () => {
  if (accessToken) {
    return accessToken;
  }
  try {
    const storedToken = sessionStorage.getItem('accessToken');
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
  try {
    sessionStorage.removeItem('accessToken');
  } catch (_error) {}
};

export function setAccessToken(token: string | null) {
  accessToken = token;
  try {
    if (token) {
      sessionStorage.setItem('accessToken', token);
    } else {
      sessionStorage.removeItem('accessToken');
    }
  } catch (error) {
    console.error('sessionStorage 저장 실패:', error);
  }
}

// Refresh Token: 앱의 보안 저장소 사용 (WebView 환경) 또는 localStorage (웹 환경)
const refreshTokenPromiseResolvers: Map<
  string,
  { resolve: (value: string | null) => void; reject: (error: Error) => void }
> = new Map();

// WebView 메시지 리스너 초기화 (한 번만)
let isMessageListenerSetup = false;
if (typeof window !== 'undefined' && !isMessageListenerSetup) {
  isMessageListenerSetup = true;
  setupWebViewMessageListener((message) => {
    if (
      message.type === 'GET_REFRESH_TOKEN_RESPONSE' ||
      message.type === 'SAVE_REFRESH_TOKEN_RESPONSE'
    ) {
      const requestId = message.requestId as string;
      const resolver = refreshTokenPromiseResolvers.get(requestId);
      if (resolver) {
        if (message.success) {
          resolver.resolve((message.token as string) || null);
        } else {
          resolver.reject(new Error((message.error as string) || 'Failed'));
        }
        refreshTokenPromiseResolvers.delete(requestId);
      }
    }
  });
}

export const getRefreshToken = async (): Promise<string | null> => {
  // WebView 환경이면 앱의 보안 저장소에서 가져오기
  if (isWebViewAvailable()) {
    return new Promise((resolve, reject) => {
      const requestId = `get_${Date.now()}_${Math.random()}`;
      refreshTokenPromiseResolvers.set(requestId, { resolve, reject });

      postMessageToWebView({
        type: 'GET_REFRESH_TOKEN',
        requestId,
      });

      // 타임아웃 설정 (5초)
      setTimeout(() => {
        if (refreshTokenPromiseResolvers.has(requestId)) {
          refreshTokenPromiseResolvers.delete(requestId);
          reject(new Error('Timeout: Failed to get refresh token from app'));
        }
      }, 5000);
    });
  }

  // 웹 환경이면 refresh token 저장하지 않음 (보안상 이유)
  return null;
};

export const setRefreshToken = async (token: string | null): Promise<void> => {
  // WebView 환경이면 앱의 보안 저장소에 저장
  if (isWebViewAvailable() && token) {
    return new Promise((resolve, reject) => {
      const requestId = `save_${Date.now()}_${Math.random()}`;
      refreshTokenPromiseResolvers.set(requestId, {
        resolve: () => resolve(),
        reject,
      });

      postMessageToWebView({
        type: 'SAVE_REFRESH_TOKEN',
        token,
        requestId,
      });

      // 타임아웃 설정 (5초)
      setTimeout(() => {
        if (refreshTokenPromiseResolvers.has(requestId)) {
          refreshTokenPromiseResolvers.delete(requestId);
          reject(new Error('Timeout: Failed to save refresh token to app'));
        }
      }, 5000);
    });
  }

  // 웹 환경이면 refresh token 저장하지 않음 (보안상 이유)
  // 401 에러 발생 시 로그아웃 후 재로그인 유도
};

export const clearRefreshToken = async (): Promise<void> => {
  // WebView 환경이면 앱의 보안 저장소에서 삭제
  if (isWebViewAvailable()) {
    return setRefreshToken(null);
  }

  // 웹 환경이면 refresh token을 저장하지 않으므로 아무것도 하지 않음
};

export async function requestAccessToken() {
  const refreshToken = await getRefreshToken();

  if (!refreshToken) {
    throw new Error('Refresh token이 없습니다. 다시 로그인해주세요.');
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || 'https://kkruk.com'}${API_ENDPOINTS.AUTH.REFRESH}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );

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
    const result = typeof data === 'string' ? { accessToken: data } : data;

    // 새로운 refresh token이 있으면 업데이트
    if (result.refreshToken) {
      await setRefreshToken(result.refreshToken);
    }

    return result;
  }
}

export async function logout() {
  try {
    // 로그아웃 API 호출
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'https://kkruk.com'}${API_ENDPOINTS.AUTH.LOGOUT}`,
      {
        method: 'POST',
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
    await clearRefreshToken();
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
