# 알림 기능 사용 가이드

## 📋 프로젝트 정보

- **Firebase 프로젝트명**: `dpm17team4`
- **Expo 프로젝트명**: `dpm17team4`
- **Android 패키지명**: `com.dpm17team4.app`

## 🔔 구현된 알림 기능

### 알림 종류
1. **로컬 알림**: 앱이 실행 중일 때만 표시되는 알림
2. **서버 푸시 알림**: 앱이 종료되어도 받을 수 있는 실제 푸시 알림

### 테스트 완료 상태
- ✅ **Android 로컬 알림**: 완전 작동
- ✅ **Android 서버 푸시 알림**: 완전 작동
- ✅ **iOS 로컬 알림**: 완전 작동
- ⏳ **iOS 서버 푸시 알림**: Apple 개발자 계정 활성화 대기 중

## 🔧 동작 원리

### 1. 로컬 알림 (WebView ↔ React Native 통신)
```
웹 페이지 → WebView 메시지 → React Native → Expo Notifications
```

**상세 과정**:
1. Next.js 웹 페이지에서 `window.ReactNativeWebView.postMessage()` 호출
2. React Native WebView에서 `onMessage` 이벤트로 메시지 수신
3. JSON 형태로 파싱: `{ type: 'SHOW_NOTIFICATION', title: string, body: string }`
4. Expo Notifications API로 로컬 알림 즉시 표시

### 2. 서버 푸시 알림 (Firebase Cloud Messaging)
```
웹 페이지 → Next.js API → Firebase Admin SDK → FCM → Android 앱
```

**상세 과정**:
1. Next.js 웹 페이지에서 `/api/send-push` API 호출
2. React Native 앱에서 FCM 토큰 생성 및 서버 등록
3. Next.js API에서 Firebase Admin SDK로 FCM 메시지 전송
4. Firebase가 Android 기기에 푸시 알림 전달
5. 앱이 종료되어도 알림 수신 가능

## 🚀 설정 방법

#### 🔑 따로 받아야 하는 파일들

##### 1. `google-services.json` (Android 앱용)
- **역할**: Firebase Android 앱 설정 파일
- **용도**: FCM 토큰 생성 및 Android 앱 인증
- **위치**: `app/google-services.json`
- **다운로드**: Firebase 콘솔 → 프로젝트 설정 → Android 앱 → "google-services.json 다운로드"

##### 2. `firebase-service-account.json` (웹 서버용)
- **역할**: Firebase Admin SDK 서비스 계정 키
- **용도**: 서버에서 FCM 푸시 알림 전송
- **위치**: `app/firebase-service-account.json`
- **다운로드**: Firebase 콘솔 → 프로젝트 설정 → 서비스 계정 → "새 비공개 키 생성"

#### 프로젝트 ID 업데이트
1. Firebase 프로젝트 설정에서 "프로젝트 ID" 확인
2. `app/app.json` 파일의 `projectId` 값을 `dpm17team4`로 변경

> **💡 참고**: 
> - `google-services.json`과 `firebase-service-account.json` 파일은 보안상 중요하므로 GitHub에 포함되지 않습니다
> - 위의 Firebase 설정 파일들을 따로 받아서 설정하세요
> - 나머지 모든 파일들은 이미 GitHub에 포함되어 있습니다

### 1. 의존성 설치

React Native 앱 디렉토리에서:
```bash
cd app
yarn install --frozen-lockfile
```

### 2. 앱 실행

1. **웹 서버 실행** (터미널 1):
```bash
cd web
yarn dev
```

2. **React Native 앱 실행** (터미널 2):
```bash
cd app
# Android 기기에서 실행
npx expo run:android --device

# iOS 기기에서 실행
npx expo run:ios --device

# 또는 package.json의 스크립트 사용
yarn android
yarn ios
```

## 🔍 구현 세부사항

### 로컬 알림 (WebView 메시지 통신)
- Next.js 페이지에서 `window.ReactNativeWebView.postMessage()`를 사용하여 메시지 전송
- React Native에서 `onMessage` 이벤트로 메시지 수신
- JSON 형태로 메시지 구조화: `{ type: 'SHOW_NOTIFICATION', title: string, body: string }`
- Expo Notifications를 사용하여 로컬 알림 표시

### 서버 푸시 알림
- React Native 앱에서 Expo Push 토큰 생성 및 서버 등록
- Next.js API 엔드포인트에서 Firebase Admin SDK를 통해 실제 푸시 알림 전송
- 앱이 종료되어도 알림 수신 가능
- 토큰은 메모리에 저장 (실제 프로덕션에서는 데이터베이스 사용 권장)

## 🔮 향후 개선 사항

1. **데이터베이스 연동**: 토큰을 데이터베이스에 저장하여 영구 관리
7. **iOS 서버 푸시 알림 지원**: Apple 개발자 계정 활성화 후 iOS 푸시 알림 구현

## 📚 참고 링크

- [Expo 푸시 알림 가이드](https://docs.expo.dev/push-notifications/overview/)
- [Firebase FCM 설정 가이드](https://docs.expo.dev/push-notifications/fcm-credentials/)
- [Firebase 콘솔](https://console.firebase.google.com/)
- [React Native WebView 문서](https://github.com/react-native-webview/react-native-webview)