# DPM17 Team4 Web View

React Native WebView에서 표시되는 Next.js 웹 애플리케이션입니다.

## 기술 스택

- **Framework**: Next.js 15.5.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: Yarn

## 시작하기

### 개발 서버 실행

```bash
yarn dev
```

개발 서버가 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

### 빌드

```bash
yarn build
```

### 프로덕션 서버 실행

```bash
yarn start
```

## 프로젝트 구조

```
web/
├── src/
│   └── app/
│       ├── page.tsx      # 메인 페이지
│       ├── layout.tsx    # 레이아웃
│       └── globals.css   # 전역 스타일
├── public/               # 정적 파일
└── package.json
```

## React Native 연동

이 웹 애플리케이션은 React Native의 WebView 컴포넌트에서 표시되도록 설계되었습니다.

```typescript
<WebView
  source={{ uri: 'http://localhost:3000' }}
  style={styles.webview}
  javaScriptEnabled={true}
  domStorageEnabled={true}
  startInLoadingState={true}
  scalesPageToFit={true}
  allowsInlineMediaPlayback={true}
  mediaPlaybackRequiresUserAction={false}
/>
```
