import { getPlaylist, getTracks } from '@/lib/playlist-data-accessor';
import { Playlist } from '@/types/types';
import { getAuthSession } from '@/utils/serverUtils';
import React from 'react';
import DroppableContainer from '../DroppableContainer';
import DraggableContainer from '../DraggableContainer';

type SidebarItemProps = {
  /** The playlist to render */
  playlist: Playlist;
};

export default async function PlaylistEditorColumn({
  playlist,
}: SidebarItemProps) {
  // Handle checking if the session is valid
  const session = await getAuthSession();
  if (!session) {
    return null;
  }

  const tracks = await getTracks(session, playlist.id);

  return (
    <aside className='flex h-full w-96'>
      <DroppableContainer
        id='droppable-origin'
        className='h-full w-full cursor-pointer flex-col overflow-auto rounded-lg bg-cardBackground p-1 scrollbar-hide'
      >
        {tracks.items.map((track, ind) => {
          return (
            <DraggableContainer key={track.id} id={track.id} ind={ind}>
              <div></div>
            </DraggableContainer>
          );
        })}
      </DroppableContainer>
    </aside>
  );
}
