'use client';

import DroppableContainer from '../DroppableContainer';
import { usePlaylistStore } from '@/state/zustandState';
import PlaylistEditorColumn from '../playlist-editor-column/PlaylistEditorColumn';
import { useSession } from 'next-auth/react';

export default function ContentPane() {
  const playlistsTracks = usePlaylistStore((state) => state.playlistIds);

  // Handle checking if the session is valid
  const { data: session } = useSession();
  if (!session) {
    return null;
  }

  return (
    <DroppableContainer
      id='playlist-editor-pane'
      className='flex h-full w-full flex-row overflow-x-auto rounded-lg bg-cardBackground'
      direction='horizontal'
      type='playlist'
    >
      {playlistsTracks.map((playlist, ind) => (
        <PlaylistEditorColumn key={ind} playlistId={playlist} ind={ind} />
      ))}
    </DroppableContainer>
  );
}
