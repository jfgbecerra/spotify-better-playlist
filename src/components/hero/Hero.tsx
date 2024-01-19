import { Button } from '@nextui-org/react';
import HeroImages from './HeroImage';

export default function Hero() {
  return (
    <div className='flex w-full items-center'>
      <div className='flex w-1/2 justify-center'>
        <div className='h-9/12 flex w-9/12 flex-col gap-10'>
          <h1 className='text-5xl font-extrabold leading-tight'>
            Effortless Playlist Editing
          </h1>
          <p className='text-lg leading-snug'>
            Simplify your music editing experience with Better Playlist. Log in
            with Spotify, effortlessly organize and enhance your playlists
            experience.
          </p>
          {/* TODO: Move this button to buttons components and make it link to the login page to be added */}
          <Button className='w-28'>Get Started</Button>
        </div>
      </div>
      <div className='flex w-1/2 justify-center p-5'>
        <HeroImages />
      </div>
    </div>
  );
}
