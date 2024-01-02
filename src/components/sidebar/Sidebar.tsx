import { getUserPlaylists } from '@/lib/playlist-data-accessor';
import { getAuthSession } from '@/utils/serverUtils';
import SidebarItem from './SidebarItem';
import DroppableContainer from '../DroppableContainer';
import DraggableContainer from '../DraggableContainer';

export default async function Sidebar() {
  // Handle checking if the session is valid
  const session = await getAuthSession();
  if (!session) {
    return null;
  }

  const playlists = await getUserPlaylists(session, 50);

  return (
    <aside className='flex h-full w-96'>
      <DroppableContainer
        id='sidebar-origin'
        isDropDisabled={true}
        className='h-full w-full cursor-pointer flex-col overflow-auto rounded-lg bg-cardBackground p-1 scrollbar-hide'
        type='playlist'
      >
        {playlists.items.map((playlist, ind) => {
          return (
            <DraggableContainer
              key={playlist.id}
              id={`${playlist.id}_${playlist.snapshot_id}`}
              ind={ind}
            >
              <SidebarItem playlist={playlist} />
            </DraggableContainer>
          );
        })}
      </DroppableContainer>
    </aside>
  );
}
