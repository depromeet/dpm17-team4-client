import { NextRequest, NextResponse } from "next/server";
import { getSessionFromServer } from "@/lib/session/index";
import { AUTH_CONSTANTS } from "@/lib/constants/auth.constants";
import { API_ROUTES } from "@/lib/constants/route.constants";
import { createSuccessResponse, ApiErrors } from "@/lib/utils/apiResponse";

/**
 * Access Token 재발급 API
 * @description refresh token을 사용하여 access token을 발급받습니다.
 */
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const refreshToken = body.refresh_token;

    if (!refreshToken) {
      return NextResponse.json(
        { errorMessage: "리프레시 토큰이 없습니다." },
        { status: 401 }
      );
    }

    // 모킹 API 사용 (백엔드 구현 전까지)
    const mockUrl = new URL(API_ROUTES.MOCK_AUTH_REFRESH, req.url);

    const response = await fetch(mockUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("모킹 토큰 재발급 API 호출 실패:", errorText);
      throw new Error("토큰 재발급 실패");
    }

    const data = await response.json();

    // 임시 사용자 정보 쿠키에서 가져오기
    const tempUserCookie = req.cookies.get("temp_user")?.value;
    let user = null;
    if (tempUserCookie) {
      try {
        user = JSON.parse(decodeURIComponent(tempUserCookie));
      } catch (parseError) {
        console.error("temp_user 쿠키 파싱 실패:", parseError);
      }
    }

    const session = await getSessionFromServer();
    session.isLoggedIn = true;
    session.accessToken = data.access_token;
    session.refreshToken = data.refresh_token; // 새로운 refresh token으로 업데이트
    session.user = user; // 임시 사용자 정보 사용
    session.accessTokenExpiresAt =
      Date.now() + AUTH_CONSTANTS.ACCESS_TOKEN_LIFESPAN;

    await session.save();

    // temp_user 쿠키 삭제
    const responseWithDeletedCookie = createSuccessResponse(
      { user, access_token: data.access_token },
      "Access Token 재발급 성공"
    );
    responseWithDeletedCookie.cookies.delete("temp_user");

    return responseWithDeletedCookie;
  } catch (error) {
    console.error("Access Token 재발급 실패:", error);
    return ApiErrors.UNAUTHORIZED("Access Token 재발급에 실패했습니다.");
  }
};
