'use client';

import React from 'react';
import { Button, Card, CardBody, Slider } from '@nextui-org/react';
import Image from 'next/image';
import Volume2 from '@/assets/volume-2.svg';
import Volume1 from '@/assets/volume-1.svg';
import Volume from '@/assets/volume.svg';
import VolumeX from '@/assets/volume-x.svg';
import { useSession } from 'next-auth/react';
import { usePlayer } from '@/providers/TrackPlayerProvider';

enum VolumeIcon {
  Volume2,
  Volume1,
  Volume,
  VolumeX,
}

// TODO: Add the current track in here so itll rerender and set the volume
// That way the user wont reset it each time. Also look at adding it to global state and
// Saving it to local storage so itll persist
export default function PlayerTrackExtraControls() {
  const { changeVolume } = usePlayer();

  const [loudLevel, setLoudLevel] = React.useState<VolumeIcon>(
    VolumeIcon.VolumeX
  );

  const [volume, _] = React.useState(0);

  const setVolume = (value: number) => {
    changeVolume(value / 100);
    _(value);
  };

  // Handle checking if the session is valid
  const { data: session } = useSession();
  if (!session) {
    return null;
  }

  const getIcon = () => {
    switch (loudLevel) {
      case VolumeIcon.Volume2:
        return <Image src={Volume2} alt='VolumeIcon' />;
      case VolumeIcon.Volume1:
        return <Image src={Volume1} alt='VolumeIcon' />;
      case VolumeIcon.Volume:
        return <Image src={Volume} alt='VolumeIcon' />;
      case VolumeIcon.VolumeX:
        return <Image src={VolumeX} alt='VolumeIcon' />;
    }
  };

  return (
    <Card className='ml-auto w-40 border-none bg-transparent p-0 shadow-none'>
      <CardBody className='flex h-full w-full flex-row items-center overflow-hidden p-2'>
        <Button
          onClick={() => {
            if (loudLevel === VolumeIcon.VolumeX) {
              setVolume(50);
              setLoudLevel(VolumeIcon.Volume1);
            } else {
              setVolume(0);
              setLoudLevel(VolumeIcon.VolumeX);
            }
          }}
          isIconOnly
          className='bg-transparent'
        >
          {getIcon()}
        </Button>

        <Slider
          aria-label='Volume'
          classNames={{
            track: 'bg-default-500/30',
            thumb: 'w-2 h-2 after:w-2 after:h-2 after:bg-foreground',
          }}
          color='foreground'
          value={volume}
          onChange={(value) => {
            setVolume(value as number);
            if ((value as number) > 66) {
              setLoudLevel(VolumeIcon.Volume2);
            } else if ((value as number) > 33 && (value as number) < 66) {
              setLoudLevel(VolumeIcon.Volume1);
            } else if ((value as number) > 0 && (value as number) < 33) {
              setLoudLevel(VolumeIcon.Volume);
            } else if ((value as number) === 0) {
              setLoudLevel(VolumeIcon.VolumeX);
            }
          }}
          size='sm'
        />
      </CardBody>
    </Card>
  );
}
