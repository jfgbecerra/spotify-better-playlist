'use client';

import Image from 'next/image';
import HeroImage from '@/assets/spotify-better-playlist.vercel.app_cropped.png';
import HeroImageLight from '@/assets/spotify-better-playlist.vercel.app_cropped_light.png';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Skeleton } from '@nextui-org/react';

export default function HeroImages() {
  const { resolvedTheme } = useTheme();
  const [newTheme, setNewTheme] = useState('dark');

  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setNewTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme]);

  if (!mounted) return <Skeleton className='h-[1080px] w-[1920px]' />;

  if (newTheme === 'dark') {
    return (
      <Image
        priority
        className='rounded-lg border-3 border-gray-300'
        src={HeroImageLight}
        alt='Better Playlist Full Page Screenshot'
        width={1920}
        height={1080}
      />
    );
  } else {
    return (
      <Image
        priority
        className='rounded-lg border-3 border-cardBackground'
        src={HeroImage}
        alt='Better Playlist Full Page Screenshot'
        width={1920}
        height={1080}
      />
    );
  }
}
