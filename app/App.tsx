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
      const handleAppStateChange = async (nextAppState: string) => {
        if (nextAppState === 'active') {
          console.log('📱 앱이 포그라운드로 돌아왔습니다. 저장된 토큰을 확인합니다.');
          registerPendingToken();
          
          // 자동 잠금 확인
          const shouldLock = await lockService.checkAutoLock();
          if (shouldLock) {
            setIsLocked(true);
          }
        } else if (nextAppState === 'background') {
          // 앱이 백그라운드로 갈 때 자동 잠금
          const settings = await lockService.getSettings();
          if (settings.isEnabled) {
            await lockService.lockApp();
            setIsLocked(true);
          }
        }
      };

      const subscription = AppState.addEventListener('change', handleAppStateChange);

      // 초기 잠금 상태 확인
      const shouldLock = await lockService.checkAutoLock();
      if (shouldLock) {
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

  const handleUnlock = () => {
    setIsLocked(false);
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
        <LockSettings onClose={handleCloseLockSettings} />
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