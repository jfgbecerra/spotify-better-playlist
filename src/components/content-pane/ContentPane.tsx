'use client';

import DroppableContainer from '../DroppableContainer';
import { usePlaylistStore } from '@/state/zustandState';
import PlaylistEditorColumn from '../playlist-editor-column/PlaylistEditorColumn';

export default function ContentPane() {
  const playlistsTracks = usePlaylistStore((state) => state.playlistIds);

  return (
    <DroppableContainer
      id='playlist-editor-pane'
      className='flex h-full w-full flex-row rounded-lg bg-cardBackground'
      direction='horizontal'
      type='playlist'
    >
      {playlistsTracks.map((playlist, ind) => (
        <PlaylistEditorColumn key={ind} playlistId={playlist} ind={ind} />
      ))}
    </DroppableContainer>
  );
}
