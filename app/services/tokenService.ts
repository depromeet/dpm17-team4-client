import * as SecureStore from 'expo-secure-store';

const REFRESH_TOKEN_KEY = 'refresh_token';

export class TokenService {
  private static instance: TokenService;

  private constructor() {}

  static getInstance(): TokenService {
    if (!TokenService.instance) {
      TokenService.instance = new TokenService();
    }
    return TokenService.instance;
  }

  /**
   * Refresh token을 보안 저장소에 저장
   */
  async saveRefreshToken(token: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token);
      console.log('✅ Refresh token 저장 완료');
    } catch (error) {
      console.error('❌ Refresh token 저장 실패:', error);
      throw error;
    }
  }

  /**
   * Refresh token을 보안 저장소에서 조회
   */
  async getRefreshToken(): Promise<string | null> {
    try {
      const token = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
      return token;
    } catch (error) {
      console.error('❌ Refresh token 조회 실패:', error);
      return null;
    }
  }

  /**
   * Refresh token을 보안 저장소에서 삭제
   */
  async deleteRefreshToken(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
      console.log('✅ Refresh token 삭제 완료');
    } catch (error) {
      console.error('❌ Refresh token 삭제 실패:', error);
      throw error;
    }
  }
}

export const tokenService = TokenService.getInstance();

