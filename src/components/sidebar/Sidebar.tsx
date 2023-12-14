import { getUserPlaylists } from '@/lib/playlist-data-accessor';
import { getAuthSession } from '@/utils/serverUtils';
import SidebarItem from './SidebarItem';

export default async function Sidebar() {
  // Handle checking if the session is valid
  const session = await getAuthSession();
  if (!session) {
    return null;
  }

  // TODO: Need to add smaller initial load and add a way to load more data on the scrolldown
  // TODO: Add drag and drop to the content pane using https://github.com/atlassian/react-beautiful-dnd
  const playlists = await getUserPlaylists(session, 50);

  return (
    <aside className='h-full w-96 flex-col overflow-auto rounded-lg bg-cardBackground p-1 scrollbar-hide'>
      {playlists.items.map((playlist) => {
        return <SidebarItem key={playlist.id} playlist={playlist} />;
      })}
    </aside>
  );
}
