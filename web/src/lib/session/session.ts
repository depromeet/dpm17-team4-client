import { getIronSession, type SessionOptions } from 'iron-session';
import { cache } from 'react';
import { AUTH_CONSTANTS } from '../../constants/auth.constants';
import type { SessionData } from './types';

const COOKIE_NAME = AUTH_CONSTANTS.SESSION_COOKIE_NAME;
const COOKIE_MAX_AGE = AUTH_CONSTANTS.COOKIE_MAX_AGE;
export const sessionOptions: SessionOptions = {
  password:
    process.env.SECRET_COOKIE_PASSWORD ||
    'your-secret-password-must-be-at-least-32-characters-long-for-development',
  cookieName: COOKIE_NAME,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: COOKIE_MAX_AGE,
    sameSite: 'lax',
  },
};

/**
 * 서버에서 세션 데이터를 가져옵니다.
 * @description react cache를 사용하여 1회 렌더링 사이클 내에서 요청이 캐싱되도록 합니다.
 */
export const getSession = cache(async () => {
  const { cookies } = await import('next/headers');
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  return session;
});
