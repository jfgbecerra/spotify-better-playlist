'use client';

import { AuthSession } from '@/types/types';
import { NextAuthProvider } from './NextAuthProvider';
import { UIProvider } from './NextUIProvider';

interface ProviderProps {
  /** Component children to render */
  children: React.ReactNode;

  /** User authentication session to make available to next auth */
  session: AuthSession | null;
}

export const Providers = ({ children, session }: ProviderProps) => {
  return (
    <NextAuthProvider session={session}>
      <UIProvider>{children}</UIProvider>
    </NextAuthProvider>
  );
};
