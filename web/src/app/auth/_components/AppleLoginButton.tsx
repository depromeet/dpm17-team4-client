'use client';

import { useState } from 'react';
import { API_ENDPOINTS } from '@/constants';

const AppleLoginButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAppleLogin = async () => {
    setIsLoading(true);
    try {
      // Apple Login API 호출하여 Apple 인증 URL 받기 (로컬 Next.js API 사용)
      const origin =
        typeof window !== 'undefined' ? window.location.origin : '';
      const response = await fetch(
        `${origin}${API_ENDPOINTS.AUTH.APPLE_LOGIN}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            redirectUri: `${origin}/home`,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Apple 인증 URL 받음:', data.authUrl);
        // Apple 인증 페이지로 리디렉션
        window.location.href = data.authUrl;
      } else {
        const errorText = await response.text();
        console.error('❌ Apple Login API 에러:', {
          status: response.status,
          statusText: response.statusText,
          errorText,
        });

        let errorMessage = 'Apple login failed';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorMessage;
        } catch (_e) {
          errorMessage = errorText || errorMessage;
        }

        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Apple Login Error:', error);
      alert('Apple 로그인에 실패했습니다. 다시 시도해주세요.');
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleAppleLogin}
      disabled={isLoading}
      className="flex w-[21.4375rem] h-[3.5rem] px-6 items-center gap-1 flex-shrink-0 rounded-[0.625rem] bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="flex-shrink-0"
        aria-hidden="true"
      >
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
      <span className="text-button-2 font-semibold flex-1 justify-center">
        {isLoading ? '로그인 중...' : 'Apple로 로그인'}
      </span>
    </button>
  );
};

export default AppleLoginButton;
