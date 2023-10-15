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
    <aside className='flex-col'>
      {playLists.items.map((playlist) => {
        return <div key={playlist.id}>{playlist.name}</div>;
      })}
    </aside>
  );
}
