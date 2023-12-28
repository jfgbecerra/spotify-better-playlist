'use client';

import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';

type AddDuplicateModalProps = {
  /** If the modal is open */
  isOpen: boolean;

  /** Function to call when open is changed */
  onOpenChange: () => void;
};

export default function AddDuplicateModal({
  isOpen,
  onOpenChange,
}: AddDuplicateModalProps) {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Error</ModalHeader>
              <ModalBody>
                <p>This playlist has already been opened in the editor pane!</p>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
