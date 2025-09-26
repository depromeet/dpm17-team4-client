import { type NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://211.188.58.167';

export async function GET(request: NextRequest) {
  try {
    // BFF가 정상적으로 작동하는지 테스트
    const testResponse = await fetch(`${BACKEND_URL}/api/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!testResponse.ok) {
      throw new Error(`Backend health check failed: ${testResponse.status}`);
    }

    const backendData = await testResponse.json();

    return NextResponse.json({
      success: true,
      message: 'BFF is working correctly',
      bffInfo: {
        frontend: 'HTTPS (Next.js)',
        backend: 'HTTP (Backend Server)',
        proxy: 'Working',
      },
      backendResponse: backendData,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('BFF Test Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'BFF connection failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
