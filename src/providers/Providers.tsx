'use client';

import { AuthSession } from '@/types/types';
import NextAuthProvider from './NextAuthProvider';
import UIProvider from './UIProvider';
import UIThemeProvider from './UIThemeProvider';
import { ReactNode } from 'react';
import DraggableProvider from './DraggableProvider';

interface ProviderProps {
  /** Component children to render */
  children: ReactNode;

  /** User authentication session to make available to next auth */
  session: AuthSession | null;

  /** Whether or not to skip the draggable provider */
  skipDraggable?: boolean;
}

export default function Providers({
  children,
  session,
  skipDraggable = false,
}: ProviderProps) {
  return (
    <NextAuthProvider session={session}>
      <UIProvider>
        <UIThemeProvider>
          <DraggableProvider skip={skipDraggable}>{children}</DraggableProvider>
        </UIThemeProvider>
      </UIProvider>
    </NextAuthProvider>
  );
}
