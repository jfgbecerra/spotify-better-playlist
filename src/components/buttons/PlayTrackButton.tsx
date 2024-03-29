'use client';

import { playTrack } from '@/lib/playlist-data-accessor';
import { AuthSession, Track } from '@/types';
import { Button } from '@nextui-org/button';
import { PlayCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';

type PlayTrackButtonProps = {
  track: Track;
};

export default function PlayTrackButton({ track }: PlayTrackButtonProps) {
  const { data: session } = useSession();

  return (
    <Button
      isIconOnly
      radius='full'
      variant='light'
      onClick={() => {
        playTrack(session as AuthSession, [track.uri]);
      }}
    >
      <PlayCircle />
    </Button>
  );
}
