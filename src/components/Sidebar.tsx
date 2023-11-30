import { getUserPlaylists } from '@/lib/requests';
import { getAuthSession } from '@/utils/serverUtils';

export default async function Sidebar() {
  // Handle checking if the session is valid
  const session = await getAuthSession();
  if (!session) {
    return null;
  }

  const playLists = await getUserPlaylists(session, 50);

  return (
    <aside className='bg-card h-full w-48 flex-col'>
      {playLists.items.map((playlist) => {
        return <span key={playlist.id}>{playlist.name}</span>;
      })}
    </aside>
  );
}
