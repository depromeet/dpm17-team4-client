import { type NextRequest, NextResponse } from 'next/server';
import { fetchFromBackend } from '@/lib/bff-utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const response = await fetchFromBackend('/api/v1/foods/search', request, {
      method: 'GET',
      searchParams,
    });

    const data = await response.json();
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('BFF Error - GET foods/search:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
