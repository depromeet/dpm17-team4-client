import { type NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest) {
  try {
    // 여기서 실제 데이터베이스에서 점수를 조회하는 로직을 구현
    // 현재는 샘플 데이터를 반환
    const sampleScore = {
      score: 85,
      details: {
        accuracy: 92,
        speed: 78,
        consistency: 88,
      },
    };

    return NextResponse.json(sampleScore, { status: 200 });
  } catch (error) {
    console.error('Error fetching score:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
