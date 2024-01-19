import Link from 'next/link';
import PlaylistIcon from './PlaylistIcon';
import LoginButton from './buttons/LoginButton';

export default function LoginPageInfo() {
  return (
    <div className='flex w-96 flex-col items-center justify-center gap-10 px-3'>
      <div className='flex flex-row items-center gap-2 self-start'>
        <PlaylistIcon />
        <p className='font-bold text-inherit dark:text-white'>
          <Link href='/'>Better Playlist</Link>
        </p>
      </div>
      <h1 className='text-4xl font-extrabold'>Sign in to Better Playlist</h1>
      <p className='li'>
        Better Playlist is powered using the Spotify Web Api and Web Playback
        SDK. Please sign in with spotify account to continue.
      </p>
      <LoginButton />
    </div>
  );
}
