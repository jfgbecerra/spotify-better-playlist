'use client';

import React from 'react';
import { Button, Card, CardBody, Slider } from '@nextui-org/react';
import Image from 'next/image';
import Volume2 from '@/assets/volume-2.svg';

export default function PlayerTrackExtraControls() {
  return (
    <Card className='w-40 border-none bg-transparent p-0 shadow-none'>
      <CardBody className='flex h-full w-full flex-row items-center overflow-hidden p-2'>
        <Button isIconOnly className='bg-transparent'>
          <Image src={Volume2} alt='VolumeIcon' />
        </Button>

        <Slider
          aria-label='Volume'
          classNames={{
            track: 'bg-default-500/30',
            thumb: 'w-2 h-2 after:w-2 after:h-2 after:bg-foreground',
          }}
          color='foreground'
          defaultValue={33}
          size='sm'
        />
      </CardBody>
    </Card>
  );
}
