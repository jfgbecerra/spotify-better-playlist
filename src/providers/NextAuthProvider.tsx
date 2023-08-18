'use client';

import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};
