import type { Metadata } from 'next';
import { Geist, Geist_Mono, Noto_Sans_KR, Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/layouts/header';
import Footer from '@/components/layouts/footer';
import Providers from '@/app/providers';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Analytics from '@/app/analytics';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const notoSansKR = Noto_Sans_KR({
  variable: '--font-noto-sans-kr',
  subsets: ['latin'],
});

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'shmoon.dev',
  description: '문승휘 블로그',
  creator: 'shmoon',
  openGraph: {
    title: `shmoon.dev`,
    description: '문승휘 블로그',
    url: 'https://shmoon.dev',
    siteName: 'shmoon.dev',
    images: [
      {
        url: 'https://shmoon.dev/images/open-graph.webp',
        width: 800,
        height: 600,
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  verification: {
    google: 'dZurkD4UZYwzyBVjCDQ1jh3M3GBgWT60TonM8vJzMeo',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansKR.variable} ${poppins.variable} antialiased`}
      >
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
