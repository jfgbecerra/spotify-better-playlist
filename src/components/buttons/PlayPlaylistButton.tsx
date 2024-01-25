'use client';

import { playPlaylist } from '@/lib/playlist-data-accessor';
import { AuthSession, Track } from '@/types';
import { Button } from '@nextui-org/button';
import { PlayCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';

type PlayPlaylistButtonProps = {
  playlist_uri: string;
};

export default function PlayPlaylistButton({
  playlist_uri,
}: PlayPlaylistButtonProps) {
  const { data: session } = useSession();

  return (
    <Button
      radius='full'
      variant='light'
      onClick={() => {
        playPlaylist(session as AuthSession, playlist_uri);
      }}
    >
      Play Tracklist
      <PlayCircle />
    </Button>
  );
}
