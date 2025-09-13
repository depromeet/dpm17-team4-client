import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// NOTE(seonghyun): API 설정
const API_BASE_URL = 'http://10.10.7.180:3000';
const REQUEST_TIMEOUT = 10000; // 10초
const MAX_RETRY_ATTEMPTS = 3;

// NOTE(seonghyun): 네트워크 연결 상태 확인 함수
const checkNetworkConnection = async (): Promise<boolean> => {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/api/health`, {
      method: 'GET',
    }, 5000);
    return response.ok;
  } catch (error) {
    console.log('🌐 서버 연결 확인 실패:', error);
    return false;
  }
};

// NOTE(seonghyun): 토큰을 로컬에 저장하는 함수
let pendingToken: string | null = null;

const storeTokenForLaterRegistration = async (token: string): Promise<void> => {
  try {
    pendingToken = token;
    console.log('💾 토큰을 메모리에 저장했습니다. 네트워크 연결 시 자동으로 등록됩니다.');
  } catch (error) {
    console.error('❌ 토큰 저장 실패:', error);
  }
};

// NOTE(seonghyun): 저장된 토큰을 서버에 등록하는 함수
export const registerPendingToken = async (): Promise<void> => {
  try {
    console.log('🔄 저장된 토큰을 서버에 등록 시도 중...');
    
    if (!pendingToken) {
      console.log('⚠️ 저장된 토큰이 없습니다.');
      return;
    }
    
    const isConnected = await checkNetworkConnection();
    if (isConnected) {
      console.log('✅ 네트워크 연결 확인됨. 토큰 등록 시도 중...');
      await registerTokenToServer(pendingToken);
      pendingToken = null; // 등록 성공 후 저장된 토큰 제거
    } else {
      console.log('⚠️ 여전히 서버에 연결할 수 없습니다.');
    }
  } catch (error) {
    console.error('❌ 저장된 토큰 등록 실패:', error);
  }
};

// NOTE(seonghyun): 알림 설정
export const setupNotificationHandler = () => {
  Notifications.setNotificationHandler({
    handleNotification: async (notification) => {
      console.log('🔔 알림 핸들러 호출됨:', notification.request.content.title);
      return {
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      };
    },
  });
  
  // NOTE(seonghyun): 알림 수신 리스너 추가
  const subscription = Notifications.addNotificationReceivedListener(notification => {
    console.log('📱 알림 수신됨:', {
      title: notification.request.content.title,
      body: notification.request.content.body,
      data: notification.request.content.data,
      trigger: notification.request.trigger,
    });
  });

  const responseSubscription = Notifications.addNotificationResponseReceivedListener(response => {
    console.log('👆 알림 탭됨:', {
      title: response.notification.request.content.title,
      body: response.notification.request.content.body,
      data: response.notification.request.content.data,
    });
  });

  return () => {
    subscription.remove();
    responseSubscription.remove();
  };
};

// NOTE(seonghyun): 로컬 알림 표시
export const showLocalNotification = async (title: string, body: string) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
      },
      trigger: null, // NOTE(seonghyun): 즉시 표시
    });
  } catch (error) {
    console.error('로컬 알림 표시 실패:', error);
  }
};

// NOTE(seonghyun): 수동으로 권한 요청하는 함수
export const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    const { status } = await Notifications.requestPermissionsAsync();
    
    if (status === 'granted') {
      console.log('✅ 알림 권한이 허용되었습니다.');
      return true;
    } else {
      console.log('❌ 알림 권한이 거부되었습니다.');
      return false;
    }
  } catch (error) {
    console.error('❌ 권한 요청 오류:', error);
    return false;
  }
};

// NOTE(seonghyun): 알림 권한 요청 및 푸시 토큰 생성 함수
export const registerForPushNotificationsAsync = async (): Promise<string | null> => {
  let token: string | null = null;

  console.log(`🔧 ${Platform.OS} 플랫폼에서 토큰 등록 시작`);

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
    console.log('✅ Android 알림 채널 설정 완료');
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  console.log(`📋 기존 권한 상태: ${existingStatus}`);
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    console.log('🔐 권한 요청 중...');
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
    console.log(`📋 권한 요청 결과: ${finalStatus}`);
  }

  if (finalStatus !== 'granted') {
    console.log('❌ 알림 권한이 거부되었습니다.');
    return null;
  }
  
  console.log('✅ 알림 권한이 허용되었습니다.');

  // NOTE(seonghyun): Expo Push 토큰 생성
  try {
    console.log('🔑 Expo Push 토큰 생성 시도 중...');
    const expoPushToken = await Notifications.getExpoPushTokenAsync();
    token = expoPushToken.data;
    console.log(`📱 ${Platform.OS} Expo Push Token:`, token);

    // NOTE(seonghyun): 토큰을 서버에 등록
    if(token) {
      console.log('🌐 서버에 토큰 등록 시도 중...');
      
      // NOTE(seonghyun): 네트워크 연결 상태 확인
      const isConnected = await checkNetworkConnection();
      if (isConnected) {
        await registerTokenToServer(token);
      } else {
        console.log('⚠️ 서버에 연결할 수 없습니다. 나중에 다시 시도해주세요.');
        // NOTE(seonghyun): 연결이 안 될 때는 로컬에 토큰 저장하고 나중에 재시도
        await storeTokenForLaterRegistration(token);
      }
    }
  } catch (error) {
    console.error(`❌ ${Platform.OS} 토큰 생성 실패:`, error);
    handleTokenGenerationError(error);
  }

  return token;
};

// NOTE(seonghyun): 서버 푸시 알림 테스트 함수
export const testServerPushNotification = async (): Promise<void> => {
  try {
    console.log('🧪 서버 푸시 알림 테스트 시작...');
    
    const response = await fetchWithTimeout(`${API_BASE_URL}/api/send-push`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: '서버 푸시 테스트',
        body: '서버에서 전송한 푸시 알림입니다.',
      }),
    }, REQUEST_TIMEOUT);

    if (response.ok) {
      const result = await response.json();
      console.log('✅ 서버 푸시 알림 전송 성공:', result);
    } else {
      const errorData = await response.json();
      console.error('❌ 서버 푸시 알림 전송 실패:', response.status, errorData);
    }
  } catch (error) {
    console.error('❌ 서버 푸시 알림 테스트 오류:', error);
  }
};

// NOTE(seonghyun): 토큰 생성 오류 처리
const handleTokenGenerationError = (error: any) => {
  console.error('❌ 토큰 생성 실패:', error);
  console.log('✅ 로컬 알림은 여전히 사용 가능합니다.');
};

// NOTE(seonghyun): 타임아웃이 있는 fetch 함수
const fetchWithTimeout = async (url: string, options: RequestInit, timeout: number = REQUEST_TIMEOUT): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

// NOTE(seonghyun): 재시도 메커니즘이 있는 토큰 등록 함수
const registerTokenToServer = async (token: string, attempt: number = 1): Promise<void> => {
  try {
    console.log(`📤 ${Platform.OS} 토큰 서버 전송 중 (시도 ${attempt}/${MAX_RETRY_ATTEMPTS}):`, token.substring(0, 20) + '...');
    
    const response = await fetchWithTimeout(`${API_BASE_URL}/api/register-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        platform: Platform.OS,
        deviceName: Platform.OS === 'ios' ? 'iOS Device' : 'Android Device',
      }),
    }, REQUEST_TIMEOUT);

    if (response.ok) {
      const responseData = await response.json();
      console.log(`✅ ${Platform.OS} 토큰이 서버에 성공적으로 등록되었습니다.`, responseData);
    } else {
      const responseData = await response.json();
      console.error(`❌ ${Platform.OS} 토큰 등록 실패:`, response.statusText, responseData);
      
      // NOTE(seonghyun): 서버 오류인 경우 재시도
      if (attempt < MAX_RETRY_ATTEMPTS && response.status >= 500) {
        console.log(`🔄 ${attempt}초 후 재시도합니다...`);
        setTimeout(() => {
          registerTokenToServer(token, attempt + 1);
        }, attempt * 1000);
      }
    }
  } catch (error) {
    console.error(`❌ ${Platform.OS} 토큰 등록 중 오류 (시도 ${attempt}):`, error);
    
    // NOTE(seonghyun): 네트워크 오류인 경우 재시도
    if (attempt < MAX_RETRY_ATTEMPTS) {
      console.log(`🔄 ${attempt}초 후 재시도합니다...`);
      setTimeout(() => {
        registerTokenToServer(token, attempt + 1);
      }, attempt * 1000);
    } else {
      console.log('❌ 최대 재시도 횟수에 도달했습니다. 토큰 등록을 포기합니다.');
    }
  }
};
