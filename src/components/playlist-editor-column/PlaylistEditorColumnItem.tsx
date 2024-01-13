'use client';

import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Music } from 'lucide-react';
import { Skeleton } from '@nextui-org/react';
import { memo, useState } from 'react';
import PlayTrackButton from '../buttons/PlayTrackButton';
import { Track } from '@/types/track';

type PlaylistEditorColumnItemProps = {
  /** The track name to render */
  trackName: string;

  /** The artist names to render */
  artistNames: string;

  /** The album images to render */
  albumImageUrl: string;

  track: Track;
};

// TODO: Update the skeleton to be calculated for each item instead of only using the image

export default memo(function PlaylistEditorColumnItem({
  trackName,
  artistNames,
  albumImageUrl,
  track,
}: PlaylistEditorColumnItemProps) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <Card className='border-none bg-cardBackground px-2 shadow-none hover:bg-neutral-700'>
      <CardBody className='p-2'>
        <div className='flex h-full flex-row gap-2'>
          <div>
            {albumImageUrl ? (
              <Skeleton isLoaded={isLoaded} className='rounded-small'>
                <div className='flex h-[48px] w-[48px] items-center justify-center rounded-small bg-neutral-500'>
                  <Image
                    alt='Album cover'
                    className='rounded-small object-cover'
                    src={albumImageUrl}
                    onLoad={() => setIsLoaded(true)}
                  />
                </div>
              </Skeleton>
            ) : (
              <div className='flex h-[48px] w-[48px] items-center justify-center rounded-small bg-neutral-500'>
                <Music />
              </div>
            )}
          </div>

          <div className='flex w-full items-start justify-between overflow-hidden'>
            <div className='flex flex-col gap-0 overflow-hidden'>
              <Skeleton isLoaded={isLoaded} className='rounded-lg'>
                <h3 className='truncate font-semibold text-foreground/90'>
                  {trackName}
                </h3>
              </Skeleton>
              <Skeleton isLoaded={isLoaded} className='rounded-lg'>
                <p className='text-small text-foreground/80'>{artistNames}</p>
              </Skeleton>
            </div>
          </div>

          <div>
            <PlayTrackButton track={track} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
});
