'use client';

import { usePlaylistStore } from '@/state/zustandState';
import { AuthSession } from '@/types';
import { Playlist } from '@/types/playlist';
import { Card, CardBody } from '@nextui-org/card';
import { useDisclosure } from '@nextui-org/react';
import { Music } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import AddDuplicateModal from '../AddDuplicateModal';

type SidebarItemProps = {
  /** The playlist to render */
  playlist: Playlist;
};

export default function SidebarItem({ playlist }: SidebarItemProps) {
  const addPlaylistsIds = usePlaylistStore((state) => state.addPlaylistId);
  const idExists = usePlaylistStore((state) => state.idExists);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Handle checking if the session is valid
  const { data: session } = useSession();
  if (!session) {
    return null;
  }

  return (
    <>
      <AddDuplicateModal isOpen={isOpen} onOpenChange={onOpenChange} />

      <Card
        onDoubleClick={() => {
          if (!idExists(playlist.id)) {
            addPlaylistsIds(
              `${playlist.id}_${playlist.snapshot_id}`,
              0,
              session as AuthSession
            );
          } else {
            // Open the modal for tring to add duplicate modal
            onOpen();
          }
        }}
        className='border-none bg-cardBackground px-2 shadow-none hover:bg-neutral-200 dark:hover:bg-neutral-700'
      >
        <CardBody className='p-2'>
          <div className='flex h-full flex-row gap-2'>
            <div>
              {playlist?.images?.[0] ? (
                <div className='flex h-[48px] w-[48px] items-center justify-center rounded-small bg-neutral-500'>
                  <Image
                    width={48}
                    height={48}
                    alt='Album cover'
                    className='rounded-small object-cover'
                    src={playlist?.images?.[0]?.url}
                  />
                </div>
              ) : (
                <div className='flex h-[48px] w-[48px] items-center justify-center rounded-small bg-neutral-500'>
                  <Music />
                </div>
              )}
            </div>

            <div className='flex w-full items-start justify-between overflow-hidden'>
              <div className='flex flex-col gap-0 overflow-hidden'>
                <h3 className='truncate font-semibold text-foreground/90'>
                  {playlist.name}
                </h3>
                <p className='text-small text-foreground/80'>
                  {playlist.owner.display_name}
                </p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
