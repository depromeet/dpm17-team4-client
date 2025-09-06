import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { color } = body;

    // 여기서 실제 데이터베이스에 저장하거나 처리하는 로직을 구현
    console.log('Received color:', color);

    // 성공 응답
    return NextResponse.json(
      {
        message: 'Color recorded successfully',
        color: color,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error recording color:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
