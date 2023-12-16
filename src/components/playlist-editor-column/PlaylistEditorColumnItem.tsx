'use client';

import { Playlist, Track } from '@/types/types';
import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import NextImage from 'next/image';
import playlistIcon from '@/assets/music.svg';
import { Skeleton } from '@nextui-org/react';
import { useState } from 'react';

type PlaylistEditorColumnItemProps = {
  /** The playlist to render */
  track: Track;
};

export default function PlaylistEditorColumnItem({
  track,
}: PlaylistEditorColumnItemProps) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <Card className='border-none bg-cardBackground px-2 shadow-none hover:bg-neutral-700'>
      <CardBody className='p-2'>
        <div className='flex h-full flex-row gap-2'>
          <div>
            {track?.album?.images?.[0] ? (
              <Skeleton isLoaded={isLoaded} className='rounded-small'>
                <div className='flex h-[48px] w-[48px] items-center justify-center rounded-small bg-neutral-500'>
                  <Image
                    alt='Album cover'
                    className='rounded-small object-cover'
                    src={track?.album?.images?.[0]?.url}
                    onLoad={() => setIsLoaded(true)}
                  />
                </div>
              </Skeleton>
            ) : (
              <div className='flex h-[48px] w-[48px] items-center justify-center rounded-small bg-neutral-500'>
                <NextImage
                  src={playlistIcon}
                  alt='Playlist Icon'
                  onLoad={() => setIsLoaded(true)}
                />
              </div>
            )}
          </div>

          <div className='flex w-full items-start justify-between overflow-hidden'>
            <div className='flex flex-col gap-0 overflow-hidden'>
              <Skeleton isLoaded={isLoaded} className='rounded-lg'>
                <h3 className='truncate font-semibold text-foreground/90'>
                  {track.album.name}
                </h3>
              </Skeleton>
              <Skeleton isLoaded={isLoaded} className='rounded-lg'>
                <p className='text-small text-foreground/80'>
                  {track.album.type} ·{' '}
                  {track.album.artists.map((artist) => artist.name).join(', ')}
                </p>
              </Skeleton>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
