import React from 'react';
import PropTypes from 'prop-types';
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

const DeleteDataModal = (props) => {
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
              variant='outline'
              mr={2}
              onClick={onClose}
            >
              Close
            </Button>
            <SubmitButton
              isDisabled={isDeleting}
              isLoading={isDeleting}
              text='Delete'
              loadingText='Deleting'
            />
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

DeleteDataModal.propTypes = {
  artist: PropTypes.string.isRequired,
  dataType: PropTypes.string.isRequired,
  isDeleting: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default DeleteDataModal;
