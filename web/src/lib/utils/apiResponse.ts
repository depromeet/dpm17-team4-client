import { NextResponse } from 'next/server';

/**API 에러 응답 타입*/
interface ApiError {
  errorMessage: string;
  code?: string;
  details?: unknown;
}

/**API 성공 응답 타입*/
interface ApiSuccess<T = unknown> {
  data?: T;
  message?: string;
  success: boolean;
}

/**
 * API 에러 응답 생성
 * @param errorMessage - 에러 메시지
 * @param status - HTTP 상태 코드
 * @param code - 에러 코드 (선택사항)
 * @param details - 추가 세부사항 (선택사항)
 */
export function createErrorResponse(
  errorMessage: string,
  status: number = 500,
  code?: string,
  details?: unknown
) {
  const error: ApiError = { errorMessage };
  if (code) error.code = code;
  if (details) error.details = details;

  return NextResponse.json(error, { status });
}

/**
 * API 성공 응답 생성
 * @param data - 응답 데이터
 * @param message - 성공 메시지 (선택사항)
 * @param status - HTTP 상태 코드 (기본값: 200)
 */
export function createSuccessResponse<T>(
  data?: T,
  message?: string,
  status: number = 200
) {
  const response: ApiSuccess<T> = { success: true };
  if (data !== undefined) response.data = data;
  if (message !== undefined) response.message = message;
  return NextResponse.json(response, { status });
}

export const ApiErrors = {
  BAD_REQUEST: (message: string = '잘못된 요청입니다.') =>
    createErrorResponse(message, 400, 'BAD_REQUEST'),

  UNAUTHORIZED: (message: string = '인증이 필요합니다.') =>
    createErrorResponse(message, 401, 'UNAUTHORIZED'),

  FORBIDDEN: (message: string = '접근 권한이 없습니다.') =>
    createErrorResponse(message, 403, 'FORBIDDEN'),

  NOT_FOUND: (message: string = '리소스를 찾을 수 없습니다.') =>
    createErrorResponse(message, 404, 'NOT_FOUND'),

  INTERNAL_ERROR: (message: string = '서버 내부 오류가 발생했습니다.') =>
    createErrorResponse(message, 500, 'INTERNAL_ERROR'),
} as const;
