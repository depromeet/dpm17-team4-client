import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import QueryProvider from '@/providers/query-provider';
import CookieCleanup from '@/components/CookieCleanup';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DPM17 Team4 Web View',
  description: 'React Native WebView 에서 표시되는 웹 애플리케이션',
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
          {/* NOTE(Yubin):.kkruk.com , kkruk.com 쿠키로 2개의 리프레시 값이 들어오는 현상을 위한 임시 해결 */}
          <CookieCleanup />
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
