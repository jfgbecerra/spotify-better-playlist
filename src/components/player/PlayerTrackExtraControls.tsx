'use client';

import React from 'react';
import { Button, Card, CardBody, Slider } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import VolumeIcon, { VolumneLevel } from './VolumeIcon';
import { usePlaylistStore } from '@/state/zustandState';

export default function PlayerTrackExtraControls() {
  const vol = usePlaylistStore((state) => state.volume);
  const setVol = usePlaylistStore((state) => state.changeVolume);

  const [volume, _] = React.useState(vol * 100);
  const getIcon = () => {
    if (volume > 66) {
      return VolumneLevel.Volume2;
    } else if (volume > 33 && volume < 66) {
      return VolumneLevel.Volume1;
    } else if (volume > 0 && volume < 33) {
      return VolumneLevel.Volume;
    } else if (volume === 0) {
      return VolumneLevel.VolumeX;
    }
  };
  const [loudLevel, setLoudLevel] = React.useState<VolumneLevel>(
    VolumneLevel.Volume1
  );

  const setVolume = (value: number) => {
    setVol(value / 100);
    _(value);
  };

  // Handle checking if the session is valid
  const { data: session } = useSession();
  if (!session) {
    return null;
  }

  return (
    <Card className='w-40 border-none bg-transparent p-0 shadow-none'>
      <CardBody className='flex h-full w-full flex-row items-center overflow-hidden p-2'>
        <Slider
          hideThumb
          startContent={
            <Button
              onClick={() => {
                if (loudLevel === VolumneLevel.VolumeX) {
                  setVolume(50);
                  setLoudLevel(VolumneLevel.Volume1);
                } else {
                  setVolume(0);
                  setLoudLevel(VolumneLevel.VolumeX);
                }
              }}
              isIconOnly
              className='bg-transparent'
            >
              <VolumeIcon loudLevel={loudLevel} />
            </Button>
          }
          aria-label='Volume'
          classNames={{
            track: 'bg-default-500/30',
          }}
          color='foreground'
          value={volume}
          onChange={(value) => {
            setVolume(value as number);
            if ((value as number) > 66) {
              setLoudLevel(VolumneLevel.Volume2);
            } else if ((value as number) > 33 && (value as number) < 66) {
              setLoudLevel(VolumneLevel.Volume1);
            } else if ((value as number) > 0 && (value as number) < 33) {
              setLoudLevel(VolumneLevel.Volume);
            } else if ((value as number) === 0) {
              setLoudLevel(VolumneLevel.VolumeX);
            }
          }}
          size='sm'
        />
      </CardBody>
    </Card>
  );
}
