import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { occurredAt, isSuccessful, color, shape, pain, duration, note } =
      body;

    console.log('Received defecation data:', {
      occurredAt,
      isSuccessful,
      color,
      shape,
      pain,
      duration,
      note,
    });

    // 성공 응답
    return NextResponse.json(
      {
        success: true,
        message: 'Defecation data recorded successfully',
        data: {
          occurredAt,
          isSuccessful,
          color,
          shape,
          pain,
          duration,
          note,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error recording defecation data:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
