import type { Metadata } from 'next';
import './globals.css';
import { MainLayout } from '@/components/layout/MainLayout';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'KumbhConnect',
  description: 'Comprehensive mobile app for Mahakumbh 2028 in Ujjain.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <MainLayout>{children}</MainLayout>
        <Toaster />
      </body>
    </html>
  );
}
