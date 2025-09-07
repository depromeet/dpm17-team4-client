export interface NotificationMessage {
  type: 'SHOW_NOTIFICATION' | 'REQUEST_PERMISSION';
  title?: string;
  body?: string;
}

export interface ServerPushResponse {
  results: unknown[];
  error?: string;
}

export interface TokenInfo {
  deviceName: string;
  platform: string;
}

export interface TokenResponse {
  tokens: TokenInfo[];
  count: number;
}

// NOTE(seonghyun): WebView로 메시지 전송 함수
export const sendMessageToWebView = (message: NotificationMessage): void => {
  const messageString = JSON.stringify(message);

  // NOTE(seonghyun): React Native WebView로 메시지 전송
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(messageString);
  } else {
    // NOTE(seonghyun): 개발 환경에서 테스트용
    console.log('알림 메시지:', messageString);
    alert(
      `알림 테스트: ${message.title || '권한 요청'} - ${message.body || ''}`
    );
  }
};

// NOTE(seonghyun): 로컬 알림 전송 함수
export const sendLocalNotification = (title: string, body: string): void => {
  sendMessageToWebView({
    type: 'SHOW_NOTIFICATION',
    title,
    body,
  });
};

// NOTE(seonghyun): 알림 권한 요청 함수
export const requestNotificationPermission = (): void => {
  sendMessageToWebView({
    type: 'REQUEST_PERMISSION',
  });
};

// NOTE(seonghyun): 서버 푸시 알림 전송 함수
export const sendServerPushNotification = async (
  title: string,
  body: string
): Promise<void> => {
  try {
    const response = await fetch('/api/send-push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body }),
    });

    const result: ServerPushResponse = await response.json();

    if (response.ok) {
      alert(
        `서버 푸시 알림이 전송되었습니다!\n결과: ${JSON.stringify(result.results, null, 2)}`
      );
    } else {
      alert(`서버 푸시 알림 전송 실패: ${result.error}`);
    }
  } catch (error) {
    console.error('서버 푸시 알림 오류:', error);
    alert('서버 푸시 알림 전송 중 오류가 발생했습니다.');
  }
};

// NOTE(seonghyun): 등록된 토큰 확인 함수
export const checkRegisteredTokens = async (): Promise<void> => {
  try {
    const response = await fetch('/api/register-token');
    const data: TokenResponse = await response.json();

    if (data.tokens && data.tokens.length > 0) {
      alert(
        `등록된 토큰 수: ${data.count}\n\n토큰 목록:\n${data.tokens
          .map((t) => `- ${t.deviceName} (${t.platform})`)
          .join('\n')}`
      );
    } else {
      alert(
        '등록된 토큰이 없습니다.\n\n앱을 실행하고 알림 권한을 허용한 후 다시 시도해주세요.'
      );
    }
  } catch (error) {
    console.error('토큰 확인 오류:', error);
    alert('토큰 확인 중 오류가 발생했습니다.');
  }
};
