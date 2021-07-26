import { FC, FormEvent } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

import { MODAL_DATA_TYPES } from '../../constants';
import { Release, Song } from '../../utils/types';
import SubmitButton from '../SubmitButton/presenter';

interface Props {
  data: Release | Song;
  dataType: MODAL_DATA_TYPES;
  isDeleting: boolean;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (event: FormEvent) => void;
}

const DeleteDataModal: FC<Props> = (props) => {
  const { data, dataType, isDeleting, isOpen, onClose, onDelete } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete {dataType}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={onDelete}>
          <ModalBody>
            <Text>{`Are you sure you want to delete ${data.artist} – ${data.title}?`}</Text>
          </ModalBody>
          <ModalFooter>
            <Button marginRight={2} onClick={onClose} variant="outline">
              Close
            </Button>
            <SubmitButton
              isDisabled={isDeleting}
              isLoading={isDeleting}
              loadingText="Deleting"
              text="Delete"
            />
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default DeleteDataModal;
