import type { NextRequest } from 'next/server';

// 공통 Apple 콜백 처리 함수
async function handleAppleCallback(
  request: NextRequest,
  code: string,
  state: string | null
) {
  console.log('🔄 Apple Callback 처리 시작:', {
    hasCode: !!code,
    hasState: !!state,
  });

  // 쿠키에서 저장된 state와 nonce 가져오기
  const savedState = request.cookies.get('apple_state')?.value;
  const savedNonce = request.cookies.get('apple_nonce')?.value;

  console.log('🍪 저장된 쿠키:', {
    savedState,
    savedNonce,
    receivedState: state,
  });

  if (!code) {
    throw new Error('Authorization code is missing');
  }

  // State 검증 (개발 중에는 일시적으로 완화)
  if (state && savedState && state !== savedState) {
    console.warn('⚠️ State mismatch, but continuing for development');
  }

  // code를 그대로 redirectUrl에 포함시켜서 클라이언트에서 token 엔드포인트로 요청하도록 함
  const webHost =
    process.env.WEB_HOST ||
    process.env.NEXT_PUBLIC_API_URL ||
    request.nextUrl.origin;

  console.log('🔧 환경변수 확인:', {
    WEB_HOST: process.env.WEB_HOST,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    requestOrigin: request.nextUrl.origin,
    finalWebHost: webHost,
  });

  const redirectUrl = new URL('/auth', webHost);
  redirectUrl.searchParams.set('code', code);
  redirectUrl.searchParams.set('provider', 'apple');

  console.log('🏠 리디렉션 URL:', redirectUrl.toString());

  // Server Actions 에러를 피하기 위해 302 리디렉션 사용
  const headers = new Headers();
  headers.set('Location', redirectUrl.toString());
  headers.append(
    'Set-Cookie',
    `apple_state=; HttpOnly; Secure=${process.env.NODE_ENV === 'production'}; SameSite=Lax; Max-Age=0; Path=/`
  );
  headers.append(
    'Set-Cookie',
    `apple_nonce=; HttpOnly; Secure=${process.env.NODE_ENV === 'production'}; SameSite=Lax; Max-Age=0; Path=/`
  );

  const response = new Response(null, {
    status: 302,
    headers,
  });

  return response;
}

// Apple Sign In 콜백 처리 (GET 요청)
export async function GET(request: NextRequest) {
  try {
    console.log('🍎 Apple Callback API 호출됨 (GET)');

    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    console.log('📥 Apple Callback GET 데이터:', {
      hasCode: !!code,
      hasState: !!state,
      hasError: !!error,
      code,
      state,
      error,
    });

    if (error) {
      throw new Error(`Apple login error: ${error}`);
    }

    if (!code) {
      throw new Error('Authorization code is missing');
    }

    return await handleAppleCallback(request, code, state);
  } catch (error) {
    console.error('Apple Callback GET Error:', error);

    const webHost =
      process.env.WEB_HOST ||
      'https://cushionlike-shallowly-nancie.ngrok-free.dev';
    const errorUrl = new URL('/auth', webHost);
    errorUrl.searchParams.set(
      'error_message',
      encodeURIComponent('Apple 로그인에 실패했습니다.')
    );

    return new Response(null, {
      status: 302,
      headers: {
        Location: errorUrl.toString(),
      },
    });
  }
}

// Apple Sign In 콜백 처리 (POST 요청)
export async function POST(request: NextRequest) {
  try {
    console.log('🍎 Apple Callback API 호출됨 (POST)');

    const formData = await request.formData();
    const code = formData.get('code') as string;
    const state = formData.get('state') as string;

    console.log('📥 Apple Callback POST 데이터:', {
      hasCode: !!code,
      hasState: !!state,
      state,
    });

    return await handleAppleCallback(request, code, state);
  } catch (error) {
    console.error('Apple Callback POST Error:', error);

    const webHost =
      process.env.WEB_HOST ||
      'https://cushionlike-shallowly-nancie.ngrok-free.dev';
    const errorUrl = new URL('/auth', webHost);
    errorUrl.searchParams.set(
      'error_message',
      encodeURIComponent('Apple 로그인에 실패했습니다.')
    );

    return new Response(null, {
      status: 302,
      headers: {
        Location: errorUrl.toString(),
      },
    });
  }
}

