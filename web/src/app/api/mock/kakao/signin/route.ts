import { type NextRequest, NextResponse } from 'next/server';

/**
 * 카카오 로그인 모킹 API
 * @description 백엔드 API가 구현되기 전까지 사용할 임시 API
 */
export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        { errorMessage: '인가 코드가 필요합니다.' },
        { status: 400 }
      );
    }

    // 모킹된 사용자 데이터
    const mockUser = {
      id: 'mock_user_123',
      nickname: '테스트 사용자',
      email: 'test@example.com',
      profileImage: 'https://via.placeholder.com/150',
    };

    // 모킹된 토큰 데이터
    const mockTokens = {
      access_token: `mock_access_token_${Date.now()}`,
      refresh_token: `mock_refresh_token_${Date.now()}`,
      user: mockUser,
    };

    console.log('모킹된 카카오 로그인 성공:', { code, user: mockUser });

    return NextResponse.json(mockTokens);
  } catch (error) {
    console.error('모킹 API 에러:', error);
    return NextResponse.json(
      { errorMessage: '모킹 API 에러가 발생했습니다.' },
      { status: 500 }
    );
  }
}
