'use client';

import { useEffect, useState } from 'react';

/**
 * 레이아웃이 안정화될 때까지 기다리는 컴포넌트
 * 폰트 로딩, CSS 계산, 하이드레이션 완료를 확인합니다.
 */
export default function LayoutStabilizer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    // 폰트 로딩 완료 대기
    const checkLayoutReady = async () => {
      try {
        // 1. 폰트가 로드될 때까지 대기
        if (typeof document !== 'undefined' && 'fonts' in document) {
          await document.fonts.ready;
        }

        // 2. 다음 프레임까지 대기하여 레이아웃 계산 완료 확인
        await new Promise<void>((resolve) => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              resolve();
            });
          });
        });

        // 3. 짧은 추가 대기로 레이아웃 안정화 보장
        await new Promise<void>((resolve) => {
          setTimeout(resolve, 0);
        });

        setIsLayoutReady(true);
      } catch (error) {
        // 에러 발생 시에도 UI는 표시
        console.warn('레이아웃 안정화 확인 중 오류:', error);
        setIsLayoutReady(true);
      }
    };

    checkLayoutReady();
  }, []);

  // 레이아웃이 준비되지 않았으면 빈 화면 표시 (레이아웃 시프트 방지)
  if (!isLayoutReady) {
    return (
      <div
        style={{
          width: '100%',
          height: '100vh',
          backgroundColor: 'var(--background, #000000)',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9999,
        }}
        aria-hidden="true"
      />
    );
  }

  return <>{children}</>;
}
