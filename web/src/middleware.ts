import { type NextRequest, NextResponse } from 'next/server';
import { AUTH_CONSTANTS } from './constants/auth.constants';
import { PAGE_ROUTES, PUBLIC_PATHS } from './constants/route.constants';

const isPublicPath = (pathname: string) => {
  return PUBLIC_PATHS.some((path) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  });
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 공개 경로는 통과
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  try {
    // NOTE(yubin): 인증 관련 라우팅 추후 작업
    // const sessionCookie = request.cookies.get(
    //   AUTH_CONSTANTS.SESSION_COOKIE_NAME
    // )?.value;
    // if (!sessionCookie) {
    //   const loginUrl = new URL(PAGE_ROUTES.AUTH, request.url);
    //   loginUrl.searchParams.set(
    //     'next',
    //     request.nextUrl.pathname + request.nextUrl.search
    //   );
    //   return NextResponse.redirect(loginUrl);
    // }

    return NextResponse.next();
  } catch (error) {
    console.error('미들웨어 에러:', error);
    // 에러 발생 시 로그인 페이지로 리다이렉트
    const loginUrl = new URL(PAGE_ROUTES.AUTH, request.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};
