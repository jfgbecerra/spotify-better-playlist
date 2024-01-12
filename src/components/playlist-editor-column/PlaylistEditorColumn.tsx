'use client';
import React, { memo } from 'react';
import DroppableContainer from '../DroppableContainer';
import DraggableContainer from '../DraggableContainer';
import PlaylistEditorColumnTracks from './PlaylistEditorColumnTracks';
import { v4 as uuid } from 'uuid';
import PlaylistEditorColumnHeader from './PLaylistEditorColumnHeader';
import { Divider } from '@nextui-org/react';

type PlaylistEditorColumnProps = {
  /** The playlist id to render */
  playlistId: string;

  /** The index of the playlist */
  ind: number;
};

export default memo(function PlaylistEditorColumn({
  playlistId,
  ind,
}: PlaylistEditorColumnProps) {
  /** The UIDs for containers */
  const draggableUnique: string = uuid();

  return (
    <DraggableContainer
      id={`${playlistId}-draggable-column_${draggableUnique}}`}
      ind={ind}
      className='flex h-full w-96 flex-col items-center'
    >
      <PlaylistEditorColumnHeader
        key={`${playlistId}-draggable-header}`}
        playlistId={playlistId}
      />
      <Divider className='w-11/12' />
      <DroppableContainer
        id={`${playlistId}_droppable-column`}
        className='h-full w-full cursor-pointer flex-col overflow-auto rounded-lg bg-cardBackground p-1 scrollbar-hide'
        type='track'
      >
        <PlaylistEditorColumnTracks playlistId={playlistId} />
      </DroppableContainer>
    </DraggableContainer>
  );
});
