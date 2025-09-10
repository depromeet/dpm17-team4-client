import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { color, time, shape, info } = body;

    console.log('Received color:', color);

    return NextResponse.json(
      {
        color,
        time,
        shape,
        info,
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
