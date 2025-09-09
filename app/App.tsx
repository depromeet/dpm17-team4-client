import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { useEffect, useRef } from 'react';
import { setupNotificationHandler, registerForPushNotificationsAsync } from './services/notificationService';
import { handleWebViewMessage } from './services/webViewService';

export default function App() {
  const webViewRef = useRef<WebView>(null);

  useEffect(() => {
    // NOTE(seonghyun): 알림 설정 및 권한 요청
    setupNotificationHandler();
    registerForPushNotificationsAsync();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: 'http://192.168.45.51:3000' }}
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