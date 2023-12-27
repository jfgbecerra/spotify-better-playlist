'use client';
import React from 'react';
import DroppableContainer from '../DroppableContainer';
import DraggableContainer from '../DraggableContainer';
import PlaylistEditorColumnTracks from './PlaylistEditorColumnTracks';
import { v4 as uuid } from 'uuid';
import PlaylistEditorColumnHeader from './PLaylistEditorColumnHeader';
import { usePlaylistStore } from '@/state/zustandState';

type PlaylistEditorColumnProps = {
  /** The playlist id to render */
  playlistId: string;

  /** The index of the playlist */
  ind: number;
};

// TODO: Clean up the calls to fetch the tracks here
export default function PlaylistEditorColumn({
  playlistId,
  ind,
}: PlaylistEditorColumnProps) {
  /** The tracks */
  const playlistMap = usePlaylistStore((state) => state.playlistMap);

  /** The UIDs for containers */
  const draggableUnique: string = uuid();
  const droppableUnique: string = uuid();

  return (
    <DraggableContainer
      id={`${playlistId}-draggable-column_${draggableUnique}}`}
      ind={ind}
      className='flex h-full w-96 flex-col'
    >
      <PlaylistEditorColumnHeader />
      <DroppableContainer
        id={`${playlistId}-droppable-column_${droppableUnique}`}
        className='h-full w-full cursor-pointer flex-col overflow-auto rounded-lg bg-cardBackground p-1 scrollbar-hide'
        type='track'
      >
        <PlaylistEditorColumnTracks tracks={playlistMap.get(playlistId)} />
      </DroppableContainer>
    </DraggableContainer>
  );
}
