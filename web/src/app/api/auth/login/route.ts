import { NextRequest, NextResponse } from "next/server";
import { ApiErrors, createSuccessResponse } from "@/lib/utils/apiResponse";
import { getSessionFromServer, SessionData } from "@/lib/session/index";
import { AUTH_CONSTANTS, AUTH_CONFIG } from "@/constants/auth.constants";
import { API_ROUTES, PAGE_ROUTES } from "@/constants/route.constants";

/**
 * 로그인 요청
 * @param req - 요청 객체
 * @returns 응답 객체
 */
export const POST = async (req: NextRequest) => {
  try {
    const { code } = await req.json();

    if (!code) {
      return ApiErrors.BAD_REQUEST("인가 코드가 필요합니다.");
    }

    // 모킹 API 사용 (백엔드 구현 전까지)
    const mockUrl = new URL(API_ROUTES.MOCK_KAKAO_SIGNIN, req.url);

    const response = await fetch(mockUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error(`백엔드 API 호출 실패: ${response.status}`);
    }

    const data = await response.json();

    // 환경 설정에 따라 다른 플로우 처리
    if (AUTH_CONFIG.USE_REDIRECT_FLOW) {
      // 서버측 의견 반영한 구조 (향후 실제 서버 연동 시)
      return handleRedirectFlow(data, req);
    } else {
      // 현재 단순한 구조 (현재 모킹 환경)
      return handleMockFlow(data);
    }
  } catch (error) {
    console.error("로그인 실패:", error);
    return ApiErrors.UNAUTHORIZED("인증에 실패했습니다.");
  }
};

/**
 * 단순한 플로우 (현재 모킹 환경)
 * 모든 토큰을 세션에 저장하고 JSON 응답 반환
 */
async function handleMockFlow(data: SessionData) {
  const session = await getSessionFromServer();

  // 세션에 토큰 정보 저장
  session.isLoggedIn = true;
  session.accessToken = data.accessToken;
  session.refreshToken = data.refreshToken;
  session.userId = data.user?.id;
  session.user = data.user;
  session.accessTokenExpiresAt =
    Date.now() + AUTH_CONSTANTS.ACCESS_TOKEN_LIFESPAN;

  await session.save();

  return createSuccessResponse(data.user, "로그인 성공");
}

/**
 * 리다이렉트 플로우 (향후 실제 서버 연동 시)
 * refresh_token을 httpOnly 쿠키로 설정하고 302 리다이렉트
 */
async function handleRedirectFlow(data: any, req: NextRequest) {
  // 302 리다이렉트 응답 생성
  const redirectUrl = new URL(PAGE_ROUTES.HOME, req.url);
  redirectUrl.searchParams.set("is_new_user", "true");

  const redirectResponse = NextResponse.redirect(redirectUrl, 302);

  // refresh token을 httpOnly 쿠키로 설정
  redirectResponse.cookies.set("refresh_token", data.refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: AUTH_CONSTANTS.COOKIE_MAX_AGE,
  });

  // 사용자 정보를 임시로 쿠키에 저장 (access token 발급 전까지)
  redirectResponse.cookies.set("temp_user", JSON.stringify(data.user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: AUTH_CONSTANTS.TEMP_COOKIE_MAX_AGE, // 5분 (임시)
  });

  return redirectResponse;
}
