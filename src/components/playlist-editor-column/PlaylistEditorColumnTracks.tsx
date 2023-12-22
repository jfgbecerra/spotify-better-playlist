'use client';

import React from 'react';
import DraggableContainer from '../DraggableContainer';
import { Tracks } from '@/types/types';
import PlaylistEditorColumnItem from './PlaylistEditorColumnItem';
import { v4 as uuid } from 'uuid';

type PlaylistEditorColumnTracksProps = {
  /** The tracks to render */
  tracks?: Tracks;
};

export default function PlaylistEditorColumnTracks({
  tracks,
}: PlaylistEditorColumnTracksProps) {
  return (
    <>
      {tracks?.items.map((track, ind) => {
        const randomId: string = uuid();

        return (
          <DraggableContainer
            key={`${track.track.id}_${randomId}`}
            id={`${track.track.id}_${randomId}`}
            ind={ind}
          >
            <PlaylistEditorColumnItem track={track.track} />
          </DraggableContainer>
        );
      })}
    </>
  );
}
