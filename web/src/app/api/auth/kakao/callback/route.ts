import { type NextRequest, NextResponse } from 'next/server';
import { API_ROUTES, PAGE_ROUTES } from '@/constants/route.constants';

export async function GET(request: NextRequest) {
  try {
    /**쿼리 파라미터에서 authorization code 추출*/
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    /**에러가 있거나 코드가 없으면 로그인 페이지로 리다이렉트*/
    if (!code) {
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

    /**성공 시 메인 페이지로 리다이렉트 (토큰은 세션에 저장됨)*/
    return NextResponse.redirect(new URL(PAGE_ROUTES.HOME, request.url));
  } catch (error) {
    console.error('카카오 콜백 처리 중 에러:', error);
    return NextResponse.redirect(new URL(PAGE_ROUTES.AUTH, request.url));
  }
}
