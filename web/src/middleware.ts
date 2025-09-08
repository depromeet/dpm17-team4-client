import { type NextRequest, NextResponse } from 'next/server';
import { AUTH_CONSTANTS } from './constants/auth.constants';
import { PAGE_ROUTES, PUBLIC_PATHS } from './constants/route.constants';
import { getSessionFromServer } from './lib/session/index';

const isPublicPath = (pathname: string) => {
  return PUBLIC_PATHS.some((path) => pathname.startsWith(path));
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 공개 경로는 통과
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  try {
    const session = await getSessionFromServer();

    // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
    if (!session.isLoggedIn) {
      const loginUrl = new URL(PAGE_ROUTES.AUTH, request.url);
      return NextResponse.redirect(loginUrl);
    }

    const now = Date.now();

    // Access Token이 만료되었거나, 임계값 이내에 만료될 예정인 경우
    if (
      session.accessTokenExpiresAt &&
      session.accessTokenExpiresAt < now + AUTH_CONSTANTS.REFRESH_THRESHOLD
    ) {
      // 토큰이 만료되었으므로 로그인 페이지로 리다이렉트
      session.destroy();
      const loginUrl = new URL(PAGE_ROUTES.AUTH, request.url);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  } catch (error) {
    console.error('미들웨어 에러:', error);
    // 에러 발생 시 로그인 페이지로 리다이렉트
    const loginUrl = new URL(PAGE_ROUTES.AUTH, request.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|mockServiceWorker.js|pwaServiceWorker.js|.*\\.png$|manifest.webmanifest).*)',
  ],
};
