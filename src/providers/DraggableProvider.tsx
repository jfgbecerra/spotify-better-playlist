'use client';

import { ReactNode, useCallback } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useSession } from 'next-auth/react';
import { usePlaylistStore } from '@/state/zustandState';
import { AuthSession } from '@/types/auth';
import { useDisclosure } from '@nextui-org/modal';
import AddDuplicateModal from '@/components/AddDuplicateModal';

type Props = {
  children: ReactNode;

  skip?: boolean;
};

export default function DraggableProvider({ children, skip = false }: Props) {
  const { data: session } = useSession();

  // If we are skipping, then just return the children
  if (skip) return <>{children}</>;

  // Function to add a playlist id to the playlist editor pane
  const idExists = usePlaylistStore((state) => state.idExists);
  const addPlaylistsIds = usePlaylistStore((state) => state.addPlaylistId);
  const movePlaylist = usePlaylistStore((state) => state.movePlaylistId);
  const moveTrack = usePlaylistStore((state) => state.moveTrack);

  // State for modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  /**
   * Function to append a playlist to pane editor
   * @param result The result from the drag and drop action
   */
  function hanldeAddPlaylist(result: DropResult, desInd: number) {
    if (!result.destination) return;

    addPlaylistsIds(result.draggableId, desInd, session as AuthSession);
  }

  /**
   * Function to append a playlist to pane editor
   * @param result The result from the drag and drop action
   */
  function handleMovingTrack(
    result: DropResult,
    srcId: string,
    destId: string,
    sourceInd: number,
    destInd: number
  ) {
    if (!result.destination) return;

    // If the track was left in the same spoto
    if (srcId === destId && sourceInd === destInd) return;

    moveTrack(
      srcId.split('_')[0],
      destId.split('_')[0],
      sourceInd,
      destInd,
      session as AuthSession
    );
  }

  /**
   * Function to handle drag and drop logic for the whole application
   */
  const onDragEnd = useCallback((result: DropResult) => {
    // If there is no destination, then return
    if (!result.destination) return;

    const sourceId = result.source.droppableId;
    const destId = result.destination.droppableId;
    const sourceInd = result.source.index;
    const destInd = result.destination.index;

    // Handle opening playlist
    if (result.type === 'playlist' && sourceId === 'sidebar-origin') {
      if (!idExists(result.draggableId.split('_')[0])) {
        hanldeAddPlaylist(result, destInd);
      } else {
        // Open the modal for tring to add duplicate modal
        onOpen();
      }
    }
    // Handle moving playlists order in the editor
    else if (
      result.type === 'playlist' &&
      sourceId === 'playlist-editor-pane'
    ) {
      movePlaylist(sourceInd, destInd);
    }
    // Handle moving a song
    else if (result.type === 'track') {
      handleMovingTrack(result, sourceId, destId, sourceInd, destInd);
    }
  }, []);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <AddDuplicateModal isOpen={isOpen} onOpenChange={onOpenChange} />
      {children}
    </DragDropContext>
  );
}
