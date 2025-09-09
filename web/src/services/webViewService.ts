// NOTE(seonghyun): WebView 전역 타입 선언
declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

export interface WebViewMessage {
  type: string;
  [key: string]: unknown;
}

// NOTE(seonghyun): WebView가 사용 가능한지 확인하는 함수
export const isWebViewAvailable = (): boolean => {
  return typeof window !== 'undefined' && !!window.ReactNativeWebView;
};

// NOTE(seonghyun): WebView로 메시지를 전송하는 기본 함수
export const postMessageToWebView = (message: WebViewMessage): void => {
  const messageString = JSON.stringify(message);

  if (isWebViewAvailable()) {
    window.ReactNativeWebView?.postMessage(messageString);
  } else {
    // NOTE(seonghyun): 개발 환경에서 테스트용
    console.log('WebView 메시지:', messageString);
    console.warn('WebView가 사용 불가능합니다. 개발 환경에서 실행 중입니다.');
  }
};

// NOTE(seonghyun): WebView 메시지 수신을 위한 이벤트 리스너 설정
export const setupWebViewMessageListener = (
  callback: (message: WebViewMessage) => void
): (() => void) => {
  const handleMessage = (event: MessageEvent) => {
    try {
      const message: WebViewMessage = JSON.parse(event.data);
      callback(message);
    } catch (error) {
      console.error('WebView 메시지 파싱 오류:', error);
    }
  };

  window.addEventListener('message', handleMessage);

  // NOTE(seonghyun): 클린업 함수 반환
  return () => {
    window.removeEventListener('message', handleMessage);
  };
};

// NOTE(seonghyun): WebView 환경에서 실행 중인지 확인하는 함수
export const isRunningInWebView = (): boolean => {
  return isWebViewAvailable();
};
