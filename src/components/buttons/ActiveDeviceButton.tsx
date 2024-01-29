'use client';

import { getUserDevices } from '@/lib/playlist-data-accessor';
import { AuthSession } from '@/types';
import { Device } from '@/types/device';
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

// TODO: Figure out why this is is not pulling down the devices like it is supposed to
export default function ActiveDeviceButton() {
  const [deviceIds, setDeviceIds] = useState<Device[] | null>(null);

  const { data: session } = useSession();

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
        items={deviceIds ?? []}
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
