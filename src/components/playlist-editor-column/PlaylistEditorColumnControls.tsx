'use client';

import { Playlist } from '@/types/playlist';
import React from 'react';
import PlayPlaylistButton from '@/components/buttons/PlayPlaylistButton';

type PlaylistEditorColumnControlsProps = {
  /** The playlist for controls */
  playlist: Playlist | undefined;
};

// TODO: Add Search Bar here
export default function PlaylistEditorColumnControls({
  playlist,
}: PlaylistEditorColumnControlsProps) {
  return (
    <div className='flex w-full items-center justify-end gap-1 p-2'>
      <PlayPlaylistButton playlist_uri={playlist?.uri ?? ''} />
    </div>
  );
}
