import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json(
        {
          success: false,
          error: 'Date parameter is required',
        },
        { status: 400 }
      );
    }

    // TODO: 실제 데이터베이스에서 조회하는 로직 구현
    console.log('Checking lifestyle record for date:', date);

    // 현재는 항상 null을 반환 (기존 기록이 없다고 가정)
    return NextResponse.json(
      {
        success: true,
        data: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching lifestyle record:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { water, stress, foods, occurredAt } = body;

    // TODO: 실제 데이터베이스에 저장하는 로직 구현
    console.log('Received lifestyle data:', {
      water,
      stress,
      foods,
      occurredAt,
    });

    // 성공 응답
    return NextResponse.json(
      {
        success: true,
        message: 'Lifestyle data recorded successfully',
        data: {
          water,
          stress,
          foods,
          occurredAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error recording lifestyle data:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
