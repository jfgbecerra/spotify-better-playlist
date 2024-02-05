'use client';

import { setRepeatMode } from '@/lib/playlist-data-accessor';
import { usePlaylistStore } from '@/state/zustandState';
import { AuthSession } from '@/types/auth';
import { Button } from '@nextui-org/button';
import { Repeat, Repeat1 } from 'lucide-react';
import { useSession } from 'next-auth/react';

enum RepeatMode {
  off = 'off',
  track = 'track',
  context = 'context',
}

export default function RepeatButton() {
  const repeat = usePlaylistStore((state) => state.repeatMode);
  const setRepeateState = usePlaylistStore((state) => state.setRepeatMode);

  const { data: session } = useSession();
  if (!session) return null;

  const changeRepeat = async () => {
    if (repeat === 0) {
      await setRepeatMode(session as AuthSession, RepeatMode.context);
      setRepeateState(1);
    } else if (repeat === 1) {
      await setRepeatMode(session as AuthSession, RepeatMode.track);
      setRepeateState(2);
    } else {
      await setRepeatMode(session as AuthSession, RepeatMode.off);
      setRepeateState(0);
    }
  };

  const getRepeatIcon = () => {
    switch (repeat) {
      case 0:
        return <Repeat />;
      case 1:
        return <Repeat color='green' />;
      case 2:
        return <Repeat1 color='green' />;
      default:
        return <Repeat />;
    }
  };

  return (
    <Button
      isIconOnly
      radius='full'
      variant='light'
      onPress={() => changeRepeat()}
    >
      {getRepeatIcon()}
    </Button>
  );
}
