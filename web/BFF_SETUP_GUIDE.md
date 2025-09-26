# BFF (Backend for Frontend) 설정 가이드

## 문제 상황
- 웹 애플리케이션이 HTTPS로 서비스됨
- 백엔드 서버가 HTTP로 서비스됨
- 브라우저에서 mixed-content 에러 발생 (HTTPS → HTTP 요청 차단)

## 해결 방법: BFF 패턴 적용

### 1. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```bash
# Backend URL for BFF proxy
BACKEND_URL=http://211.188.58.167

# Next.js API URL (same domain for BFF pattern)
NEXT_PUBLIC_API_URL=
```

### 2. BFF 아키텍처

```
[HTTPS 웹 앱] → [Next.js API Routes (BFF)] → [HTTP 백엔드 서버]
```

- 클라이언트는 같은 도메인의 API 라우트로 요청
- Next.js API 라우트가 백엔드 서버로 프록시
- mixed-content 에러 해결

### 3. 구현된 API 라우트

다음 API 엔드포인트들이 BFF 패턴으로 구현되었습니다:

- `/api/v1/auth/kakao/callback` - 카카오 콜백
- `/api/v1/activity-records` - 활동 기록 (CRUD)
- `/api/v1/poo-records` - 배변 기록 (CRUD)
- `/api/v1/foods/search` - 음식 검색
- `/api/v1/reports/daily` - 일일 리포트
- `/api/test-bff` - BFF 테스트 엔드포인트

**직접 백엔드 연결 (쿠키 사용):**
- `/api/v1/auth/kakao/login` - 카카오 로그인
- `/api/v1/auth/refresh` - 토큰 갱신 (HttpOnly 쿠키 전달을 위해)

### 4. 수정된 클라이언트 코드

다음 파일들이 BFF 패턴을 사용하도록 수정되었습니다:

- `src/lib/api-client.ts` - API 클라이언트 baseURL을 BFF로 변경

**직접 백엔드 연결:**
- `src/app/auth/page.tsx` - 카카오 로그인 요청
- `src/app/auth/_components/AuthSessionProvider.tsx` - 토큰 갱신 요청 (쿠키 전달을 위해)

### 5. 테스트 방법

1. 개발 서버 실행:
```bash
npm run dev
# 또는
yarn dev
```

2. BFF 테스트:
```bash
curl http://localhost:3000/api/test-bff
```

3. 브라우저에서 확인:
- 개발자 도구 → Network 탭
- API 요청이 같은 도메인으로 가는지 확인
- mixed-content 에러가 사라졌는지 확인

### 6. 배포 시 주의사항

- Vercel, Netlify 등에 배포할 때 `BACKEND_URL` 환경 변수 설정
- 프로덕션 환경에서도 BFF 패턴이 정상 작동하는지 확인

### 7. 장점

- ✅ mixed-content 에러 해결
- ✅ CORS 문제 해결
- ✅ API 응답 캐싱 가능
- ✅ 요청/응답 변환 및 필터링 가능
- ✅ 보안 강화 (백엔드 URL 노출 방지)

### 8. 추가 개선 사항

필요에 따라 다음 기능들을 추가할 수 있습니다:

- API 응답 캐싱
- 요청/응답 로깅
- 에러 핸들링 개선
- 요청 제한 (Rate Limiting)
- 인증 토큰 검증
