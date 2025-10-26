import axios from 'axios';
import { getAccessToken } from '@/app/auth/_components/AuthSessionProvider';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://kkruk.com', // TODO(seonghyun): env vercel 세팅,
  withCredentials: true,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.error('❌ Response Error:', error.response?.status, error.message);

    // 401 에러 처리 - refresh token으로 토큰 갱신 시도
    if (error.response?.status === 401) {
      console.log('🔒 401 Unauthorized - 토큰 갱신 시도');

      try {
        // refresh token으로 새로운 access token 요청
        const { requestAccessToken, setAccessToken } = await import(
          '@/app/auth/_components/AuthSessionProvider'
        );
        const { accessToken } = await requestAccessToken();

        if (accessToken) {
          console.log('✅ 토큰 갱신 성공 - 요청 재시도');
          setAccessToken(accessToken);

          // 원래 요청을 새로운 토큰으로 재시도
          const originalRequest = error.config;
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(originalRequest);
        } else {
          console.log('❌ 토큰 갱신 실패 - refresh token도 만료된 것 같습니다');
        }
      } catch (refreshError) {
        console.error('❌ 토큰 갱신 중 오류:', refreshError);
        console.log('💡 사용자가 로그아웃을 요청할 때까지 대기합니다');
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
