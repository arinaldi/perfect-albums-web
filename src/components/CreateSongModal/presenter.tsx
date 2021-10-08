import { FC, FormEvent } from 'react';
import type { UseFormRegister } from 'react-hook-form';
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

import { SongInput } from '../../utils/types';
import SubmitButton from '../SubmitButton/presenter';

interface Props {
  isOpen: boolean;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (event: FormEvent) => void;
  register: UseFormRegister<SongInput>;
}

const CreateSongModal: FC<Props> = (props) => {
  const { isOpen, isSubmitting, onClose, onSubmit, register } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Song</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={onSubmit}>
          <ModalBody>
            <FormControl id="artist" isRequired>
              <FormLabel>Artist</FormLabel>
              <Input
                isRequired
                type="text"
                {...register('artist', { required: true })}
              />
            </FormControl>
            <FormControl id="title" isRequired my={4}>
              <FormLabel>Title</FormLabel>
              <Input
                isRequired
                type="text"
                {...register('title', { required: true })}
              />
            </FormControl>
            <FormControl id="link" isRequired>
              <FormLabel>Link</FormLabel>
              <Input
                isRequired
                type="text"
                {...register('link', { required: true })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" mr={2} onClick={onClose}>
              Close
            </Button>
            <SubmitButton
              isSubmitting={isSubmitting}
              text="Save"
              loadingText="Saving"
            />
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateSongModal;
