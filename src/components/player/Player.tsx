'use client';

import React from 'react';
import PlayerTrackInfo from './PlayerTrackInfo';
import PlayerTrackControls from './PlayerTrackControls';
import PlayerTrackExtraControls from './PlayerTrackExtraControls';
import { usePlaylistStore } from '@/state/zustandState';
import { useSession } from 'next-auth/react';

// TODO: Need to edit this to center the player controls and attach the info and extra
// controls to opposite sides of the player
export default function Player() {
  const track = usePlaylistStore((state) => state.currentTrack);

  // Handle checking if the session is valid
  const { data: session } = useSession();
  if (!session) {
    return null;
  }

  return (
    <footer className={`flex h-24 justify-between px-2 py-2`}>
      <PlayerTrackInfo
        trackName={track?.name}
        trackUrl={track?.album.images[0].url}
        trackArtists={track?.artists?.map((artist) => artist.name).join(', ')}
      />
      <PlayerTrackControls />
      <PlayerTrackExtraControls />
    </footer>
  );
}
