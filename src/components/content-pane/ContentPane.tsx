import { getAuthSession } from '@/utils/serverUtils';
import DroppableContainer from '../DroppableContainer';

export default async function ContentPane() {
  // Handle checking if the session is valid
  const session = await getAuthSession();
  if (!session) {
    return null;
  }

  return (
    <div className='flex h-full w-full'>
      <DroppableContainer
        id='droppable-destination'
        className='flex h-full w-full rounded-lg bg-cardBackground'
      >
        I am Droppable!
      </DroppableContainer>
    </div>
  );
}
