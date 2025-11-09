# kkruk 앱 빌드 가이드

## 선택지 비교

### 1. EAS Build (권장) ⭐
- **비용**: 무료 플랜 제공 (월 30분 빌드 시간)
- **장점**: 
  - 간편함 (명령 한 줄로 빌드)
  - Keystore 자동 관리
  - 버전 자동 증가
  - 클라우드 환경에서 빠른 빌드
  - macOS 없이도 iOS 빌드 가능
- **단점**: 무료 플랜은 빌드 시간 제한

### 2. 로컬 빌드 (무료)
- **비용**: 완전 무료
- **장점**: 
  - 빌드 시간 제한 없음
  - 완전한 제어권
- **단점**: 
  - 설치가 복잡함
  - Keystore 수동 관리 필요
  - iOS 빌드는 macOS 필요

---

## 방법 1: EAS Build 사용 (간편함) ⭐

### 필요한 것
```bash
npm install -g eas-cli
```

### 빌드 명령어
```bash
cd app

# 로그인 (최초 1회)
eas login

# Android AAB 빌드 (Play Store 업로드용)
eas build --platform android --profile production

# iOS IPA 빌드 (App Store 업로드용)
# WebView에서 Apple 로그인을 사용하므로 capability 자동 동기화 비활성화
EXPO_NO_CAPABILITY_SYNC=1 eas build --platform ios --profile production

# 빌드 상태 확인
eas build:list

# 빌드 완료 후 다운로드
eas build:download [BUILD_ID]
```

### 빌드 시간
- 첫 빌드: 15-20분
- 이후 빌드: 10-15분

---

## 방법 2: 로컬 빌드 (무료 + 제어 가능)

### Android 빌드

#### 1단계: Release Keystore 생성

```bash
cd app/android/app
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

정보 입력:
- 이름, 조직 등 입력
- 비밀번호는 안전하게 관리!

#### 2단계: gradle.properties 설정

`app/android/gradle.properties` 파일을 열고 주석 해제 후 정보 입력:

```properties
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=your_keystore_password
MYAPP_RELEASE_KEY_PASSWORD=your_key_password
```

#### 3단계: AAB 빌드

```bash
cd app/android
./gradlew bundleRelease
```

빌드 파일 위치:
```
app/android/app/build/outputs/bundle/release/app-release.aab
```

#### 4단계: APK 빌드 (테스트용)

```bash
cd app/android
./gradlew assembleRelease
```

빌드 파일 위치:
```
app/android/app/build/outputs/apk/release/app-release.apk
```

### iOS 빌드 (macOS 필요)

```bash
cd app/ios
pod install
```

Xcode에서:
1. `app.xcworkspace` 열기
2. Product → Archive
3. Organizer에서 Distribute App

---

## 빌드 전 체크리스트

### 앱 정보 확인 ✅
- [x] 앱 이름: **kkruk**
- [x] Android package: `com.dpm17team4.app`
- [x] iOS bundle ID: `com.leeseonghyun316.app`

### 버전 관리
현재 버전: `1.0.0` (versionCode: 1)
- Play Store 업로드 전 versionCode 증가 필요
- EAS Build 사용 시 `autoIncrement: true`로 자동 처리됨

### 필수 아이콘 확인
- [x] `app/assets/icon.png` (1024x1024)
- [x] `app/assets/adaptive-icon.png` (Android)
- [x] `app/assets/splash-icon.png`

---

## 배포 순서

### Play Store 배포
1. 빌드 (AAB 파일 생성)
2. Play Console 로그인 (https://play.google.com/console)
3. 앱 생성 또는 기존 앱 선택
4. Production → 새 버전 생성
5. AAB 파일 업로드
6. 출시 노트 작성
7. 검토 제출

### App Store 배포
1. 빌드 (IPA 파일 생성)
2. App Store Connect 로그인
3. 앱 정보 입력
4. Archive 업로드
5. 심사 제출

---

## 문제 해결

### 빌드 실패 시
```bash
# Android 의존성 재설치
cd app/android
./gradlew clean

# iOS 의존성 재설치
cd app/ios
pod deintegrate
pod install
```

### Keystore 분실 시
- EAS Build: 안전하게 저장됨, 문제 없음
- 로컬 빌드: 새 keystore 생성 → 기존 앱에 업데이트 불가능 (새 앱 등록 필요)

### iOS 빌드 시 Capability 동기화 에러
에러 메시지: `Failed to sync capabilities` 또는 `APPLE_ID_AUTH` 관련 에러

**원인**: 
- WebView에서 Apple 로그인을 사용하므로 `APPLE_ID_AUTH` capability가 필요함
- EAS가 자동으로 capability를 변경하려고 하지만, Apple Developer Console에 연결된 앱이 있어서 실패

**해결 방법**:
```bash
# Capability 자동 동기화 비활성화 (권장)
EXPO_NO_CAPABILITY_SYNC=1 eas build --platform ios --profile production
```

또는 Apple Developer Console에서 수동으로 `APPLE_ID_AUTH` capability를 ON으로 유지:
https://developer.apple.com/account/resources/identifiers/bundleId/edit/6FTM2T7Y8M

### iOS 빌드 시 Expo.plist 파일 누락 에러
에러 메시지: `Build input file cannot be found: '/Users/expo/workingdir/build/app/ios/app/Supporting/Expo.plist'`

**원인**: 
- `Expo.plist` 파일이 `.gitignore`에 포함되어 Git에 커밋되지 않음
- EAS Build는 Git 저장소를 클론하므로 파일이 없어서 빌드 실패

**해결 방법**:
```bash
# 1. .gitignore에서 ios/app/Supporting/ 제거 (이미 완료)
# 2. 파일을 Git에 추가
git add ios/app/Supporting/Expo.plist
git commit -m "Add Expo.plist for iOS build"
# 3. 다시 빌드
EXPO_NO_CAPABILITY_SYNC=1 eas build --platform ios --profile production
```

---

## 추천

**처음 배포하는 경우**: EAS Build 사용 추천
- 가장 간단하고 실수 없음
- Keystore 관리 걱정 없음
- iOS 빌드도 쉽게 가능

**무료로 계속 사용**: 로컬 빌드
- 빌드 시간 제한 없음
- 완전한 제어권

