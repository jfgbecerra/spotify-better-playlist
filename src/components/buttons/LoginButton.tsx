'use client';

import { Button } from '@nextui-org/button';
import { signIn } from 'next-auth/react';
import SpotifyLogo from '@/assets/Spotify_Logo_RGB_Black.png';
import SpotifyLogoWhite from '@/assets/Spotify_Logo_RGB_White.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function LoginButton() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Button className='w-28' isLoading></Button>;

  const handleLogin = () => {
    signIn('spotify', { callbackUrl: 'http://localhost:3000' });
  };

  return (
    <Button className='bg-[#1DB954] p-6' onClick={handleLogin}>
      Login with
      {resolvedTheme === 'dark' ? (
        <Image
          style={{ width: 'auto', height: 'auto' }}
          alt='Spotify Logo'
          height={30}
          width={80}
          src={SpotifyLogoWhite}
        />
      ) : (
        <Image
          style={{ width: 'auto', height: 'auto' }}
          alt='Spotify Logo'
          height={20}
          width={70}
          src={SpotifyLogo}
        />
      )}
    </Button>
  );
}
