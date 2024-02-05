import HeroImages from './HeroImage';
import GetStartedButton from '../buttons/GetStartedButton';

export default function Hero() {
  return (
    <div className='flex w-full flex-col items-center sm:flex-row'>
      <div className='flex w-1/2 justify-center'>
        <div className='h-9/12 flex flex-col items-center justify-center gap-10 sm:w-9/12 sm:items-start'>
          <h1 className='text-center text-5xl font-extrabold leading-tight sm:text-start'>
            Effortless Playlist Editing
          </h1>
          <p className='text-lg leading-snug'>
            Simplify your music editing experience with Better Playlist. Log in
            with Spotify, effortlessly organize and enhance your playlists
            experience.
          </p>
          <div className='w-28'>
            <GetStartedButton />
          </div>
        </div>
      </div>
      <div className='flex p-7 sm:w-1/2 sm:p-5'>
        <HeroImages />
      </div>
    </div>
  );
}
