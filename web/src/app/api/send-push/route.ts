import { type NextRequest, NextResponse } from 'next/server';

// NOTE(seonghyun): Expo Push API를 사용하여 알림 전송
async function sendExpoPushNotification(
  token: string,
  title: string,
  body: string
) {
  try {
    const message = {
      to: token,
      title,
      body,
      sound: 'default',
      data: {
        title,
        body,
        timestamp: new Date().toISOString(),
      },
    };

    console.log('📤 Expo Push 메시지 전송 시도:', {
      token: token.substring(0, 20) + '...',
      title,
      body,
    });

    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Expo Push API 오류: ${response.status} - ${errorData}`);
    }

    const result = await response.json();
    console.log('✅ Expo Push 메시지 전송 성공:', result);
    return { success: true, result };
  } catch (error) {
    console.error('❌ Expo Push 전송 오류:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {

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

      const result = await sendExpoPushNotification(targetToken, title, body);
      results.push({
        token: targetToken,
        deviceName: targetDevice.deviceName,
        result,
      });
    } else {
      // NOTE(seonghyun): 모든 등록된 토큰에 전송
      for (const tokenData of tokens) {
        try {
          const result = await sendExpoPushNotification(
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
