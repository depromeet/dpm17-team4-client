import { type NextRequest, NextResponse } from 'next/server';
import { AUTH_CONSTANTS } from '@/constants/auth.constants';
import { API_ROUTES, PAGE_ROUTES } from '@/constants/route.constants';

export async function GET(request: NextRequest) {
  try {
    /**쿼리 파라미터에서 authorization code 추출*/
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const stateCookie = request.cookies.get(
      AUTH_CONSTANTS.OAUTH_STATE_COOKIE
    )?.value;
    /**에러가 있거나 코드가 없으면 로그인 페이지로 리다이렉트*/
    const isLoginError =
      !code || !state || !stateCookie || state !== stateCookie;
    if (!isLoginError) {
      return NextResponse.redirect(new URL(PAGE_ROUTES.AUTH, request.url));
    }

    /**내부 로그인 API 호출하여 세션에 토큰 저장*/
    const loginUrl = new URL(API_ROUTES.AUTH_LOGIN, request.url);
    const loginResponse = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    if (!loginResponse.ok) {
      throw new Error(`로그인 API 호출 실패: ${loginResponse.status}`);
    }
    const redirect = NextResponse.redirect(
      new URL(PAGE_ROUTES.HOME, request.url)
    );
    const setCookie = loginResponse.headers.get('set-cookie');
    if (setCookie) redirect.headers.append('set-cookie', setCookie);
    return redirect;
  } catch (error) {
    console.error('카카오 콜백 처리 중 에러:', error);
    return NextResponse.redirect(new URL(PAGE_ROUTES.AUTH, request.url));
  }
}
