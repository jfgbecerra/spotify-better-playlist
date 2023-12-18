'use client';

import { ReactNode, useCallback } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { getSession } from 'next-auth/react';
import { usePlaylistStore } from '@/state/zustandState';
import { AuthSession } from '@/types/types';

type Props = {
  children: ReactNode;

  skip?: boolean;
};

export default function DraggableProvider({ children, skip = false }: Props) {
  // If we are skipping, then just return the children
  if (skip) return <>{children}</>;

  const addPlaylistsTracks = usePlaylistStore(
    (state) => state.addPlaylistsTracks
  );

  async function hanldeAddPlaylist(result: DropResult) {
    const auth = (await getSession()) as AuthSession;
    if (!result.destination) return;

    addPlaylistsTracks(result.draggableId, result.destination.index, auth);
  }

  // Function to handle when a playlist if dragged on to editor content pane
  const onDragEnd = useCallback((result: DropResult) => {
    // If there is no destination, then return
    if (!result.destination) return;

    if (
      result.destination.droppableId === 'playlist-editor-pane' &&
      result.source.droppableId === 'sidebar-origin'
    ) {
      hanldeAddPlaylist(result);
    }
  }, []);

  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
}
