'use client';

import { setShuffleMode } from '@/lib/playlist-data-accessor';
import { usePlaylistStore } from '@/state/zustandState';
import { AuthSession } from '@/types/auth';
import { Button } from '@nextui-org/button';
import { Shuffle } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function ShuffleButton() {
  const shuffle = usePlaylistStore((state) => state.shuffle);
  const setShuffleState = usePlaylistStore((state) => state.setShuffle);

  const { data: session } = useSession();
  if (!session) return null;

  const changeShuffle = async () => {
    await setShuffleMode(session as AuthSession, !shuffle);
    setShuffleState(!shuffle);
  };

  const getShuffleIcon = () => {
    switch (shuffle) {
      case false:
        return <Shuffle />;
      case true:
        return <Shuffle color='green' />;
    }
  };

  return (
    <Button
      radius='full'
      variant='light'
      isIconOnly
      onPress={() => changeShuffle()}
    >
      {getShuffleIcon()}
    </Button>
  );
}
