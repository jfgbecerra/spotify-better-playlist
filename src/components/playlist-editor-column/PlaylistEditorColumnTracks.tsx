'use client';

import React from 'react';
import DraggableContainer from '../DraggableContainer';
import PlaylistEditorColumnItem from './PlaylistEditorColumnItem';
import { v4 as uuid } from 'uuid';
import { usePlaylistStore } from '@/state/zustandState';

type PlaylistEditorColumnTracksProps = {
  /** The playlist id to render */
  playlistId: string;
};

export default function PlaylistEditorColumnTracks({
  playlistId,
}: PlaylistEditorColumnTracksProps) {
  /** The tracks */
  const tracks = usePlaylistStore((state) => state.playlistMap.get(playlistId));

  return (
    <>
      {tracks?.tracks.items.map((track, ind) => {
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
