import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import LegacyCookieCleanup from '@/components/LegacyCookieCleanup';
import QueryProvider from '@/providers/query-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'kkruk-꾸륵',
  description: '배변기록을 추가하고, 장 건강을 지키세요!',
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
        </body>
      </html>
    </QueryProvider>
  );
}
