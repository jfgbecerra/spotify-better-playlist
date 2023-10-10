import '@/app/globals.css';
import * as React from 'react';
import { Inter } from 'next/font/google';
import { NextAuthProvider } from '@/providers/NextAuthProvider';
import { getAuthSession } from '@/utils/serverUtils';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Playlist Manager',
  description: 'App to easily manage your playlist',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  return (
    <html lang='en'>
      <body className={inter.className}>
        <NextAuthProvider session={session}>
          <Header />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
