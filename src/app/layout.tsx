import './globals.css'
import { Inter } from 'next/font/google'
import { NextAuthProvider } from '@/providers/NextAuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Playlist Manager',
  description: 'App to easily manage your playlist',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <body className={inter.className}>{children}</body>
      </NextAuthProvider>
    </html>
  )
}
