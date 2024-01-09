'use client';

import { usePlaylistStore } from '@/state/zustandState';
import { Button } from '@nextui-org/button';
import Play from '@/assets/play-circle.svg';
import Pause from '@/assets/pause-circle.svg';
import Image from 'next/image';

type PlayPauseButtonProps = {
  isPlaying: boolean;

  togglePlay: () => Promise<void>;
};

export default function PlayPauseButton({
  isPlaying,
  togglePlay,
}: PlayPauseButtonProps) {
  const setTrack = usePlaylistStore((state) => state.setCurrentTrack);

  // Show play button
  if (!isPlaying) {
    return (
      <Button
        isIconOnly
        radius='full'
        variant='light'
        onClick={() => {
          togglePlay();
        }}
      >
        <Image src={Play} alt='Play' />
      </Button>
    );
  }

  // Show pause button
  return (
    <Button
      isIconOnly
      radius='full'
      variant='light'
      onClick={() => {
        togglePlay();
      }}
    >
      <Image src={Pause} alt='Pause' />
    </Button>
  );
}
