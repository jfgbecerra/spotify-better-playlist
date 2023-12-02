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
    <aside className='bg-cardBackground h-full w-80 flex-col overflow-auto scrollbar-hide rounded-lg ml-2'>
      {playLists.items.map((playlist) => {
        return <p key={playlist.id}>{playlist.name}</p>;
      })}
    </aside>
  );
}
