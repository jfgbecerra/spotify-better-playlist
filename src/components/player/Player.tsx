'use client';

import React, { memo } from 'react';
import PlayerTrackInfo from './PlayerTrackInfo';
import PlayerTrackControls from './PlayerTrackControls';
import PlayerTrackExtraControls from './PlayerTrackExtraControls';
import { useSession } from 'next-auth/react';
import { usePlaylistStore } from '@/state/zustandState';

export default memo(function Player() {
  const track = usePlaylistStore((state) => state.currentTrack);

  // Handle checking if the session is valid
  const { data: session } = useSession();
  if (!session) {
    return null;
  }

  return (
    <footer className='flex h-24 flex-row justify-center px-2 py-2'>
      <PlayerTrackInfo
        trackName={track?.name}
        trackUrl={track?.album.images[0].url}
        trackArtists={track?.artists?.map((artist) => artist.name).join(', ')}
      />
      <PlayerTrackControls />
      <PlayerTrackExtraControls />
    </footer>
  );
});
