import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, AppState } from 'react-native';
import { WebView } from 'react-native-webview';
import { useEffect, useRef } from 'react';
import { setupNotificationHandler, registerForPushNotificationsAsync, registerPendingToken, showLocalNotification, testServerPushNotification } from './services/notificationService';
import { handleWebViewMessage } from './services/webViewService';

export default function App() {
  const webViewRef = useRef<WebView>(null);

  useEffect(() => {
    // NOTE(seonghyun): 알림 설정 및 권한 요청
    const cleanup = setupNotificationHandler();
    registerForPushNotificationsAsync();

    // NOTE(seonghyun): 앱 상태 변화 감지하여 저장된 토큰 등록
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'active') {
        console.log('📱 앱이 포그라운드로 돌아왔습니다. 저장된 토큰을 확인합니다.');
        registerPendingToken();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription?.remove();
      cleanup?.();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: 'http://10.10.7.180:3000' }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        onMessage={handleWebViewMessage}
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