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

// TODO: Refactor this to use some of the formatting from this example:
// https://codesandbox.io/p/sandbox/5v2yvpjn7n?file=%2Findex.js%3A67%2C30-67%2C38
// It uses multiple containers and you can move subitems between them and both the parent and children
export default function DraggableProvider({ children, skip = false }: Props) {
  // If we are skipping, then just return the children
  if (skip) return <>{children}</>;

  const addPlaylistsIds = usePlaylistStore((state) => state.addPlaylistId);

  async function hanldeAddPlaylist(result: DropResult) {
    if (!result.destination) return;

    addPlaylistsIds(result.draggableId, result.destination.index);
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
