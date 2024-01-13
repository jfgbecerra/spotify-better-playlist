'use client';

import { Playlist } from '@/types/playlist';
import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Music } from 'lucide-react';
import { Skeleton } from '@nextui-org/skeleton';
import { useState } from 'react';

type SidebarItemProps = {
  /** The playlist to render */
  playlist: Playlist;
};

// TODO: Update the skeleton to be calculated for each item instead of only using the image

export default function SidebarItem({ playlist }: SidebarItemProps) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <Card className='border-none bg-cardBackground px-2 shadow-none hover:bg-neutral-700'>
      <CardBody className='p-2'>
        <div className='flex h-full flex-row gap-2'>
          <div>
            {playlist?.images?.[0] ? (
              <Skeleton isLoaded={isLoaded} className='rounded-small'>
                <div className='flex h-[48px] w-[48px] items-center justify-center rounded-small bg-neutral-500'>
                  <Image
                    alt='Album cover'
                    className='rounded-small object-cover'
                    src={playlist?.images?.[0]?.url}
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
                  {playlist.name}
                </h3>
              </Skeleton>
              <Skeleton isLoaded={isLoaded} className='rounded-lg'>
                <p className='text-small text-foreground/80'>
                  {playlist.owner.display_name}
                </p>
              </Skeleton>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
