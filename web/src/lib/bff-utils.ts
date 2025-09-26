import { type NextRequest } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://211.188.58.167';

/**
 * BFF에서 백엔드로 요청할 때 사용하는 공통 헤더 생성 함수
 */
export function createBackendHeaders(request: NextRequest): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Authorization 헤더 전달
  const authHeader = request.headers.get('Authorization');
  if (authHeader) {
    headers['Authorization'] = authHeader;
    console.log('🔑 BFF: Authorization 헤더 전달됨:', authHeader.substring(0, 20) + '...');
  } else {
    console.log('⚠️ BFF: Authorization 헤더가 없습니다');
  }

  // 다른 필요한 헤더들도 전달
  const userAgent = request.headers.get('User-Agent');
  if (userAgent) {
    headers['User-Agent'] = userAgent;
  }

  return headers;
}

/**
 * BFF에서 백엔드로 요청하는 공통 fetch 함수
 */
export async function fetchFromBackend(
  endpoint: string,
  request: NextRequest,
  options: {
    method?: string;
    body?: string;
    searchParams?: URLSearchParams;
  } = {}
) {
  const { method = 'GET', body, searchParams } = options;
  
  const queryString = searchParams ? searchParams.toString() : '';
  const url = `${BACKEND_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;
  
  console.log(`🔄 BFF: ${method} ${url}`);
  
  const response = await fetch(url, {
    method,
    headers: createBackendHeaders(request),
    body,
  });

  console.log(`📥 BFF: 백엔드 응답 상태: ${response.status}`);
  
  return response;
}
