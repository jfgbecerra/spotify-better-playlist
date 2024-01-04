'use client';

import { getPlaylistInfo } from '@/lib/playlist-data-accessor';
import { AuthSession, Playlist } from '@/types';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

type PlaylistEditorColumnHeaderProps = {
  /** The playlist id to render */
  playlistId: string;
};

export default function PlaylistEditorColumnHeader({
  playlistId,
}: PlaylistEditorColumnHeaderProps) {
  const { data: session } = useSession();
  const [playlistInfo, setPlaylistInfo] = useState<Playlist>();

  useEffect(() => {
    const getInfo = async () => {
      const res = await getPlaylistInfo(session as AuthSession, playlistId);
      setPlaylistInfo(res);
    };
    getInfo();
  }, []);

  return (
    <div className='h-32 w-full bg-cardBackground'>
      <h1>{playlistInfo?.name}</h1>
      <p>{playlistInfo?.description}</p>
      <p>{playlistInfo?.owner.display_name}</p>
      <p>{playlistInfo?.public ? 'Public' : 'Private'} Playlist</p>
    </div>
  );
}
