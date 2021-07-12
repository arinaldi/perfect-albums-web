import { ChangeEvent, FC, FormEvent } from 'react';
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

interface ReleaseInput {
  artist: string;
  title: string;
  date: string | null;
}

interface Props {
  header: string;
  isOpen: boolean;
  isSaving?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  onSubmit: (event: FormEvent) => void;
  release: ReleaseInput;
}

const CreateReleaseModal: FC<Props> = (props) => {
  const {
    header,
    isOpen,
    isSaving = false,
    onChange,
    onClose,
    onSubmit,
    release,
  } = props;

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
              <Input
                name="artist"
                onChange={onChange}
                type="text"
                value={release.artist}
              />
            </FormControl>
            <FormControl id="title" isRequired marginY={4}>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                onChange={onChange}
                type="text"
                value={release.title}
              />
            </FormControl>
            <FormControl id="date">
              <FormLabel>Date</FormLabel>
              <Input
                name="date"
                onChange={onChange}
                type="date"
                value={release.date || undefined}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" mr={2} onClick={onClose}>
              Close
            </Button>
            <SubmitButton
              isDisabled={isSaving}
              isLoading={isSaving}
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
