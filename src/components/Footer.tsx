import PlaylistIcon from './PlaylistIcon';
import Link from 'next/link';
import PoweredByButton from './buttons/PoweredByButton';

export default function Footer() {
  return (
    <footer className='flex w-full flex-col items-start gap-5 overflow-hidden px-2 py-2 sm:h-32 sm:flex-row sm:items-center sm:justify-between sm:gap-0'>
      <div className='flex flex-row items-center gap-2 pl-10'>
        <PlaylistIcon />
        <p className='font-bold text-inherit dark:text-white'>
          <Link href='/'>Better Playlist</Link>
        </p>
      </div>
      <div className='flex h-full flex-col items-start gap-3 pl-10 sm:flex-row sm:items-center sm:gap-5 sm:pl-0 sm:pr-10'>
        <PoweredByButton />
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
