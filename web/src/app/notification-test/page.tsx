'use client';

import { useRouter } from 'next/navigation';

export default function NotificationTestPage() {
  const router = useRouter();
  // NOTE(seonghyun): WebView로 메시지 전송 함수
  const sendNotificationToApp = (title: string, body: string) => {
    const message = JSON.stringify({
      type: 'SHOW_NOTIFICATION',
      title,
      body,
    });

    // NOTE(seonghyun): React Native WebView로 메시지 전송
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(message);
    } else {
      // NOTE(seonghyun): 개발 환경에서 테스트용
      console.log('알림 메시지:', message);
      alert(`알림 테스트: ${title} - ${body}`);
    }
  };

  const handleTestNotification = () => {
    sendNotificationToApp('테스트 알림', '웹에서 보낸 알림이 앱에 표시됩니다!');
  };

  const handleCustomNotification = () => {
    const title = prompt('알림 제목을 입력하세요:', '커스텀 알림');
    const body = prompt(
      '알림 내용을 입력하세요:',
      '사용자가 입력한 알림입니다.'
    );

    if (title && body) {
      sendNotificationToApp(title, body);
    }
  };

  // NOTE(seonghyun): 앱에서 알림 권한 요청하는 함수
  const requestNotificationPermission = () => {
    const message = JSON.stringify({
      type: 'REQUEST_PERMISSION',
    });

    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(message);
    } else {
      console.log('권한 요청 메시지:', message);
      alert('앱에서 알림 권한을 요청합니다.');
    }
  };

  // NOTE(seonghyun): 서버 푸시 알림 전송 함수
  const sendServerPushNotification = async (title: string, body: string) => {
    try {
      const response = await fetch('/api/send-push', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body }),
      });

      const result = await response.json();

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

  const handleServerPushTest = () => {
    sendServerPushNotification(
      '서버 푸시 알림',
      '앱이 종료되어도 받을 수 있는 서버 푸시 알림입니다!'
    );
  };

  const handleCustomServerPush = () => {
    const title = prompt(
      '서버 푸시 알림 제목을 입력하세요:',
      '커스텀 서버 푸시'
    );
    const body = prompt(
      '서버 푸시 알림 내용을 입력하세요:',
      '서버에서 보낸 커스텀 알림입니다.'
    );

    if (title && body) {
      sendServerPushNotification(title, body);
    }
  };

  // NOTE(seonghyun): 등록된 토큰 확인 함수
  const checkRegisteredTokens = async () => {
    try {
      const response = await fetch('/api/register-token');
      const data = await response.json();

      if (data.tokens && data.tokens.length > 0) {
        alert(
          `등록된 토큰 수: ${data.count}\n\n토큰 목록:\n${data.tokens.map((t: { deviceName: string; platform: string }) => `- ${t.deviceName} (${t.platform})`).join('\n')}`
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

  // NOTE(seonghyun): 메인 페이지로 돌아가는 함수
  const goBackToMain = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl w-full">
        <div className="mb-6">
          <button
            type="button"
            onClick={goBackToMain}
            className="mb-4 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            ← 메인 페이지로 돌아가기
          </button>
          <h1 className="text-4xl font-bold text-black mb-2">
            🔔 알림 테스트 페이지
          </h1>
          <p className="text-lg text-gray-600">
            다양한 알림 기능을 테스트해보세요
          </p>
        </div>

        <div className="space-y-6">
          {/* 로컬 알림 테스트 섹션 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center justify-center">
              📱 로컬 알림 테스트
            </h2>
            <p className="text-sm text-gray-500 mb-4 text-center">
              앱이 실행 중일 때만 작동하는 로컬 알림입니다
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={handleTestNotification}
                className="bg-gray-700 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
              >
                기본 로컬 알림
              </button>
              <button
                type="button"
                onClick={handleCustomNotification}
                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
              >
                커스텀 로컬 알림
              </button>
            </div>
          </div>

          {/* 서버 푸시 알림 테스트 섹션 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center justify-center">
              🌐 서버 푸시 알림 테스트
            </h2>
            <p className="text-sm text-gray-500 mb-4 text-center">
              앱이 종료되어도 받을 수 있는 서버 푸시 알림입니다
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={handleServerPushTest}
                className="bg-gray-800 hover:bg-black text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
              >
                서버 푸시 알림
              </button>
              <button
                type="button"
                onClick={handleCustomServerPush}
                className="bg-gray-700 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
              >
                커스텀 서버 푸시
              </button>
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 text-center">
                ⚠️ Expo Go에서는 서버 푸시가 작동하지 않습니다. Development
                Build를 사용해주세요.
              </p>
            </div>
          </div>

          {/* 유틸리티 섹션 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center justify-center">
              🔧 유틸리티
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={checkRegisteredTokens}
                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
              >
                등록된 토큰 확인
              </button>
              <button
                type="button"
                onClick={requestNotificationPermission}
                className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
              >
                알림 권한 요청
              </button>
            </div>
          </div>

          {/* 정보 섹션 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center justify-center">
              ℹ️ 알림 기능 정보
            </h2>
            <div className="text-left space-y-3 text-gray-600">
              <div className="flex items-start space-x-2">
                <span className="text-gray-800 font-bold">📱 로컬 알림:</span>
                <span>
                  앱이 실행 중일 때만 작동하며, WebView에서 React Native로
                  메시지를 전송합니다.
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-gray-800 font-bold">🌐 서버 푸시:</span>
                <span>
                  Firebase Cloud Messaging을 통해 앱이 종료되어도 알림을 받을 수
                  있습니다.
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-gray-800 font-bold">🔑 토큰:</span>
                <span>
                  각 디바이스마다 고유한 FCM 토큰이 생성되어 서버 푸시 알림을
                  받을 수 있습니다.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
