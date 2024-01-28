'use client';

import { getUserDevices, setPlayer } from '@/lib/playlist-data-accessor';
import { usePlaylistStore } from '@/state/zustandState';
import { AuthSession } from '@/types';
import { Devices } from '@/types/device';
import { Button } from '@nextui-org/button';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/dropdown';
import { MonitorSpeaker } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function ActiveDeviceButton() {
  const [deviceIds, setDeviceIds] = useState<Devices | null>(null);
  const currId = usePlaylistStore((state) => state.deviceId);

  const { data: session } = useSession();

  // Set the current device id one time on boot
  useEffect(() => {
    // Set the current device id
    const setDeviceActive = async () => {
      await setPlayer(session as AuthSession, currId ?? '');
    };
    setDeviceActive();
  }, []);

  useEffect(() => {
    if (!session) return;

    // Get the users devices
    const getDevices = async () => {
      const devices = await getUserDevices(session as AuthSession);

      setDeviceIds(devices);
    };

    getDevices();
  }, [session]);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly variant='bordered'>
          <MonitorSpeaker />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label='Devices'
        onAction={(key) => alert(key)}
        items={deviceIds?.devices}
      >
        {(item) => (
          <DropdownItem
            key={item.id}
            color={item.is_active ? 'success' : 'default'}
          >
            {item.name}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
