'use client';

import { ReactNode, useCallback } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';

type Props = {
  children: ReactNode;

  skip?: boolean;
};

export default function DraggableProvider({ children, skip = false }: Props) {
  // Function to handle when a playlist if dragged on to editor content pane
  const onDragEnd = useCallback((result: DropResult) => {
    // If there is no destination, then return
    if (!result.destination) return;

    console.log('Drag ending!: ', result);
  }, []);

  // If we are skipping, then just return the children
  if (skip) return <>{children}</>;

  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
}
