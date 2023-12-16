'use client';

import { ReactNode, useCallback } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';

type Props = {
  children: ReactNode;
};

export default function DraggableProvider({ children }: Props) {
  const onDragEnd = useCallback(() => {
    console.log('Drag ending!');
  }, []);

  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
}
