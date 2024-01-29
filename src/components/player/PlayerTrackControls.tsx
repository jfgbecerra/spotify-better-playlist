'use client';

import { Card, CardBody, Button } from '@nextui-org/react';
import React from 'react';
import PlayPauseButton from '@/components/buttons/PlayPauseButton';
import { SkipBack, SkipForward } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { usePlaylistStore } from '@/state/zustandState';

export default function PlayerTrackControls() {
  const isPaused = usePlaylistStore((state) => state.isPaused);
  // const duration = usePlaylistStore((state) => state.duration);
  // const currPos = usePlaylistStore((state) => state.currPosition);
  const togglePlay = usePlaylistStore((state) => state.togglePlay);
  const next = usePlaylistStore((state) => state.next);
  const previous = usePlaylistStore((state) => state.previous);

  // Handle checking if the session is valid
  const { data: session } = useSession();
  if (!session) {
    return null;
  }

  return (
    <Card className='w-96 border-none bg-transparent p-0 shadow-none'>
      <CardBody className='flex flex-col justify-center overflow-hidden p-1'>
        <div className='flex h-8 w-full items-center justify-center'>
          <Button
            isIconOnly
            radius='full'
            variant='light'
            onClick={() => {
              previous();
            }}
          >
            <SkipBack />
          </Button>
          <PlayPauseButton isPlaying={!isPaused} togglePlay={togglePlay} />
          <Button
            isIconOnly
            radius='full'
            variant='light'
            onClick={() => {
              next();
            }}
          >
            <SkipForward />
          </Button>
        </div>
        {/*  TODO: Add this back in when I can figure out how to get the duration and current position
        <div className='flex flex-col'>
          <Slider
            aria-label='Music progress'
            classNames={{
              track: 'bg-default-500/30',
              thumb: 'w-1 h-1 after:w-1 after:h-1 after:bg-foreground',
            }}
            color='foreground'
            size='sm'
            value={currPos}
            maxValue={duration ?? 0}
          />
          <div className='flex justify-between'>
            <p className='text-tiny'>{currPos}</p>
            <p className='text-tiny text-foreground/50'>{duration}</p>
          </div>
        </div> */}
      </CardBody>
    </Card>
  );
}
