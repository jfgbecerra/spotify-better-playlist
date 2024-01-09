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

//TODO: Add paging system to load more tracks and make the list virtualized
export default function PlaylistEditorColumnTracks({
  playlistId,
}: PlaylistEditorColumnTracksProps) {
  /** The tracks */
  const tracks = usePlaylistStore((state) => state.playlistMap.get(playlistId));

  return (
    <>
      {tracks?.tracks.items.map((trackWrapper, ind) => {
        const randomId: string = uuid();
        const trackName = trackWrapper.track.name;
        const artistNames = trackWrapper.track.artists
          ?.map((artist) => artist.name)
          .join(', ');
        const albumImageUrl = trackWrapper.track.album.images[0].url;

        return (
          <DraggableContainer
            key={`${trackWrapper.track.id}_${randomId}`}
            id={`${trackWrapper.track.id}_${randomId}`}
            ind={ind}
          >
            <PlaylistEditorColumnItem
              trackName={trackName}
              artistNames={artistNames}
              albumImageUrl={albumImageUrl}
              track={trackWrapper.track}
            />
          </DraggableContainer>
        );
      })}
    </>
  );
}
