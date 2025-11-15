import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import LegacyCookieCleanup from '@/components/LegacyCookieCleanup';
import LayoutStabilizer from '@/components/LayoutStabilizer';
import DesktopWrapper from '@/components/DesktopWrapper';
import QueryProvider from '@/providers/query-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap', // 폰트 로딩 전략: 폴백 폰트로 먼저 표시 후 교체
  preload: true, // 폰트를 미리 로드
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: 'kkruk-꾸륵',
  description: '배변기록을 추가하고, 장 건강을 지키세요!',
  openGraph: {
    title: 'kkruk-꾸륵',
    description: '배변기록을 추가하고, 장 건강을 지키세요!',
    images: ['https://kkruk.com/opengraph1115.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          suppressHydrationWarning={true}
        >
          <LayoutStabilizer>
            <DesktopWrapper>
              {/* NOTE: 기존 사용자의 오래된 .kkruk.com 쿠키 정리 (일주일 후 제거 예정) */}
              <LegacyCookieCleanup />
              {children}
              {/* biome-ignore lint/correctness/useUniqueElementIds: <This is a global portal root> */}
              <div id="modal-root"></div>
              <Toaster
                position="bottom-center"
                containerStyle={{ bottom: '19.125rem' }}
                toastOptions={{
                  className: '',
                  style: {
                    display: 'inline-flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '0.5rem',
                    flexShrink: 0,
                    color: 'white',
                    height: '2.75rem',
                    padding: '0.75rem 1.125rem 0.75rem 1rem',
                    backgroundColor: '#3C3C3C80',
                    borderRadius: '0.625rem',
                    fontWeight: '600',
                    fontSize: '14px',
                    lineHeight: '145%',
                  },
                  success: {
                    iconTheme: {
                      primary: '#02AF6A',
                      secondary: 'white',
                    },
                  },
                }}
              />
            </DesktopWrapper>
          </LayoutStabilizer>
        </body>
      </html>
    </QueryProvider>
  );
}
