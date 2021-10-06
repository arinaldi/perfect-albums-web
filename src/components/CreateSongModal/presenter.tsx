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
  const { ref: artistRef, ...artistRest } = register('artist', {
    required: true,
  });
  const { ref: titleRef, ...titleRest } = register('title', {
    required: true,
  });
  const { ref: linkRef, ...linkRest } = register('link', {
    required: true,
  });

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
              <Input ref={(e) => artistRef(e)} type="text" {...artistRest} />
            </FormControl>
            <FormControl id="title" isRequired my={4}>
              <FormLabel>Title</FormLabel>
              <Input ref={(e) => titleRef(e)} type="text" {...titleRest} />
            </FormControl>
            <FormControl id="link" isRequired>
              <FormLabel>Link</FormLabel>
              <Input ref={(e) => linkRef(e)} type="text" {...linkRest} />
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
