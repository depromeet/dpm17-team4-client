'use client';

import { useEffect, useState } from 'react';

/**
 * 태블릿/데스크톱 사이즈에서 배경 이미지를 표시하고
 * 모바일 뷰 크기로 컨텐츠를 중앙에 배치하는 래퍼 컴포넌트
 */
export default function DesktopWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      // 태블릿 이상 사이즈 (768px 이상)를 데스크톱으로 간주
      setIsDesktop(window.innerWidth >= 768);
    };

    // 초기 체크
    checkScreenSize();

    // 리사이즈 이벤트 리스너
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // 모바일 사이즈일 때는 기존대로 렌더링
  if (!isDesktop) {
    return <>{children}</>;
  }

  // 태블릿/데스크톱 사이즈일 때 배경 이미지와 모바일 뷰 컨테이너
  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundImage: 'url(/desktop.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: '2rem',
      }}
    >
      <div
        className="w-full max-w-[428px] overflow-y-auto"
        style={{
          backgroundColor: 'transparent',
          boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.1)',
          height: 'calc(100vh - 4rem)',
          marginTop: '2rem',
          marginBottom: '2rem',
        }}
      >
        {children}
      </div>
    </div>
  );
}

