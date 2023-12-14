import { getAuthSession } from '@/utils/serverUtils';

export default async function ContentPane() {
  // Handle checking if the session is valid
  const session = await getAuthSession();
  if (!session) {
    return null;
  }

  return (
    <div className='flex h-full w-full rounded-lg bg-cardBackground'></div>
  );
}
