'use client';

import { NextIcon } from '@/assets/NextIcon';
import { PauseCircleIcon } from '@/assets/PauseCircleIcon';
import { PreviousIcon } from '@/assets/PreviousIcon';
import { RepeatOneIcon } from '@/assets/RepeatOneIcon';
import { ShuffleIcon } from '@/assets/ShuffleIcon';
import { Card, CardBody, Slider, Button } from '@nextui-org/react';
import React from 'react';

export default function PlayerTrackControls() {
  return (
    <Card className='w-96 border-none bg-transparent p-0 shadow-none'>
      <CardBody className='flex flex-col overflow-hidden p-1'>
        <div className='flex h-8 w-full items-center justify-center'>
          <Button isIconOnly radius='full' variant='light'>
            <RepeatOneIcon />
          </Button>
          <Button isIconOnly radius='full' variant='light'>
            <PreviousIcon />
          </Button>
          <Button isIconOnly radius='full' variant='light'>
            <PauseCircleIcon size={30} />
          </Button>
          <Button isIconOnly radius='full' variant='light'>
            <NextIcon />
          </Button>
          <Button isIconOnly radius='full' variant='light'>
            <ShuffleIcon />
          </Button>
        </div>

        <div className='flex flex-col'>
          <Slider
            aria-label='Music progress'
            classNames={{
              track: 'bg-default-500/30',
              thumb: 'w-2 h-2 after:w-2 after:h-2 after:bg-foreground',
            }}
            color='foreground'
            defaultValue={33}
            size='sm'
          />
          <div className='flex justify-between'>
            <p className='text-tiny'>1:23</p>
            <p className='text-tiny text-foreground/50'>4:32</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
