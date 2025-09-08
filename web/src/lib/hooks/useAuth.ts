"use client";

import { useEffect, useState, useCallback } from "react";
import {
  getSessionFromClient,
  clearClientSessionCache,
} from "../session/index";
import { AUTH_CONSTANTS } from "../../constants/auth.constants";
import { API_ROUTES } from "../../constants/route.constants";

export interface UserInfo {
  id: string;
  nickname: string;
  email?: string;
  profileImage?: string;
}

interface UseAuthReturn {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserInfo | null;
  accessToken: string | null;
  logout: () => Promise<void>;
  refreshAuthState: (clearCache?: boolean) => Promise<void>;
}

/**개발 환경 주기적 확인 간격 (ms)*/
const DEV_CHECK_INTERVAL = AUTH_CONSTANTS.DEV_CHECK_INTERVAL;

/**
 * 인증 상태를 관리하는 훅
 * @returns 인증 상태 및 함수들
 */
export function useAuth(): UseAuthReturn {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  /**
   * 세션 데이터를 기반으로 인증 상태를 업데이트합니다
   * @param session - 세션 데이터
   */
  const updateAuthState = useCallback((session: any) => {
    if (session.isLoggedIn && session.user) {
      setIsAuthenticated(true);
      setUser(session.user);
      setAccessToken(session.accessToken || null);
    } else {
      setIsAuthenticated(false);
      setUser(null);
      setAccessToken(null);
    }
  }, []);

  /**인증 상태 갱신 함수*/
  const refreshAuthState = useCallback(
    async (clearCache: boolean = false) => {
      try {
        if (clearCache) {
          clearClientSessionCache();
        }

        const session = await getSessionFromClient();
        updateAuthState(session);
      } catch (error) {
        console.error("인증 상태 갱신 실패:", error);
        setIsAuthenticated(false);
        setUser(null);
      }
    },
    [updateAuthState]
  );

  /**초기 인증 상태 확인*/
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const session = await getSessionFromClient();
        updateAuthState(session);
      } catch (error) {
        console.error("인증 상태 초기화 실패:", error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [updateAuthState]);

  /**로그아웃 함수*/
  const logout = useCallback(async () => {
    try {
      // 서버 세션 삭제
      const response = await fetch(API_ROUTES.SESSION, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("서버 세션 삭제 실패");
      }

      // 클라이언트 캐시 삭제
      clearClientSessionCache();

      // 상태 업데이트
      setIsAuthenticated(false);
      setUser(null);
      setAccessToken(null);
    } catch (error) {
      console.error("로그아웃 실패:", error);
      // 에러가 발생해도 클라이언트 상태는 초기화
      setIsAuthenticated(false);
      setUser(null);
      setAccessToken(null);
    }
  }, []);

  // 페이지 포커스 시 인증 상태 갱신
  useEffect(() => {
    const handleFocus = () => {
      refreshAuthState();
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refreshAuthState();
      }
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [refreshAuthState]);

  // 개발 환경에서 주기적으로 인증 상태 확인
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const interval = setInterval(() => {
        refreshAuthState();
      }, DEV_CHECK_INTERVAL);

      return () => clearInterval(interval);
    }
  }, [refreshAuthState]);

  return {
    isAuthenticated,
    isLoading,
    user,
    accessToken,
    logout,
    refreshAuthState,
  };
}
