import crypto from 'node:crypto';
import { type NextRequest, NextResponse } from 'next/server';

// Apple Sign In 로그인 URL 생성
export async function POST(request: NextRequest) {
  try {
    console.log('🍎 Apple Login API 호출됨');

    // const body = await request.json(); // 현재 사용하지 않음

    // Apple Sign In 설정
    const clientId = process.env.APPLE_CLIENT_ID;

    // ngrok 도메인 자동 감지
    const forwardedHost = request.headers.get('x-forwarded-host');
    const protocol = request.headers.get('x-forwarded-proto') || 'https';
    const baseUrl = forwardedHost
      ? `${protocol}://${forwardedHost}`
      : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

    const appleRedirectUri =
      process.env.APPLE_REDIRECT_URI || `${baseUrl}/api/v1/auth/apple/callback`;
    const state = crypto.randomBytes(16).toString('hex');
    const nonce = crypto.randomBytes(16).toString('hex');

    console.log('🔧 Apple 설정 확인:', {
      clientId: clientId ? '설정됨' : '없음',
      baseUrl,
      appleRedirectUri,
      hasState: !!state,
      hasNonce: !!nonce,
    });

    if (!clientId) {
      console.error('Apple Login Error: APPLE_CLIENT_ID is not configured');
      return NextResponse.json(
        {
          error:
            'Apple Sign In is not configured. Please check environment variables.',
          details: 'APPLE_CLIENT_ID environment variable is missing',
        },
        { status: 500 }
      );
    }

    // Apple Sign In URL 생성
    const appleAuthUrl = new URL('https://appleid.apple.com/auth/authorize');
    appleAuthUrl.searchParams.set('client_id', clientId);
    appleAuthUrl.searchParams.set('redirect_uri', appleRedirectUri);
    appleAuthUrl.searchParams.set('response_type', 'code');
    appleAuthUrl.searchParams.set('scope', 'name email');
    appleAuthUrl.searchParams.set('state', state);
    appleAuthUrl.searchParams.set('nonce', nonce);
    appleAuthUrl.searchParams.set('response_mode', 'form_post');

    // state와 nonce를 세션에 저장 (실제로는 Redis나 DB에 저장)
    const response = NextResponse.json({
      authUrl: appleAuthUrl.toString(),
      state,
      nonce,
    });

    // state와 nonce를 쿠키에 임시 저장
    response.cookies.set('apple_state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 10, // 10분
      path: '/',
    });

    response.cookies.set('apple_nonce', nonce, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 10, // 10분
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Apple Login Error:', error);
    return NextResponse.json({ error: 'Apple login failed' }, { status: 500 });
  }
}
