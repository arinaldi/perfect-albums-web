import { FC } from 'react';
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

import SubmitButton from '../SubmitButton/presenter';

interface Props {
  artist: string;
  dataType: string;
  isDeleting: boolean;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (data: any) => void;
  title: string;
}

const DeleteDataModal: FC<Props> = (props) => {
  const {
    artist,
    dataType,
    isDeleting,
    isOpen,
    onClose,
    onDelete,
    title,
  } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete {dataType}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={onDelete}>
          <ModalBody>
            <Text>{`Are you sure you want to delete ${artist} – ${title}?`}</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              marginRight={2}
              onClick={onClose}
              variant="outline"
            >
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
