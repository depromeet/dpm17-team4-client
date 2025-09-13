import { type NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest) {
  try {
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
