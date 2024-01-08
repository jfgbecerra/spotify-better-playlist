import '@/app/globals.css';
import * as React from 'react';
import { cookies } from 'next/headers';
import { Inter } from 'next/font/google';
import { getAuthSession } from '@/utils/serverUtils';
import Providers from '@/providers';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Playlist Manager',
  description: 'App to easily manage your playlist',
};

function getTheme() {
  const cookieStore = cookies();
  const themeCookie = cookieStore.get('theme');
  const theme = themeCookie ? themeCookie.value : 'dark';
  return theme;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = getTheme() as string;
  const session = await getAuthSession();

  return (
    <html lang='en' className={theme} style={{ colorScheme: theme }}>
      <body className={inter.className}>
        <Providers session={session}>
          {children}
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
