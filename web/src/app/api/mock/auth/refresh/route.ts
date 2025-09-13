import { type NextRequest, NextResponse } from 'next/server';

/**
 * 토큰 재발급 모킹 API
 * @description 백엔드 API가 구현되기 전까지 사용할 임시 API
 */
export async function POST(request: NextRequest) {
  try {
    const { refresh_token } = await request.json();

    if (!refresh_token) {
      return NextResponse.json(
        { errorMessage: '리프레시 토큰이 필요합니다.' },
        { status: 400 }
      );
    }

    // 모킹된 새 토큰 데이터
    const mockTokens = {
      access_token: `mock_access_token_${Date.now()}`,
      refresh_token: `mock_refresh_token_${Date.now()}`,
    };

    console.log('모킹된 토큰 재발급 성공:', { refresh_token });

    return NextResponse.json(mockTokens);
  } catch (error) {
    console.error('모킹 토큰 재발급 API 에러:', error);
    return NextResponse.json(
      { errorMessage: '토큰 재발급에 실패했습니다.' },
      { status: 401 }
    );
  }
}
