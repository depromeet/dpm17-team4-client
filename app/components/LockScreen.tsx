import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { lockService, LockSettingsInterface } from '../services/lockService';

interface LockScreenProps {
  onUnlock: () => void;
  onOpenSettings?: () => void;
}

const { width } = Dimensions.get('window');

export default function LockScreen({ onUnlock, onOpenSettings }: LockScreenProps) {
  const [pin, setPin] = useState('');
  const [settings, setSettings] = useState<LockSettingsInterface | null>(null);
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasTriedBiometric, setHasTriedBiometric] = useState(false);

  useEffect(() => {
    initializeLockScreen();
  }, []);

  // 잠금 화면이 표시될 때마다 생체 인증 시도 상태 리셋
  useEffect(() => {
    setHasTriedBiometric(false);
  }, []); // 컴포넌트 마운트 시에만 실행

  const initializeLockScreen = async () => {
    try {
      const lockSettings = await lockService.getSettings();
      const biometricAvailable = await lockService.isBiometricAvailable();
      
      setSettings(lockSettings);
      setIsBiometricAvailable(biometricAvailable && lockSettings.useBiometric);

      // 생체인증이 가능하면 1회 자동으로 시도 (상태와 관계없이)
      if (biometricAvailable && lockSettings.useBiometric) {
        setTimeout(() => {
          handleBiometricAuth();
        }, 500); // 0.5초 후 자동 실행
      }
    } catch (error) {
      console.error('잠금 화면 초기화 실패:', error);
    }
  };

  const handleBiometricAuth = async () => {
    console.log('생체인증 시도');
    setIsLoading(true);
    setHasTriedBiometric(true); // 시도했음을 표시
    try {
      const success = await lockService.unlockWithBiometric();
      console.log('생체인증 결과:', success);
      if (success) {
        console.log('잠금 해제 성공 - 화면 전환');
        // 성공 시 즉시 화면 전환하고 더 이상 처리하지 않음
        onUnlock();
        return;
      } else {
        // 생체인증 실패 시 PIN 입력으로 전환
        console.log('생체인증 실패, PIN 입력으로 전환');
        // 생체인증 버튼은 유지하되, 다시 시도할 수 있도록 함
      }
    } catch (error) {
      console.error('생체인증 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePinSubmit = async () => {
    if (!pin.trim()) return;

    setIsLoading(true);
    try {
      const success = await lockService.unlockWithPin(pin);
      if (success) {
        setPin('');
        onUnlock();
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        setPin('');
        
        if (newAttempts >= 3) {
          Alert.alert(
            '잠금 해제 실패',
            '3회 연속 실패했습니다. 잠시 후 다시 시도해주세요.',
            [{ text: '확인' }]
          );
          setAttempts(0);
        } else {
          Alert.alert('잘못된 PIN', 'PIN을 다시 입력해주세요.');
        }
      }
    } catch (error) {
      console.error('PIN 인증 오류:', error);
      Alert.alert('오류', '인증 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNumberPress = (number: string) => {
    if (pin.length < 6) {
      setPin(prev => prev + number);
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const renderPinDots = () => {
    return (
      <View style={styles.pinContainer}>
        {Array.from({ length: 6 }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.pinDot,
              index < pin.length && styles.pinDotFilled,
            ]}
          />
        ))}
      </View>
    );
  };

  const renderNumberPad = () => {
    const numbers = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['', '0', 'backspace'],
    ];

    return (
      <View style={styles.numberPad}>
        {numbers.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.numberRow}>
            {row.map((item, colIndex) => (
              <TouchableOpacity
                key={`${rowIndex}-${colIndex}`}
                style={styles.numberButton}
                onPress={() => {
                  if (item === 'backspace') {
                    handleBackspace();
                  } else if (item) {
                    handleNumberPress(item);
                  }
                }}
                disabled={isLoading}
              >
                <Text style={styles.numberText}>
                  {item === 'backspace' ? '⌫' : item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    );
  };

  if (!settings) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>로딩 중...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>앱 잠금</Text>
          <Text style={styles.subtitle}>
            {settings.useBiometric && isBiometricAvailable
              ? '생체인증, 기기 비밀번호 또는 PIN을 사용하세요'
              : 'PIN을 입력하세요'}
          </Text>
        </View>

        {renderPinDots()}

        {isBiometricAvailable && settings.useBiometric && (
          <TouchableOpacity
            style={styles.biometricButton}
            onPress={handleBiometricAuth}
            disabled={isLoading}
          >
            <Text style={styles.biometricText}>
              {isLoading ? '인증 중...' : hasTriedBiometric ? '🔐 생체인증 다시 시도' : '🔐 생체인증 또는 기기 비밀번호'}
            </Text>
          </TouchableOpacity>
        )}

        {renderNumberPad()}

        <TouchableOpacity
          style={[styles.submitButton, (!pin || isLoading) && styles.submitButtonDisabled]}
          onPress={handlePinSubmit}
          disabled={!pin || isLoading}
        >
          <Text style={styles.submitText}>
            {isLoading ? '확인 중...' : '확인'}
          </Text>
        </TouchableOpacity>

        {/* 설정 버튼 */}
        {onOpenSettings && (
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={onOpenSettings}
          >
            <Text style={styles.settingsText}>⚙️ 잠금 설정</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: width * 0.9,
    maxWidth: 400,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  pinDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    marginHorizontal: 8,
    backgroundColor: 'transparent',
  },
  pinDotFilled: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  biometricButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 30,
  },
  biometricText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  numberPad: {
    width: '100%',
    marginBottom: 30,
  },
  numberRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  numberButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  numberText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 8,
    minWidth: 120,
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  settingsButton: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  settingsText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
