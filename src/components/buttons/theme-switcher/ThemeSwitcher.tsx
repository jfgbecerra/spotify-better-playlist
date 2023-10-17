'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { BGDay } from './BGDay';
import { BGNight } from './BGNight';
import { SunIcon } from './SunIcon';
import { MoonIcon } from './MoonIcon';

//        __     __  __ _       __
//       / /__  / /_/ /| |     / /___ __   _____
//  __  / / _ \/ __/ __/ | /| / / __ `/ | / / _ \
// / /_/ /  __/ /_/ /_ | |/ |/ / /_/ /| |/ /  __/
// \____/\___/\__/\__/ |__/|__/\__,_/ |___/\___/

// https://jettwave.com

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    if (currentTheme) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, [currentTheme]);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <div
      onClick={() => setCurrentTheme(!currentTheme)}
      className={
        !currentTheme
          ? 'relative h-[40px] w-[80px] cursor-pointer overflow-hidden rounded-full bg-sky-600 shadow-[0px_-1.81174px_2.41565px_rgba(0,0,0,0.25)] duration-300'
          : 'relative h-[40px] w-[80px] cursor-pointer overflow-hidden rounded-full bg-slate-900 shadow-[0px_-1.81174px_2.41565px_rgba(0,0,0,0.25)] duration-300'
      }
    >
      {!currentTheme ? (
        <BGDay className='absolute inset-0 h-full' />
      ) : (
        <BGNight className='absolute inset-0 h-full' />
      )}

      <div
        className={
          !currentTheme
            ? 'absolute inset-0 flex translate-x-[0] p-1 duration-300'
            : 'absolute inset-0 flex translate-x-[50%] p-1 duration-300'
        }
      >
        <div className='relative aspect-square h-full'>
          <SunIcon
            className={
              currentTheme
                ? 'absolute flex h-full w-full scale-0 items-center justify-center rounded-full duration-300'
                : 'absolute flex h-full w-full scale-100 items-center justify-center rounded-full duration-300'
            }
          />

          <MoonIcon
            className={
              currentTheme
                ? 'absolute flex h-full w-full scale-100 items-center justify-center rounded-full duration-300'
                : 'absolute flex h-full w-full scale-0 items-center justify-center rounded-full duration-300'
            }
          />
        </div>
      </div>
    </div>
  );
}
