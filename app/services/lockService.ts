import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';

export interface LockSettingsInterface {
  isEnabled: boolean;
  useBiometric: boolean;
  pinCode?: string;
  lastUnlockTime?: number;
}

const LOCK_SETTINGS_KEY = 'app_lock_settings';
const DEFAULT_LOCK_SETTINGS: LockSettingsInterface = {
  isEnabled: false,
  useBiometric: true,
};

export class LockService {
  private static instance: LockService;
  private isLocked = false;
  private lockSettings: LockSettingsInterface = DEFAULT_LOCK_SETTINGS;

  private constructor() {}

  static getInstance(): LockService {
    if (!LockService.instance) {
      LockService.instance = new LockService();
    }
    return LockService.instance;
  }

  async initialize(): Promise<void> {
    try {
      const stored = await AsyncStorage.getItem(LOCK_SETTINGS_KEY);
      if (stored) {
        this.lockSettings = { ...DEFAULT_LOCK_SETTINGS, ...JSON.parse(stored) };
      }
      
    } catch (error) {
      console.error('LockService 초기화 실패:', error);
    }
  }

  async getSettings(): Promise<LockSettingsInterface> {
    return { ...this.lockSettings };
  }

  async updateSettings(settings: Partial<LockSettingsInterface>): Promise<void> {
    this.lockSettings = { ...this.lockSettings, ...settings };
    await AsyncStorage.setItem(LOCK_SETTINGS_KEY, JSON.stringify(this.lockSettings));
  }

  async enableLock(pinCode: string): Promise<void> {
    await this.updateSettings({
      isEnabled: true,
      pinCode,
      lastUnlockTime: Date.now(),
    });
  }

  async disableLock(): Promise<void> {
    await this.updateSettings({
      isEnabled: false,
      pinCode: undefined,
      lastUnlockTime: undefined,
    });
    this.isLocked = false;
  }


  isAppLocked(): boolean {
    return this.isLocked;
  }

  async lockApp(): Promise<void> {
    this.isLocked = true;
  }

  async unlockWithBiometric(): Promise<boolean> {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      
      if (!hasHardware || !isEnrolled) {
        console.log('생체인증 하드웨어 없음 또는 등록되지 않음');
        return false;
      }

      console.log('생체인증 시작...');
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: '앱 잠금 해제',
        fallbackLabel: 'PIN 사용',
        disableDeviceFallback: true, // 기기 비밀번호 fallback 비활성화
        requireConfirmation: false, // 확인 단계 생략
      });

      console.log('생체인증 결과:', JSON.stringify(result, null, 2));

      // 성공한 경우
      if (result.success) {
        console.log('생체인증 성공');
        await this.unlockApp();
        return true;
      }

      // 사용자가 취소한 경우
      if (result.error === 'user_cancel') {
        console.log('사용자가 취소함');
        return false;
      }

      // 기타 실패 (생체인증 실패, 시스템 오류 등)
      console.log('생체인증 실패, 에러:', result.error);
      return false;
    } catch (error) {
      console.error('생체인증 오류:', error);
      return false;
    }
  }

  async unlockWithPin(inputPin: string): Promise<boolean> {
    if (this.lockSettings.pinCode === inputPin) {
      await this.unlockApp();
      return true;
    }
    return false;
  }

  private async unlockApp(): Promise<void> {
    this.isLocked = false;
    await this.updateSettings({
      lastUnlockTime: Date.now(),
    });
  }

  async isBiometricAvailable(): Promise<boolean> {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      return hasHardware && isEnrolled;
    } catch (error) {
      console.error('생체인증 가용성 확인 실패:', error);
      return false;
    }
  }

  async getSupportedBiometricTypes(): Promise<LocalAuthentication.AuthenticationType[]> {
    try {
      return await LocalAuthentication.supportedAuthenticationTypesAsync();
    } catch (error) {
      console.error('지원되는 생체인증 타입 확인 실패:', error);
      return [];
    }
  }
}

export const lockService = LockService.getInstance();
