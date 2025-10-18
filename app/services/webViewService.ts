import { showLocalNotification, requestNotificationPermission } from './notificationService';
import { lockService } from './lockService';

// NOTE(seonghyun): WebView 메시지 타입 정의
export interface WebViewMessage {
  type: 'SHOW_NOTIFICATION' | 'REQUEST_PERMISSION' | 'OPEN_LOCK_SETTINGS' | 'CHECK_LOCK_STATUS';
  title?: string;
  body?: string;
}

// NOTE(seonghyun): WebView에서 받은 메시지 처리
export const handleWebViewMessage = async (event: any, onOpenLockSettings?: () => void) => {
  try {
    const data: WebViewMessage = JSON.parse(event.nativeEvent.data);
    
    switch (data.type) {
      case 'SHOW_NOTIFICATION':
        if (data.title && data.body) {
          await showLocalNotification(data.title, data.body);
        } else {
          console.error('❌ 알림 메시지에 제목 또는 내용이 없습니다.');
        }
        break;
        
      case 'REQUEST_PERMISSION':
        await requestNotificationPermission();
        break;
        
      case 'OPEN_LOCK_SETTINGS':
        if (onOpenLockSettings) {
          onOpenLockSettings();
        }
        break;
        
      case 'CHECK_LOCK_STATUS':
        const settings = await lockService.getSettings();
        const isLocked = lockService.isAppLocked();
        // WebView에 잠금 상태 전송
        if (event.target) {
          event.target.postMessage(JSON.stringify({
            type: 'LOCK_STATUS_RESPONSE',
            isEnabled: settings.isEnabled,
            isLocked: isLocked,
            useBiometric: settings.useBiometric,
            autoLockTimeout: settings.autoLockTimeout,
          }));
        }
        break;
        
      default:
        console.warn('⚠️ 알 수 없는 메시지 타입:', data.type);
    }
  } catch (error) {
    console.error('❌ WebView 메시지 파싱 오류:', error);
  }
};
