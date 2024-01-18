import { Divider } from '@nextui-org/react';
import PlaylistIcon from './PlaylistIcon';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='flex h-32 w-full flex-row justify-between overflow-hidden px-2 py-2'>
      <div className='flex flex-row items-center gap-2 pl-10'>
        <PlaylistIcon />
        <p className='font-bold text-inherit dark:text-white'>
          <Link href='/'>Better Playlist</Link>
        </p>
      </div>
      <div className='flex h-full flex-row items-center gap-5 pr-10'>
        <Link href='/privacy'>Privacy</Link>
        <a href='mailto:hello@mixtl.co'>Contact</a>
        <p>
          Made by{' '}
          <Link
            rel='noopener noreferrer'
            target='_blank'
            className='underline'
            href='http://mixtl.co'
          >
            mixtl.co
          </Link>
        </p>
      </div>
    </footer>
  );
}
