import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';

export interface LockSettingsInterface {
  isEnabled: boolean;
  useBiometric: boolean;
  pinCode?: string;
  autoLockTimeout: number; // minutes
  lastUnlockTime?: number;
}

const LOCK_SETTINGS_KEY = 'app_lock_settings';
const DEFAULT_LOCK_SETTINGS: LockSettingsInterface = {
  isEnabled: false,
  useBiometric: true,
  autoLockTimeout: 5, // 5분
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
      
      // 앱 시작 시 자동 잠금 확인
      if (this.lockSettings.isEnabled) {
        await this.checkAutoLock();
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

  async checkAutoLock(): Promise<boolean> {
    if (!this.lockSettings.isEnabled || !this.lockSettings.lastUnlockTime) {
      return false;
    }

    const now = Date.now();
    const timeSinceUnlock = now - this.lockSettings.lastUnlockTime;
    const timeoutMs = this.lockSettings.autoLockTimeout * 60 * 1000;

    if (timeSinceUnlock >= timeoutMs) {
      this.isLocked = true;
      return true;
    }

    return false;
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
        return false;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: '앱 잠금 해제',
        fallbackLabel: 'PIN 사용',
        disableDeviceFallback: false, // 기기 비밀번호 fallback 허용
      });

      if (result.success) {
        await this.unlockApp();
        return true;
      }

      // 생체인증이 실패하거나 취소된 경우
      if (result.error === 'user_cancel') {
        // 사용자가 취소한 경우
        return false;
      }

      // user_fallback은 기기 비밀번호를 사용한 경우이므로 성공으로 처리
      if (result.error === 'user_fallback') {
        // 기기 비밀번호로 인증 성공
        await this.unlockApp();
        return true;
      }

      return false;
    } catch (error) {
      console.error('생체인증 실패:', error);
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
