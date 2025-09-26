import { type NextRequest, NextResponse } from 'next/server';
import { fetchFromBackend } from '@/lib/bff-utils';

export async function GET(request: NextRequest) {
  try {
    // BFF가 정상적으로 작동하는지 테스트
    const testResponse = await fetchFromBackend('/api/health', request, {
      method: 'GET',
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
        tokenPassing: 'Authorization header forwarded',
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
