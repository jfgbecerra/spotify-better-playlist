import { cookies } from 'next/headers';
import { create } from 'zustand';

type cookieThemeState = {
  cookieTheme: string;
  setTheme: (val: string) => void;
};

export const useCookieThemeStore = create<cookieThemeState>((set) => ({
  cookieTheme: 'light',
  setTheme: () => set({ cookieTheme: getTheme() }),
}));

function getTheme() {
  const cookieStore = cookies();
  const themeCookie = cookieStore.get('theme');
  const theme = themeCookie ? themeCookie.value : 'dark';
  return theme;
}
