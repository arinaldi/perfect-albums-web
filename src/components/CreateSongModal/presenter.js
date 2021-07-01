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

const CreateSongModal = (props) => {
  const {
    isOpen,
    isSaving,
    onChange,
    onClose,
    onSubmit,
    song,
  } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Song</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={onSubmit}>
          <ModalBody>
            <FormControl id='artist' isRequired>
              <FormLabel>Artist</FormLabel>
              <Input
                name='artist'
                onChange={onChange}
                type='text'
                value={song.artist}
              />
            </FormControl>
            <FormControl id='title' isRequired my={4}>
              <FormLabel>Title</FormLabel>
              <Input
                name='title'
                onChange={onChange}
                type='text'
                value={song.title}
              />
            </FormControl>
            <FormControl id='link' isRequired>
              <FormLabel>Link</FormLabel>
              <Input
                name='link'
                onChange={onChange}
                type='text'
                value={song.link}
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

CreateSongModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  song: PropTypes.shape({
    artist: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }),
};

export default CreateSongModal;
