import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { water, stress, foods, occurredAt } = body;

   
    // TODO: 실제 데이터베이스에 저장하는 로직 구현
    console.log('Received lifestyle data:', {
      water,
      stress,
      foods,
      occurredAt
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
          occurredAt
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error recording lifestyle data:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}
