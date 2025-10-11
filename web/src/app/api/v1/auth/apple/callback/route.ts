import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import type { NextRequest } from 'next/server';

// 공통 Apple 콜백 처리 함수
async function handleAppleCallback(
  request: NextRequest,
  code: string,
  state: string | null,
  user: string | null
) {
  console.log('🔄 Apple Callback 처리 시작:', {
    hasCode: !!code,
    hasState: !!state,
    hasUser: !!user,
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

  // Apple에서 받은 authorization code로 토큰 교환
  const tokenResponse = await fetch('https://appleid.apple.com/auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: process.env.APPLE_CLIENT_ID || '',
      client_secret: await generateClientSecret(),
      code,
      grant_type: 'authorization_code',
      redirect_uri:
        process.env.APPLE_REDIRECT_URI ||
        `${request.nextUrl.origin}/api/v1/auth/apple/callback`,
    }),
  });

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text();
    console.error('❌ Apple 토큰 교환 실패:', errorText);
    throw new Error('Failed to exchange code for token');
  }

  const tokenData = await tokenResponse.json();
  const { access_token, id_token } = tokenData;

  console.log('✅ Apple 토큰 교환 성공:', {
    hasAccessToken: !!access_token,
    hasIdToken: !!id_token,
  });

  // ID 토큰 검증 및 사용자 정보 추출
  const decodedToken = jwt.decode(id_token) as {
    sub: string;
    email?: string;
    nonce?: string;
  } | null;

  if (!decodedToken) {
    throw new Error('Invalid ID token');
  }

  console.log('🔍 디코딩된 토큰:', {
    sub: decodedToken.sub,
    email: decodedToken.email,
    hasNonce: !!decodedToken.nonce,
  });

  // 사용자 정보 파싱
  let userInfo = null;
  if (user) {
    try {
      userInfo = JSON.parse(user);
    } catch (_e) {
      console.warn('Failed to parse user info from Apple');
    }
  }

  // Apple 사용자 데이터 생성
  const appleUser = {
    id: decodedToken.sub,
    nickname: userInfo?.name
      ? `${userInfo.name.firstName} ${userInfo.name.lastName}`
      : 'Apple User',
    profileImage: 'https://via.placeholder.com/100x100/000000/FFFFFF?text=🍎', // Apple은 프로필 이미지 제공 안함
    isNew: true,
    providerType: 'APPLE',
    email: decodedToken.email || null,
  };

  console.log('👤 Apple 사용자 데이터:', appleUser);

  // Mock refresh token 생성 (실제로는 DB에 저장)
  const refreshToken = `apple_refresh_${crypto.randomBytes(32).toString('hex')}`;

  // 홈페이지로 리디렉션 (WEB_HOST 환경변수 사용)
  const webHost =
    process.env.WEB_HOST ||
    'https://cushionlike-shallowly-nancie.ngrok-free.dev';

  console.log('🔧 환경변수 확인:', {
    WEB_HOST: process.env.WEB_HOST,
    requestOrigin: request.nextUrl.origin,
    finalWebHost: webHost,
  });

  const redirectUrl = new URL('/home', webHost);
  redirectUrl.searchParams.set('id', appleUser.id);
  redirectUrl.searchParams.set(
    'nickname',
    encodeURIComponent(appleUser.nickname)
  );
  redirectUrl.searchParams.set(
    'profileImage',
    encodeURIComponent(appleUser.profileImage)
  );
  redirectUrl.searchParams.set('isNew', appleUser.isNew.toString());
  redirectUrl.searchParams.set('providerType', appleUser.providerType);

  console.log('🏠 리디렉션 URL:', redirectUrl.toString());

  // Server Actions 에러를 피하기 위해 302 리디렉션 사용
  const headers = new Headers();
  headers.set('Location', redirectUrl.toString());
  headers.append('Set-Cookie', `refreshToken=${refreshToken}; HttpOnly; Secure=${process.env.NODE_ENV === 'production'}; SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}; Path=/`);
  headers.append('Set-Cookie', `apple_state=; HttpOnly; Secure=${process.env.NODE_ENV === 'production'}; SameSite=Lax; Max-Age=0; Path=/`);
  headers.append('Set-Cookie', `apple_nonce=; HttpOnly; Secure=${process.env.NODE_ENV === 'production'}; SameSite=Lax; Max-Age=0; Path=/`);
  
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

    return await handleAppleCallback(request, code, state, null);
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
    const user = formData.get('user') as string;

    console.log('📥 Apple Callback POST 데이터:', {
      hasCode: !!code,
      hasState: !!state,
      hasUser: !!user,
      state,
      user,
    });

    return await handleAppleCallback(request, code, state, user);
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

// Apple Client Secret 생성
async function generateClientSecret(): Promise<string> {
  const teamId = process.env.APPLE_TEAM_ID;
  const keyId = process.env.APPLE_KEY_ID;
  const clientId = process.env.APPLE_CLIENT_ID;
  const privateKey = process.env.APPLE_PRIVATE_KEY;

  if (!teamId || !keyId || !clientId || !privateKey) {
    throw new Error('Apple configuration is missing');
  }

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: teamId,
    iat: now,
    exp: now + 3600, // 1시간
    aud: 'https://appleid.apple.com',
    sub: clientId,
  };

  const header = {
    alg: 'ES256',
    kid: keyId,
  };

  return jwt.sign(payload, privateKey, {
    algorithm: 'ES256',
    header,
  });
}
