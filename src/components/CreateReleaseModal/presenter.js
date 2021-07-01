import PropTypes from 'prop-types';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import SubmitButton from '../SubmitButton/presenter';

const CreateReleaseModal = (props) => {
  const {
    isOpen,
    header,
    release,
    isSaving,
    onChange,
    onClose,
    onSubmit,
  } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header} Release</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={onSubmit}>
          <ModalBody>
            <FormControl id='artist' isRequired>
              <FormLabel>Artist</FormLabel>
              <Input
                name='artist'
                onChange={onChange}
                type='text'
                value={release.artist}
              />
            </FormControl>
            <FormControl id='title' isRequired marginY={4}>
              <FormLabel>Title</FormLabel>
              <Input
                name='title'
                onChange={onChange}
                type='text'
                value={release.title}
              />
            </FormControl>
            <FormControl id='date'>
              <FormLabel>Date</FormLabel>
              <Input
                name='date'
                onChange={onChange}
                type='date'
                value={release.date}
              />
            </FormControl>
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
              isDisabled={isSaving}
              isLoading={isSaving}
              text='Save'
              loadingText='Saving'
            />
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

CreateReleaseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  header: PropTypes.string.isRequired,
  release: PropTypes.shape({
    artist: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string,
  }),
  isSaving: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CreateReleaseModal;
