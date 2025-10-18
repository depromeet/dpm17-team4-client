import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import { lockService, LockSettingsInterface } from '../services/lockService';

const { width } = Dimensions.get('window');

interface LockSettingsComponentProps {
  onClose: () => void;
  onSettingsChanged?: () => void;
}

export default function LockSettings({ onClose, onSettingsChanged }: LockSettingsComponentProps) {
  const [settings, setSettings] = useState<LockSettingsInterface | null>(null);
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const [pinCode, setPinCode] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [isSettingPin, setIsSettingPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    initializeSettings();
  }, []);

  const initializeSettings = async () => {
    try {
      const lockSettings = await lockService.getSettings();
      const biometricAvailable = await lockService.isBiometricAvailable();
      
      console.log('잠금 설정 로드됨:', lockSettings);
      setSettings(lockSettings);
      setIsBiometricAvailable(biometricAvailable);
    } catch (error) {
      console.error('잠금 설정 초기화 실패:', error);
    }
  };

  const handleToggleLock = async (enabled: boolean) => {
    try {
      if (enabled) {
        if (!settings?.pinCode) {
          setIsSettingPin(true);
          return;
        }
        await lockService.updateSettings({ isEnabled: enabled });
        console.log('잠금 활성화됨');
      } else {
        await lockService.disableLock();
        console.log('잠금 비활성화됨');
      }
      
      await initializeSettings();
      onSettingsChanged?.();
    } catch (error) {
      console.error('잠금 설정 변경 실패:', error);
      Alert.alert('오류', '설정 변경 중 오류가 발생했습니다.');
    }
  };

  const handleSetPin = async () => {
    if (!pinCode.trim() || pinCode.length !== 6) {
      Alert.alert('오류', 'PIN은 6자리여야 합니다.');
      return;
    }

    if (pinCode !== confirmPin) {
      Alert.alert('오류', 'PIN이 일치하지 않습니다.');
      return;
    }

    setIsLoading(true);
    try {
      await lockService.enableLock(pinCode);
      setPinCode('');
      setConfirmPin('');
      setIsSettingPin(false);
      await initializeSettings();
      onSettingsChanged?.();
      Alert.alert('성공', '앱 잠금이 활성화되었습니다.');
    } catch (error) {
      console.error('PIN 설정 실패:', error);
      Alert.alert('오류', 'PIN 설정 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // PIN과 확인 PIN이 모두 6자리이고 일치하면 자동으로 설정
  useEffect(() => {
    if (pinCode.length === 6 && confirmPin.length === 6 && pinCode === confirmPin) {
      handleSetPin();
    }
  }, [pinCode, confirmPin]);

  const handleChangePin = async () => {
    setIsSettingPin(true);
  };

  const handleToggleBiometric = async (enabled: boolean) => {
    if (enabled && !isBiometricAvailable) {
      Alert.alert('오류', '이 기기에서는 생체인증을 사용할 수 없습니다.');
      return;
    }

    await lockService.updateSettings({ useBiometric: enabled });
    await initializeSettings();
    onSettingsChanged?.();
  };



  if (!settings) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>로딩 중...</Text>
      </View>
    );
  }

  if (isSettingPin) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>PIN 설정</Text>
          <TouchableOpacity onPress={() => setIsSettingPin(false)}>
            <Text style={styles.cancelText}>취소</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.pinForm}>
          <Text style={styles.label}>새 PIN 입력</Text>
          <TextInput
            style={styles.pinInput}
            value={pinCode}
            onChangeText={setPinCode}
            placeholder="PIN을 입력하세요 (6자리)"
            secureTextEntry
            keyboardType="numeric"
            maxLength={6}
          />

          <Text style={styles.label}>PIN 확인</Text>
          <TextInput
            style={styles.pinInput}
            value={confirmPin}
            onChangeText={setConfirmPin}
            placeholder="PIN을 다시 입력하세요"
            secureTextEntry
            keyboardType="numeric"
            maxLength={6}
          />

        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>앱 잠금 설정</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.cancelText}>닫기</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* 잠금 활성화 */}
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>앱 잠금</Text>
            <Text style={styles.settingDescription}>
              앱을 잠그고 보안을 강화합니다
            </Text>
          </View>
          <Switch
            value={settings.isEnabled}
            onValueChange={handleToggleLock}
            trackColor={{ false: '#ccc', true: '#007AFF' }}
            thumbColor={settings.isEnabled ? '#fff' : '#f4f3f4'}
          />
        </View>

        {/* PIN 설정/변경 */}
        {settings.isEnabled && (
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>PIN 설정</Text>
              <Text style={styles.settingDescription}>
                앱 잠금 해제용 PIN 코드
              </Text>
            </View>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleChangePin}
            >
              <Text style={styles.actionButtonText}>
                {settings.pinCode ? '변경' : '설정'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* 생체인증 */}
        {settings.isEnabled && isBiometricAvailable && (
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>생체인증</Text>
              <Text style={styles.settingDescription}>
                Face ID, Touch ID, 지문인식 사용
              </Text>
            </View>
            <Switch
              value={settings.useBiometric}
              onValueChange={handleToggleBiometric}
              trackColor={{ false: '#ccc', true: '#007AFF' }}
              thumbColor={settings.useBiometric ? '#fff' : '#f4f3f4'}
            />
          </View>
        )}

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  cancelText: {
    fontSize: 16,
    color: '#007AFF',
  },
  content: {
    padding: 20,
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
  },
  actionButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  pinForm: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  pinInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 8,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 24,
  },
  saveButtonDisabled: {
    backgroundColor: '#ccc',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
