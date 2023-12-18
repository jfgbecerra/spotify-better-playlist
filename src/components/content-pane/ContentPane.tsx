'use client';

// TODO: Look for a way to revert this to a ssr component
// Need to look at how to use zustand in ssr? or maybe look at other global state management
import DroppableContainer from '../DroppableContainer';
import { usePlaylistStore } from '@/state/zustandState';

export default function ContentPane() {
  const playlistsTracks = usePlaylistStore((state) => state.playlistsTracks);

  return (
    <div className='flex h-full w-full'>
      <DroppableContainer
        id='playlist-editor-pane'
        className='flex h-full w-full rounded-lg bg-cardBackground'
      >
        {playlistsTracks.map((playlist, ind) => (
          <div key={ind}>{playlist.items.length}</div>
        ))}
      </DroppableContainer>
    </div>
  );
}
