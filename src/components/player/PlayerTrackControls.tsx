'use client';

import { NextIcon } from '@/assets/NextIcon';
import { PreviousIcon } from '@/assets/PreviousIcon';
import { usePlayer } from '@/providers/TrackPlayerProvider';
import { Card, CardBody, Slider, Button } from '@nextui-org/react';
import React from 'react';
import PlayPauseButton from '@/components/buttons/PlayPauseButton';
import { useSession } from 'next-auth/react';

export default function PlayerTrackControls() {
  const {
    isPlaying,
    setSlider,
    setDrag,
    togglePlay,
    duration,
    currentTime,
    slider,
  } = usePlayer();

  // Handle checking if the session is valid
  const { data: session } = useSession();
  if (!session) {
    return null;
  }

  return (
    <Card className='w-96 border-none bg-transparent p-0 shadow-none'>
      <CardBody className='flex flex-col overflow-hidden p-1'>
        <div className='flex h-8 w-full items-center justify-center'>
          <Button isIconOnly radius='full' variant='light'>
            <PreviousIcon />
          </Button>
          <PlayPauseButton isPlaying={isPlaying} togglePlay={togglePlay} />
          <Button isIconOnly radius='full' variant='light'>
            <NextIcon />
          </Button>
        </div>

        <div className='flex flex-col'>
          <Slider
            aria-label='Music progress'
            classNames={{
              track: 'bg-default-500/30',
              thumb: 'w-1 h-1 after:w-1 after:h-1 after:bg-foreground',
            }}
            color='foreground'
            size='sm'
            value={Math.round(currentTime)}
            maxValue={Math.round(duration)}
          />
          <div className='flex justify-between'>
            <p className='text-tiny'>{Math.round(currentTime)}</p>
            <p className='text-tiny text-foreground/50'>
              {Math.round(duration)}
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
