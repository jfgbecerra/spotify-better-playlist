'use client';

import { Button } from '@nextui-org/button';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Orbit, SunMedium } from 'lucide-react';

export default function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Button isIconOnly={true} isLoading></Button>;

  return (
    <Button
      aria-label='Toggle Dark Mode'
      type='button'
      isIconOnly={true}
      onClick={() => {
        const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.cookie = `theme=${newTheme}; path=/`;
      }}
    >
      {resolvedTheme === 'dark' ? <SunMedium /> : <Orbit />}
    </Button>
  );
}
