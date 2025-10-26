/**
 * 앱 잠금 기능을 위한 유틸리티 함수들
 * React Native WebView와 통신하여 앱 잠금 기능을 제어합니다.
 */

// React Native WebView 타입 정의
interface WebViewRef {
  postMessage: (message: string) => void;
}

declare global {
  interface Window {
    ReactNativeWebView?: WebViewRef;
  }
}

export interface LockStatus {
  isEnabled: boolean;
  isLocked: boolean;
  useBiometric: boolean;
  autoLockTimeout: number;
}

class AppLockManager {
  private webViewRef: WebViewRef | null = null;
  private lockStatus: LockStatus | null = null;

  constructor() {
    // WebView 메시지 리스너 등록 (클라이언트 사이드에서만)
    if (typeof window !== 'undefined') {
      this.setupMessageListener();
    }
  }

  /**
   * WebView 참조 설정
   */
  setWebViewRef(ref: WebViewRef) {
    this.webViewRef = ref;
  }

  /**
   * WebView 메시지 리스너 설정
   */
  private setupMessageListener() {
    if (typeof window !== 'undefined' && window?.ReactNativeWebView) {
      window.addEventListener('message', (event) => {
        try {
          // event.data가 문자열인지 확인 후 JSON.parse 실행
          if (typeof event.data === 'string') {
            const data = JSON.parse(event.data);
            if (data.type === 'LOCK_STATUS_RESPONSE') {
              this.lockStatus = {
                isEnabled: data.isEnabled,
                isLocked: data.isLocked,
                useBiometric: data.useBiometric,
                autoLockTimeout: data.autoLockTimeout,
              };
            }
          }
        } catch (error) {
          console.error('앱 잠금 상태 메시지 파싱 오류:', error);
        }
      });
    }
  }

  /**
   * 앱 잠금 설정 화면 열기
   */
  openLockSettings() {
    // WebView가 있는 경우 (React Native 앱 내에서 실행)
    if (typeof window !== 'undefined' && window?.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: 'OPEN_LOCK_SETTINGS',
        })
      );
    }
    // WebView 참조가 설정된 경우
    else if (this.webViewRef) {
      this.webViewRef.postMessage(
        JSON.stringify({
          type: 'OPEN_LOCK_SETTINGS',
        })
      );
    }
    // 일반 웹 브라우저에서 실행되는 경우
    else {
      console.warn(
        'React Native WebView 환경이 아닙니다. 앱 잠금 설정은 앱 내에서만 사용할 수 있습니다.'
      );
      if (typeof window !== 'undefined') {
        alert('앱 잠금 설정은 React Native 앱 내에서만 사용할 수 있습니다.');
      }
    }
  }

  /**
   * 잠금 상태 확인
   */
  async checkLockStatus(): Promise<LockStatus | null> {
    if (this.webViewRef) {
      this.webViewRef.postMessage(
        JSON.stringify({
          type: 'CHECK_LOCK_STATUS',
        })
      );

      // 응답을 기다리는 간단한 폴링 (실제로는 이벤트 기반으로 처리)
      return new Promise((resolve) => {
        const checkStatus = () => {
          if (this.lockStatus) {
            resolve(this.lockStatus);
          } else {
            setTimeout(checkStatus, 100);
          }
        };
        checkStatus();
      });
    }

    return null;
  }

  /**
   * 현재 잠금 상태 반환
   */
  getLockStatus(): LockStatus | null {
    return this.lockStatus;
  }

  /**
   * 잠금이 활성화되어 있는지 확인
   */
  isLockEnabled(): boolean {
    return this.lockStatus?.isEnabled || false;
  }

  /**
   * 앱이 현재 잠겨있는지 확인
   */
  isAppLocked(): boolean {
    return this.lockStatus?.isLocked || false;
  }

  /**
   * 생체인증이 사용 가능한지 확인
   */
  isBiometricEnabled(): boolean {
    return this.lockStatus?.useBiometric || false;
  }

  /**
   * 자동 잠금 시간 반환 (분 단위)
   */
  getAutoLockTimeout(): number {
    return this.lockStatus?.autoLockTimeout || 0;
  }
}

// 싱글톤 인스턴스 생성
export const appLockManager = new AppLockManager();

/**
 * React Hook으로 앱 잠금 기능 사용
 */
export function useAppLock() {
  const openSettings = () => appLockManager.openLockSettings();
  const checkStatus = () => appLockManager.checkLockStatus();
  const getStatus = () => appLockManager.getLockStatus();
  const isEnabled = () => appLockManager.isLockEnabled();
  const isLocked = () => appLockManager.isAppLocked();
  const isBiometricEnabled = () => appLockManager.isBiometricEnabled();
  const getAutoLockTimeout = () => appLockManager.getAutoLockTimeout();

  return {
    openSettings,
    checkStatus,
    getStatus,
    isEnabled,
    isLocked,
    isBiometricEnabled,
    getAutoLockTimeout,
  };
}

/**
 * WebView 참조 설정을 위한 함수
 */
export function setWebViewRef(ref: WebViewRef) {
  appLockManager.setWebViewRef(ref);
}
