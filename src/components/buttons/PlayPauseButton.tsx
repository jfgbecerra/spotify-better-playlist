'use client';

import { Button } from '@nextui-org/button';
import { PlayCircle, PauseCircle } from 'lucide-react';

type PlayPauseButtonProps = {
  isPlaying: boolean;

  togglePlay: () => Promise<void>;
};

export default function PlayPauseButton({
  isPlaying,
  togglePlay,
}: PlayPauseButtonProps) {
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
        <PlayCircle />
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
      <PauseCircle />
    </Button>
  );
}
