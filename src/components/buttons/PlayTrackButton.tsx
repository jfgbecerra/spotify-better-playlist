'use client';

import { usePlaylistStore } from '@/state/zustandState';
import { Track } from '@/types';
import { Button } from '@nextui-org/button';
import Play from '@/assets/play-circle.svg';
import Image from 'next/image';

type PlayTrackButtonProps = {
  track: Track;
};

export default function PlayTrackButton({ track }: PlayTrackButtonProps) {
  const setTrack = usePlaylistStore((state) => state.setCurrentTrack);

  return (
    <Button
      isIconOnly
      radius='full'
      variant='light'
      onClick={() => {
        setTrack(track);
      }}
    >
      <Image src={Play} alt='Play' />
    </Button>
  );
}