'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

type Props = {
  children: React.ReactNode;
};

export default function UIThemeProvider({ children }: Props) {
  return (
    <NextThemesProvider
      attribute='class'
      defaultTheme='dark'
      storageKey='theme'
    >
      {children}
    </NextThemesProvider>
  );
}
