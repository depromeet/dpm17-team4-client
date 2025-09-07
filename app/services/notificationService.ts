import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// NOTE(seonghyun): 알림 설정
export const setupNotificationHandler = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
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

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  // NOTE(seonghyun): 시뮬레이터인지 확인 (웹 환경만 체크)
  const isSimulator = Platform.OS === 'web';
  
  if (isSimulator) {
    console.log('⚠️ 시뮬레이터에서는 서버 푸시 알림이 작동하지 않습니다.');
    
    // NOTE(seonghyun): 시뮬레이터에서도 로컬 알림 권한은 요청
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      console.log('알림 권한이 거부되었습니다.');
      return null;
    }
    
    console.log('✅ 시뮬레이터에서 로컬 알림 권한이 허용되었습니다.');
  } else {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      console.log('알림 권한이 거부되었습니다.');
      return null;
    }
    
    // NOTE(seonghyun): FCM 토큰 생성
    try {
      const fcmToken = await Notifications.getDevicePushTokenAsync();
      token = fcmToken.data;
      console.log('📱 FCM Token:', token);
      
      // NOTE(seonghyun): 토큰을 서버에 등록
      if(token) {
        await registerTokenToServer(token);
      }
    } catch (error) {
      handleTokenGenerationError(error);
    }
  }

  return token;
};

// NOTE(seonghyun): 토큰 생성 오류 처리
const handleTokenGenerationError = (error: any) => {
  console.error('❌ 토큰 생성 실패:', error);
  
  if (error.message) {
    if (error.message.includes('FirebaseApp is not initialized')) {
      console.log('⚠️ Firebase 설정이 완료되지 않았습니다. 로컬 알림만 사용 가능합니다.');
      console.log('📋 Firebase 설정을 완료하려면:');
      console.log('1. Firebase 콘솔에서 프로젝트 생성');
      console.log('2. google-services.json 파일을 다운로드하여 app/ 폴더에 배치');
      console.log('3. app.json의 projectId를 실제 프로젝트 ID로 변경');
    } else if (error.message.includes('SERVICE_NOT_AVAILABLE')) {
      console.log('⚠️ Google Play Services를 사용할 수 없습니다.');
      console.log('📋 해결 방법:');
      console.log('1. 실제 Android 기기에서 테스트 (에뮬레이터가 아닌)');
      console.log('2. Google Play Services가 설치된 에뮬레이터 사용');
      console.log('3. 기기의 Google Play Services 업데이트');
      console.log('4. 네트워크 연결 확인');
    } else if (error.message.includes('NETWORK_ERROR')) {
      console.log('⚠️ 네트워크 연결 문제가 있습니다.');
      console.log('📋 해결 방법:');
      console.log('1. 인터넷 연결 확인');
      console.log('2. 방화벽 설정 확인');
      console.log('3. VPN 사용 중이라면 비활성화');
    }
  }
  
  console.log('✅ 로컬 알림은 여전히 사용 가능합니다.');
};

// NOTE(seonghyun): 토큰을 서버에 등록하는 함수
const registerTokenToServer = async (token: string) => {
  try {
    const response = await fetch('http://192.168.45.51:3000/api/register-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        platform: Platform.OS,
        deviceName: Platform.OS === 'ios' ? 'iOS Device' : 'Android Device',
      }),
    });

    if (response.ok) {
      console.log('✅ 토큰이 서버에 성공적으로 등록되었습니다.');
    } else {
      const responseData = await response.json();
      console.error('❌ 토큰 등록 실패:', response.statusText, responseData);
    }
  } catch (error) {
    console.error('❌ 토큰 등록 중 오류:', error);
  }
};
