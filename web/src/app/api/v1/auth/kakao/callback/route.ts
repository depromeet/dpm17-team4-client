import { type NextRequest, NextResponse } from 'next/server';

// 카카오 콜백 처리 함수
async function handleKakaoCallback(
  request: NextRequest,
  code: string,
  state: string | null
) {
  console.log('🔄 Kakao Callback 처리 시작:', {
    hasCode: !!code,
    hasState: !!state,
  });

  if (!code) {
    throw new Error('Authorization code is missing');
  }

  const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
  const KAKAO_CLIENT_SECRET = process.env.KAKAO_CLIENT_SECRET;

  if (!KAKAO_CLIENT_ID || !KAKAO_CLIENT_SECRET) {
    throw new Error('Kakao configuration is missing');
  }

  // ngrok 도메인 자동 감지
  const forwardedHost = request.headers.get('x-forwarded-host');
  const protocol = request.headers.get('x-forwarded-proto') || 'https';
  const baseUrl = forwardedHost
    ? `${protocol}://${forwardedHost}`
    : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  const kakaoRedirectUri =
    process.env.KAKAO_REDIRECT_URI ||
    `${baseUrl}/api/v1/auth/kakao/callback`;

  console.log('🔧 Kakao 설정 확인:', {
    hasClientId: !!KAKAO_CLIENT_ID,
    hasClientSecret: !!KAKAO_CLIENT_SECRET,
    baseUrl,
    kakaoRedirectUri,
  });

  // 1. 카카오에서 받은 authorization code로 토큰 교환
  const tokenResponse = await fetch('https://kauth.kakao.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: KAKAO_CLIENT_ID,
      client_secret: KAKAO_CLIENT_SECRET,
      code,
      redirect_uri: kakaoRedirectUri,
    }),
  });

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text();
    console.error('❌ Kakao 토큰 교환 실패:', errorText);
    throw new Error('Failed to exchange code for token');
  }

  const tokenData = await tokenResponse.json();
  const { access_token } = tokenData;

  console.log('✅ Kakao 토큰 교환 성공:', {
    hasAccessToken: !!access_token,
  });

  // 2. 카카오 액세스 토큰으로 사용자 정보 가져오기 (1번에서 유저 데이터 가져오기)
  const userInfoResponse = await fetch('https://kapi.kakao.com/v2/user/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  });

  if (!userInfoResponse.ok) {
    const errorText = await userInfoResponse.text();
    console.error('❌ Kakao 사용자 정보 가져오기 실패:', errorText);
    throw new Error('Failed to get user info from Kakao');
  }

  const userInfoData = await userInfoResponse.json();
  console.log('👤 Kakao 사용자 정보:', userInfoData);

  // 카카오 사용자 데이터 생성
  const kakaoUser = {
    id: userInfoData.id.toString(),
    nickname:
      userInfoData.kakao_account?.profile?.nickname || 'Kakao User',
    profileImage:
      userInfoData.kakao_account?.profile?.profile_image_url ||
      'https://via.placeholder.com/100x100/FFE812/000000?text=K',
    isNew: true, // 실제로는 서버에서 확인해야 함
    providerType: 'KAKAO',
    email: userInfoData.kakao_account?.email || null,
  };

  console.log('👤 Kakao 사용자 데이터:', kakaoUser);

  // 3. code만 저장하고 /home으로 리다이렉트
  const webHost =
    process.env.WEB_HOST ||
    process.env.NEXT_PUBLIC_API_URL ||
    'http://localhost:3000';

  console.log('🔧 환경변수 확인:', {
    WEB_HOST: process.env.WEB_HOST,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    requestOrigin: request.nextUrl.origin,
    finalWebHost: webHost,
  });

  // Mock refresh token 생성 (실제로는 DB에 저장)
  const refreshToken = `kakao_refresh_${Date.now()}_${Math.random().toString(36).substring(7)}`;

  // HTML 페이지를 반환하여 클라이언트에서 code를 저장하고 /home으로 리다이렉트
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>카카오 로그인 처리 중...</title>
      </head>
      <body>
        <script>
          (function() {
            try {
              // 1번: 유저 데이터 가져와서 set
              const userInfo = ${JSON.stringify(kakaoUser)};
              localStorage.setItem('userInfo', JSON.stringify(userInfo));
              console.log('✅ 사용자 정보 저장 완료:', userInfo);

              // 2번: code만 가져와서 저장
              const code = ${JSON.stringify(code)};
              localStorage.setItem('kakao_code', code);
              console.log('✅ 카카오 code 저장 완료:', code);

              // /home으로 리다이렉트
              window.location.href = '${webHost}/home';
            } catch (error) {
              console.error('❌ 처리 중 오류 발생:', error);
              window.location.href = '${webHost}/auth?error_message=' + encodeURIComponent('카카오 로그인 처리 중 오류가 발생했습니다.');
            }
          })();
        </script>
      </body>
    </html>
  `;

  const headers = new Headers();
  headers.set('Content-Type', 'text/html; charset=utf-8');
  headers.append(
    'Set-Cookie',
    `refreshToken=${refreshToken}; HttpOnly; Secure=${process.env.NODE_ENV === 'production'}; SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}; Path=/`
  );

  return new Response(html, {
    status: 200,
    headers,
  });
}

// 카카오 콜백 처리 (GET 요청)
export async function GET(request: NextRequest) {
  try {
    console.log('🟡 Kakao Callback API 호출됨 (GET)');

    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    console.log('📥 Kakao Callback GET 데이터:', {
      hasCode: !!code,
      hasState: !!state,
      hasError: !!error,
      code,
      state,
      error,
    });

    if (error) {
      throw new Error(`Kakao login error: ${error}`);
    }

    if (!code) {
      throw new Error('Authorization code is missing');
    }

    return await handleKakaoCallback(request, code, state);
  } catch (error) {
    console.error('Kakao Callback GET Error:', error);

    const webHost =
      process.env.WEB_HOST ||
      process.env.NEXT_PUBLIC_API_URL ||
      'http://localhost:3000';
    const errorUrl = new URL('/auth', webHost);
    errorUrl.searchParams.set(
      'error_message',
      encodeURIComponent('카카오 로그인에 실패했습니다.')
    );

    return new Response(null, {
      status: 302,
      headers: {
        Location: errorUrl.toString(),
      },
    });
  }
}

