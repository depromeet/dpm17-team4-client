import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, AppState } from 'react-native';
import { WebView } from 'react-native-webview';
import { useEffect, useRef, useState } from 'react';
import { setupNotificationHandler, registerForPushNotificationsAsync, registerPendingToken, showLocalNotification, testServerPushNotification } from './services/notificationService';
import { handleWebViewMessage } from './services/webViewService';
import { lockService } from './services/lockService';
import LockScreen from './components/LockScreen';
import LockSettings from './components/LockSettings';

export default function App() {
  const webViewRef = useRef<WebView>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [showLockSettings, setShowLockSettings] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // 잠금 서비스 초기화
      await lockService.initialize();
      
      // 알림 설정 및 권한 요청
      const cleanup = setupNotificationHandler();
      registerForPushNotificationsAsync();

      // 앱 상태 변화 감지하여 저장된 토큰 등록 및 자동 잠금 확인
      let lastAppState = 'unknown';
      let isProcessingStateChange = false;
      
      const handleAppStateChange = async (nextAppState: string) => {
        // 같은 상태로의 변화는 무시
        if (lastAppState === nextAppState) {
          console.log('같은 앱 상태로의 변화 무시:', nextAppState);
          return;
        }
        
        // 이미 처리 중인 상태 변화가 있으면 무시
        if (isProcessingStateChange) {
          console.log('이미 처리 중인 상태 변화가 있습니다. 무시합니다.');
          return;
        }
        
        isProcessingStateChange = true;
        console.log('앱 상태 변화:', lastAppState, '->', nextAppState, '현재 잠금 상태:', lockService.isAppLocked());
        lastAppState = nextAppState;
        
        try {
          if (nextAppState === 'active') {
            console.log('📱 앱이 포그라운드로 돌아왔습니다. 저장된 토큰을 확인합니다.');
            registerPendingToken();
            
            // 잠금 상태 확인
            if (lockService.isAppLocked()) {
              console.log('앱이 잠금 상태입니다.');
              setIsLocked(true);
            }
          } else if (nextAppState === 'background') {
            // 앱이 백그라운드로 갈 때 자동 잠금
            const settings = await lockService.getSettings();
            if (settings.isEnabled) {
              console.log('앱이 백그라운드로 이동, 자동 잠금합니다.');
              await lockService.lockApp();
              setIsLocked(true);
            }
          }
        } finally {
          isProcessingStateChange = false;
        }
      };

      const subscription = AppState.addEventListener('change', handleAppStateChange);

      // 초기 잠금 상태 확인
      if (lockService.isAppLocked()) {
        console.log('앱 시작 시 잠금 상태입니다.');
        setIsLocked(true);
      }

      setIsInitialized(true);

      return () => {
        subscription?.remove();
        cleanup?.();
      };
    } catch (error) {
      console.error('앱 초기화 실패:', error);
      setIsInitialized(true);
    }
  };

  const handleUnlock = async () => {
    console.log('잠금 해제 처리');
    setIsLocked(false);
    // LockService의 잠금 상태도 해제
    await lockService.unlockApp();
  };

  const handleShowLockSettings = () => {
    setShowLockSettings(true);
  };

  const handleCloseLockSettings = () => {
    setShowLockSettings(false);
  };

  if (!isInitialized) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  if (isLocked) {
    return (
      <SafeAreaView style={styles.container}>
        <LockScreen onUnlock={handleUnlock} onOpenSettings={handleShowLockSettings} />
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  if (showLockSettings) {
    return (
      <SafeAreaView style={styles.container}>
        <LockSettings 
          onClose={handleCloseLockSettings} 
          onSettingsChanged={async () => {
            // 설정 변경 시 잠금 상태 확인
            const settings = await lockService.getSettings();
            console.log('설정 변경됨:', settings);
            if (settings.isEnabled && lockService.isAppLocked()) {
              console.log('잠금 상태로 설정');
              setIsLocked(true);
            } else if (!settings.isEnabled) {
              console.log('잠금 해제 상태로 설정');
              setIsLocked(false);
            }
          }}
        />
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://cushionlike-shallowly-nancie.ngrok-free.dev' }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        onMessage={(event) => handleWebViewMessage(event, handleShowLockSettings)}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
});