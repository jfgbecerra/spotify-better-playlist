'use client';

import { getTracks } from '@/lib/playlist-data-accessor';
import React, { useEffect, useState } from 'react';
import DroppableContainer from '../DroppableContainer';
import DraggableContainer from '../DraggableContainer';
import { getSession } from 'next-auth/react';
import { AuthSession, Tracks } from '@/types/types';
import PlaylistEditorColumnTracks from './PlaylistEditorColumnTracks';
import { v4 as uuid } from 'uuid';
import PlaylistEditorColumnHeader from './PLaylistEditorColumnHeader';

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
  /** The session */
  const [session, setSession] = useState<AuthSession | null>();

  /** The tracks */
  const [tracks, setTracks] = useState<Tracks>();

  const draggableUnique: string = uuid();
  const droppableUnique: string = uuid();

  // Fetch the session and tracks
  useEffect(() => {
    const fetchSessionAndTracks = async () => {
      const ses = await getSession();
      setSession(ses as AuthSession);
      if (ses) {
        const fetchedTracks = await getTracks(ses as AuthSession, playlistId);
        setTracks(fetchedTracks);
      }
    };

    fetchSessionAndTracks();
  }, [playlistId]);

  if (!session) {
    return null;
  }

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
        <PlaylistEditorColumnTracks tracks={tracks} />
      </DroppableContainer>
    </DraggableContainer>
  );
}
