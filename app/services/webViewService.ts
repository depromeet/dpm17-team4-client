import React from 'react';
import { Linking } from 'react-native';
import { showLocalNotification, requestNotificationPermission } from './notificationService';
import { lockService } from './lockService';
import { tokenService } from './tokenService';

// NOTE(seonghyun): WebView 메시지 타입 정의
export interface WebViewMessage {
  type: 'SHOW_NOTIFICATION' | 'REQUEST_PERMISSION' | 'OPEN_LOCK_SETTINGS' | 'CHECK_LOCK_STATUS' | 'SAVE_REFRESH_TOKEN' | 'GET_REFRESH_TOKEN' | 'OPEN_EXTERNAL_BROWSER';
  title?: string;
  body?: string;
  token?: string;
  url?: string;
  requestId?: string; // 응답 매칭을 위한 ID
}

// NOTE(seonghyun): WebView에서 받은 메시지 처리
export const handleWebViewMessage = async (
  event: any,
  webViewRef: React.RefObject<any> | null,
  onOpenLockSettings?: () => void
) => {
  try {
    const data: WebViewMessage = JSON.parse(event.nativeEvent.data);
    
    switch (data.type) {
      case 'SHOW_NOTIFICATION':
        if (data.title && data.body) {
          await showLocalNotification(data.title, data.body);
        } else {
          console.error('❌ 알림 메시지에 제목 또는 내용이 없습니다.');
        }
        break;
        
      case 'REQUEST_PERMISSION':
        await requestNotificationPermission();
        break;
        
      case 'OPEN_LOCK_SETTINGS':
        if (onOpenLockSettings) {
          onOpenLockSettings();
        }
        break;
        
      case 'CHECK_LOCK_STATUS':
        const settings = await lockService.getSettings();
        const isLocked = lockService.isAppLocked();
        // WebView에 잠금 상태 전송
        if (webViewRef?.current) {
          webViewRef.current.postMessage(JSON.stringify({
            type: 'LOCK_STATUS_RESPONSE',
            isEnabled: settings.isEnabled,
            isLocked: isLocked,
            useBiometric: settings.useBiometric,
          }));
        }
        break;
        
      case 'SAVE_REFRESH_TOKEN':
        if (data.token) {
          try {
            await tokenService.saveRefreshToken(data.token);
            // WebView에 성공 응답 전송
            if (webViewRef?.current) {
              webViewRef.current.postMessage(JSON.stringify({
                type: 'SAVE_REFRESH_TOKEN_RESPONSE',
                success: true,
                requestId: data.requestId,
              }));
            }
          } catch (error) {
            console.error('❌ Refresh token 저장 실패:', error);
            if (webViewRef?.current) {
              webViewRef.current.postMessage(JSON.stringify({
                type: 'SAVE_REFRESH_TOKEN_RESPONSE',
                success: false,
                error: 'Failed to save refresh token',
                requestId: data.requestId,
              }));
            }
          }
        } else {
          console.error('❌ Refresh token이 없습니다.');
          if (webViewRef?.current) {
            webViewRef.current.postMessage(JSON.stringify({
              type: 'SAVE_REFRESH_TOKEN_RESPONSE',
              success: false,
              error: 'Token is missing',
              requestId: data.requestId,
            }));
          }
        }
        break;
        
      case 'GET_REFRESH_TOKEN':
        try {
          const token = await tokenService.getRefreshToken();
          // WebView에 토큰 전송
          if (webViewRef?.current) {
            webViewRef.current.postMessage(JSON.stringify({
              type: 'GET_REFRESH_TOKEN_RESPONSE',
              success: true,
              token: token,
              requestId: data.requestId,
            }));
          }
        } catch (error) {
          console.error('❌ Refresh token 조회 실패:', error);
          if (webViewRef?.current) {
            webViewRef.current.postMessage(JSON.stringify({
              type: 'GET_REFRESH_TOKEN_RESPONSE',
              success: false,
              error: 'Failed to get refresh token',
              requestId: data.requestId,
            }));
          }
        }
        break;
        
      case 'OPEN_EXTERNAL_BROWSER':
        if (data.url) {
          try {
            Linking.canOpenURL(data.url).then((canOpen) => {
              if (canOpen) {
                Linking.openURL(data.url!);
              } else {
                console.error('❌ 외부 브라우저를 열 수 없습니다:', data.url);
              }
            }).catch((error) => {
              console.error('❌ 외부 브라우저 열기 실패:', error);
            });
          } catch (error) {
            console.error('❌ 외부 브라우저 열기 오류:', error);
          }
        } else {
          console.error('❌ URL이 제공되지 않았습니다.');
        }
        break;
        
      default:
        console.warn('⚠️ 알 수 없는 메시지 타입:', data.type);
    }
  } catch (error) {
    console.error('❌ WebView 메시지 파싱 오류:', error);
  }
};
