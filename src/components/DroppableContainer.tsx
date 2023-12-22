'use client';

import { ReactNode } from 'react';
import { Droppable, DroppableProvided } from '@hello-pangea/dnd';

type Props = {
  /** The children to render */
  children: ReactNode;

  /** The id of the droppable container */
  id: string;

  /** The type of the droppable container */
  type?: string;

  /** The className of the droppable container */
  className?: string;

  /** Whether or not the droppable container is disabled */
  isDropDisabled?: boolean;

  /** The direction of the droppable container */
  direction?: 'horizontal' | 'vertical';
};

export default function DroppableContainer({
  children,
  id,
  type,
  className,
  isDropDisabled,
  direction,
}: Props) {
  return (
    <Droppable
      droppableId={id}
      isDropDisabled={isDropDisabled}
      type={type}
      direction={direction}
    >
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
