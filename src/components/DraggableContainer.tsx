'use client';

import { ReactNode } from 'react';
import { Draggable } from '@hello-pangea/dnd';

type Props = {
  /** The children to render */
  children: ReactNode;

  /** The id of the draggable container */
  id: string;

  /** The index of the draggable container */
  ind: number;

  /** The className of the draggable container */
  className?: string;
};

export default function DraggableContainer({
  children,
  id,
  ind,
  className,
}: Props) {
  return (
    <Draggable draggableId={id} index={ind}>
      {(provided, snapshot) => (
        <div
          className={className}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            cursor: snapshot.isDragging ? 'grabbing' : 'pointer',
          }}
        >
          {children}
        </div>
      )}
    </Draggable>
  );
}
