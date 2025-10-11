# Apple Sign In 설정 가이드

## [완료] 0. 필요한 패키지 설치

```bash
yarn add jsonwebtoken @types/jsonwebtoken
```

## 1. Apple Developer Console 설정

### [완료] 1.1 App ID 생성
1. [Apple Developer Console](https://developer.apple.com/account/)에 로그인
2. "Certificates, Identifiers & Profiles" → "Identifiers" 이동
3. "+" 버튼 클릭하여 새 App ID 생성
4. "App IDs" 선택 후 "Continue"
5. App ID 정보 입력:
   - Description: 앱 설명
   - Bundle ID: `com.leeseonghyun316.app`
6. "Sign In with Apple" 기능 활성화
7. "Continue" → "Register"

### [완료] 1.2 Service ID 생성
1. "Identifiers" → "+" 버튼 클릭
2. "Services IDs" 선택 후 "Continue"
3. Service ID 정보 입력:
   - Description: 웹 서비스 설명
   - Identifier: `com.leeseonghyun316.app.web` 
4. "Sign In with Apple" 체크 후 "Configure"
5. Primary App ID 선택 (위에서 생성한 App ID)
6. Domains and Subdomains에 웹 도메인 추가:
   - `cushionlike-shallowly-nancie.ngrok-free.dev` (개발용)
   - localhost 등 등록 불가, ngrok 사용 필요, url 변경 대응 필요
     - 참고: https://iwoohaha.tistory.com/347#google_vignette 
7. Return URLs 추가:
   - `https://cushionlike-shallowly-nancie.ngrok-free.dev/api/v1/auth/apple/callback` (개발용)
8. "Save" → "Continue" → "Register"

### [완료] 1.3 Private Key 생성
1. "Keys" → "+" 버튼 클릭
2. Key Name 입력 (예: "Apple Sign In Key")
3. "Sign In with Apple" 체크 후 "Configure"
4. Primary App ID 선택
5. "Save" → "Continue" → "Register"
6. **중요**: Key ID와 Private Key 파일(.p8) 다운로드 (한 번만 가능!)

## [완료] 2. 환경변수 설정

`.env.local` 파일을 생성하고 다음 변수들을 설정하세요:

```env
# Apple Sign In 설정 추가
APPLE_CLIENT_ID=com.leeseonghyun316.app.web
APPLE_TEAM_ID=8R4YV3AUWK
APPLE_KEY_ID=5K325JBB2T
APPLE_PRIVATE_KEY=요청필
APPLE_REDIRECT_URI=변경될 수 있음
WEB_HOST=https://cushionlike-shallowly-nancie.ngrok-free.dev
```

### 환경변수 설명:
- `APPLE_CLIENT_ID`: Service ID (웹용)
- `APPLE_TEAM_ID`: Apple Developer Team ID (10자리)
- `APPLE_KEY_ID`: 생성한 Private Key의 Key ID (10자리)
- `APPLE_PRIVATE_KEY`: 다운로드한 .p8 파일의 내용
- `APPLE_REDIRECT_URI`: Apple 콜백 URL

## [완료] 3. Private Key 설정 방법

1. 다운로드한 `.p8` 파일을 텍스트 에디터로 열기
2. 내용을 복사하여 `APPLE_PRIVATE_KEY`에 설정
3. 줄바꿈을 `\n`으로 변환
4. 예시:
```
-----BEGIN PRIVATE KEY-----
MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQg...
-----END PRIVATE KEY-----
```

## [완료] 4. 테스트

1. 개발 서버 실행: `yarn dev`
2. `/auth` 페이지에서 "Apple로 시작하기" 버튼 클릭
3. Apple 로그인 페이지로 리디렉션 확인
4. 로그인 후 홈페이지로 리디렉션 확인