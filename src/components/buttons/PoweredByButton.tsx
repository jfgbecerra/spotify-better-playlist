'use client';

import Link from 'next/link';
import SpotifyLogo from '@/assets/Spotify_Logo_RGB_Green.png';
import Image from 'next/image';

export default function PoweredByButton() {
  return (
    <Link
      className='flex items-center gap-2'
      rel='noopener noreferrer'
      target='_blank'
      href='https://www.spotify.com/'
    >
      Powered by Spotify
      <Image alt='Spotify Logo' height={20} width={100} src={SpotifyLogo} />
    </Link>
  );
}
