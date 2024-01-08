'use client';

import React, { useState } from 'react';
import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import NextImage from 'next/image';
import playlistIcon from '@/assets/music.svg';
import { Button } from '@nextui-org/button';
import { HeartIcon } from '@/assets/HeartIcon';

type PlayerTrackInfoProps = {
  trackUrl?: string;

  trackName?: string;

  trackArtists?: string;
};

export default function PlayerTrackInfo({
  trackUrl,
  trackName,
  trackArtists,
}: PlayerTrackInfoProps) {
  const [liked, setLiked] = useState(false);

  return (
    <Card className='border-none bg-transparent p-0 shadow-none'>
      <CardBody className='p-2'>
        <div className='flex h-full flex-row items-center justify-center gap-2'>
          <div className='flex h-[50px] w-[50px] items-center justify-center rounded-small'>
            {trackUrl ? (
              <Image
                alt='Album cover'
                className='rounded-small object-cover'
                src={trackUrl}
              />
            ) : (
              <div className='flex h-[50px] w-[50px] items-center justify-center rounded-small'>
                <NextImage
                  className='rounded-small object-cover'
                  src={playlistIcon}
                  alt='Playlist Icon'
                />
              </div>
            )}
          </div>

          <div className='flex w-full flex-col items-center justify-center overflow-hidden'>
            <div className='flex flex-col gap-0 overflow-hidden'>
              {trackName ? (
                <h3 className='truncate text-small font-semibold text-foreground/90'>
                  {trackName}
                </h3>
              ) : (
                <div className='w-32' />
              )}
              <p className='text-tiny text-foreground/80'>{trackArtists}</p>
            </div>
          </div>

          <div className='flex h-full items-center justify-center'>
            <Button
              isIconOnly
              radius='full'
              variant='light'
              onPress={() => setLiked((v) => !v)}
            >
              <HeartIcon
                size={20}
                className={liked ? '[&>path]:stroke-transparent' : ''}
                fill={liked ? 'currentColor' : 'none'}
              />
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
