import type { ServiceAccount } from 'firebase-admin';
import * as admin from 'firebase-admin';
import { type NextRequest, NextResponse } from 'next/server';

// NOTE(seonghyun): Firebase Admin SDK 초기화
let firebaseInitialized = false;

function initializeFirebase() {
  if (firebaseInitialized || admin.apps.length > 0) {
    return;
  }

  // NOTE(seonghyun): 환경변수에서 서비스 계정 정보 가져오기
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

  if (!projectId || !privateKey || !clientEmail) {
    console.warn(
      'Firebase 환경변수가 설정되지 않았습니다. 푸시 알림 기능이 비활성화됩니다.'
    );
    firebaseInitialized = true;
    return;
  }

  const serviceAccount = {
    projectId,
    privateKey,
    clientEmail,
  } as ServiceAccount;

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  firebaseInitialized = true;
}

// NOTE(seonghyun): Firebase Cloud Messaging을 사용하여 알림 전송
async function sendFCMPushNotification(
  token: string,
  title: string,
  body: string
) {
  try {
    const message = {
      token,
      notification: {
        title,
        body,
      },
      data: {
        title,
        body,
        timestamp: new Date().toISOString(),
      },
      android: {
        notification: {
          sound: 'default',
        },
      },
      apns: {
        payload: {
          aps: {
            sound: 'default',
          },
        },
      },
    };

    const response = await admin.messaging().send(message);
    return { success: true, messageId: response };
  } catch (error) {
    console.error('FCM Push 전송 오류:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Firebase 초기화 시도
    initializeFirebase();

    // Firebase가 초기화되지 않은 경우 (환경변수 없음)
    if (!admin.apps.length) {
      return NextResponse.json(
        {
          error:
            'Firebase 환경변수가 설정되지 않았습니다. 푸시 알림 기능을 사용할 수 없습니다.',
          details:
            'FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL 환경변수를 설정해주세요.',
        },
        { status: 503 }
      );
    }

    const { title, body, targetToken } = await request.json();

    if (!title || !body) {
      return NextResponse.json(
        { error: '제목과 내용이 필요합니다.' },
        { status: 400 }
      );
    }

    // NOTE(seonghyun): 등록된 토큰 목록 가져오기 (실제로는 데이터베이스에서 조회)
    const tokenResponse = await fetch(
      `${request.nextUrl.origin}/api/register-token`
    );
    const { tokens } = await tokenResponse.json();

    if (!tokens || tokens.length === 0) {
      return NextResponse.json(
        { error: '등록된 토큰이 없습니다. 앱을 먼저 실행해주세요.' },
        { status: 400 }
      );
    }

    const results = [];

    // NOTE(seonghyun): 특정 토큰이 지정된 경우 해당 토큰에만 전송
    if (targetToken) {
      const targetDevice = tokens.find(
        (t: { token: string; deviceName: string }) => t.token === targetToken
      );
      if (!targetDevice) {
        return NextResponse.json(
          { error: '지정된 토큰을 찾을 수 없습니다.' },
          { status: 404 }
        );
      }

      const result = await sendFCMPushNotification(targetToken, title, body);
      results.push({
        token: targetToken,
        deviceName: targetDevice.deviceName,
        result,
      });
    } else {
      // NOTE(seonghyun): 모든 등록된 토큰에 전송
      for (const tokenData of tokens) {
        try {
          const result = await sendFCMPushNotification(
            tokenData.token,
            title,
            body
          );
          results.push({
            token: tokenData.token,
            deviceName: tokenData.deviceName,
            result,
          });
        } catch (error) {
          results.push({
            token: tokenData.token,
            deviceName: tokenData.deviceName,
            error: error instanceof Error ? error.message : '알 수 없는 오류',
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: '푸시 알림이 전송되었습니다.',
      results,
    });
  } catch (error) {
    console.error('푸시 알림 전송 오류:', error);
    return NextResponse.json(
      { error: '푸시 알림 전송 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
