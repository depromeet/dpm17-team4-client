import { SessionData } from "./types";
import { AUTH_CONSTANTS } from "../constants/auth.constants";
import { API_ROUTES } from "../constants/route.constants";

/**클라이언트 세션 캐시*/
const clientSessionCache = new Map<
  string,
  { session: SessionData; expiresAt: number }
>();

const CLIENT_SESSION_CACHE_KEY = "session";
const CACHE_DURATION_MS = AUTH_CONSTANTS.CLIENT_SESSION_CACHE_DURATION;

/**
 * 클라이언트 세션 캐시를 비웁니다.
 */
export const clearClientSessionCache = () => {
  clientSessionCache.clear();
};

/**
 * 클라이언트에서 세션을 가져오는 기본 함수 (캐싱 없음)
 * @description API를 직접 호출하여 세션 데이터를 가져옵니다.
 */
async function fetchClientSession(): Promise<SessionData> {
  const response = await fetch(API_ROUTES.SESSION, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("세션을 가져올 수 없습니다.");
  }

  return response.json();
}

/**
 * 클라이언트 세션 캐시를 가져옵니다.
 * @description 캐시가 있고, 만료되지 않았다면 캐시된 세션을 반환합니다.
 * 캐시가 없거나 만료되었다면 API를 호출하여 새로 가져옵니다.
 */
export const getSessionFromClient = async (): Promise<SessionData> => {
  const now = Date.now();

  // 캐시가 있고, 만료되지 않았다면 반환
  const cached = clientSessionCache.get(CLIENT_SESSION_CACHE_KEY);
  if (cached && cached.expiresAt > now) {
    return cached.session;
  }

  // API로 세션 요청
  const session = await fetchClientSession();
  const expiresAt = now + CACHE_DURATION_MS;
  clientSessionCache.set(CLIENT_SESSION_CACHE_KEY, { session, expiresAt });

  return session;
};
