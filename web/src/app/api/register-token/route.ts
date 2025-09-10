import { type NextRequest, NextResponse } from 'next/server';

// NOTE(seonghyun): 메모리에 토큰 저장 (실제 프로덕션에서는 데이터베이스 사용)
const registeredTokens: Array<{
  token: string;
  platform: string;
  deviceName: string;
  registeredAt: Date;
}> = [];

export async function POST(request: NextRequest) {
  try {
    const { token, platform, deviceName } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: '토큰이 필요합니다.' },
        { status: 400 }
      );
    }

    // NOTE(seonghyun): 기존 토큰이 있으면 업데이트, 없으면 새로 추가
    const existingIndex = registeredTokens.findIndex((t) => t.token === token);
    const tokenData = {
      token,
      platform,
      deviceName,
      registeredAt: new Date(),
    };

    if (existingIndex >= 0) {
      registeredTokens[existingIndex] = tokenData;
    } else {
      registeredTokens.push(tokenData);
    }

    console.log('등록된 토큰:', tokenData);
    console.log('총 등록된 토큰 수:', registeredTokens.length);

    return NextResponse.json({
      success: true,
      message: '토큰이 성공적으로 등록되었습니다.',
      tokenCount: registeredTokens.length,
    });
  } catch (error) {
    console.error('토큰 등록 오류:', error);
    return NextResponse.json(
      { error: '토큰 등록 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    tokens: registeredTokens,
    count: registeredTokens.length,
  });
}
