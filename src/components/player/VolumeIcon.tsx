'use client';

import { Volume, Volume1, Volume2, VolumeX } from 'lucide-react';

export enum VolumneLevel {
  Volume2,
  Volume1,
  Volume,
  VolumeX,
}

type VolumpeIconProps = {
  loudLevel: VolumneLevel;
};

export default function VolumeIcon({ loudLevel }: VolumpeIconProps) {
  const getIcon = (level: VolumneLevel) => {
    switch (level) {
      case VolumneLevel.Volume2:
        return <Volume2 />;
      case VolumneLevel.Volume1:
        return <Volume1 />;
      case VolumneLevel.Volume:
        return <Volume />;
      case VolumneLevel.VolumeX:
        return <VolumeX />;
    }
  };

  return getIcon(loudLevel);
}
