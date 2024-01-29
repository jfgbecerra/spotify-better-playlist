'use client';

import { getPlaylistInfo } from '@/lib/playlist-data-accessor';
import { AuthSession, Playlist } from '@/types';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { Image } from '@nextui-org/image';
import { Card, CardBody } from '@nextui-org/react';
import PlaylistEditorColumnControls from './PlaylistEditorColumnControls';

type PlaylistEditorColumnHeaderProps = {
  /** The playlist id to render */
  playlistId: string;
};
// TODO: Cache image somehow to avoid flickering
// as per https://github.com/hello-pangea/dnd/blob/main/docs/guides/avoiding-image-flickering.md
export default function PlaylistEditorColumnHeader({
  playlistId,
}: PlaylistEditorColumnHeaderProps) {
  const { data: session } = useSession();
  const [playlistInfo, setPlaylistInfo] = useState<Playlist>();
  const [coverUrl, setCoverUrl] = useState<string>('');

  useEffect(() => {
    const getInfo = async () => {
      const res = await getPlaylistInfo(session as AuthSession, playlistId);
      setPlaylistInfo(res);
      if (res.images) {
        setCoverUrl(res.images[0].url);
      }
    };
    getInfo();
  }, []);

  return (
    <div className='flex w-full flex-col items-center gap-2'>
      <div className='flex h-32 w-full flex-row items-center gap-3 bg-cardBackground p-3'>
        <div>
          <div className='flex h-28 w-28 items-center justify-center'>
            <Image
              className='h-28 w-28 rounded-sm object-fill'
              src={coverUrl}
              alt='Playlist cover'
            />
          </div>
        </div>
        <div className='flex h-full flex-col justify-end overflow-hidden'>
          <p className='text-sm'>Playlist</p>
          <h1 className='truncate text-2xl'>{playlistInfo?.name}</h1>
          <p className='text-sm'>
            {playlistInfo?.owner.display_name} • {playlistInfo?.tracks.total}{' '}
            songs
          </p>
        </div>
      </div>
      <PlaylistEditorColumnControls playlist={playlistInfo} />
    </div>
  );
}
