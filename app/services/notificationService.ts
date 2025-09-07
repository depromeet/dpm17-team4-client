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

  return token;
};

// NOTE(seonghyun): 토큰 생성 오류 처리
const handleTokenGenerationError = (error: any) => {
  console.error('❌ 토큰 생성 실패:', error);
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
