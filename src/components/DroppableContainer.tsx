'use client';

import { ReactNode } from 'react';
import { Droppable, DroppableProvided } from '@hello-pangea/dnd';

type Props = {
  /** The children to render */
  children: ReactNode;

  /** The id of the droppable container */
  id: string;

  /** The className of the droppable container */
  className?: string;

  /** Whether or not the droppable container is disabled */
  isDropDisabled?: boolean;
};

export default function DroppableContainer({
  children,
  id,
  className,
  isDropDisabled,
}: Props) {
  return (
    <Droppable droppableId={id} isDropDisabled={isDropDisabled}>
      {(provided: DroppableProvided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={className}
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
