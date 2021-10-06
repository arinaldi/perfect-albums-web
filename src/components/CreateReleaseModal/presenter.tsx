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

import { ReleaseInput } from '../../utils/types';
import SubmitButton from '../SubmitButton/presenter';

interface Props {
  header: string;
  isOpen: boolean;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (event: FormEvent) => void;
  register: UseFormRegister<ReleaseInput>;
}

const CreateReleaseModal: FC<Props> = (props) => {
  const { header, isOpen, isSubmitting, onClose, onSubmit, register } = props;
  const { ref: artistRef, ...artistRest } = register('artist', {
    required: true,
  });
  const { ref: titleRef, ...titleRest } = register('title', {
    required: true,
  });
  const { ref: dateRef, ...dateRest } = register('date');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header} Release</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={onSubmit}>
          <ModalBody>
            <FormControl id="artist" isRequired>
              <FormLabel>Artist</FormLabel>
              <Input ref={(e) => artistRef(e)} type="text" {...artistRest} />
            </FormControl>
            <FormControl id="title" isRequired marginY={4}>
              <FormLabel>Title</FormLabel>
              <Input ref={(e) => titleRef(e)} type="text" {...titleRest} />
            </FormControl>
            <FormControl id="date">
              <FormLabel>Date</FormLabel>
              <Input ref={(e) => dateRef(e)} type="date" {...dateRest} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" mr={2} onClick={onClose}>
              Close
            </Button>
            <SubmitButton
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
              text="Save"
              loadingText="Saving"
            />
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateReleaseModal;
