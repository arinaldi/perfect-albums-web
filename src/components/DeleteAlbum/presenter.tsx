import { FC, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
} from '@chakra-ui/react';

import { Album } from '../../utils/types';
import { STATE_STATUSES } from '../../constants';
import AppMessage from '../AppMessage/presenter';
import SubmitButton from '../SubmitButton/presenter';

interface Props {
  data: Album;
  isDeleting?: boolean;
  onSubmit: (event: FormEvent) => void;
  query?: string;
  status: string;
}

const DeleteAlbum: FC<Props> = ({ data, isDeleting = false, onSubmit, query = '', status }) => {
  const history = useHistory();

  const handleCancel = () => {
    history.push(`/admin?${query}`);
  };

  return (
    <Container maxWidth="container.lg" marginBottom={3}>
      <Heading as="h3" size="lg">Delete Album</Heading>
      {data && (
        <form onSubmit={onSubmit}>
          <Text marginY={4}>
            {`Are you sure you want to delete ${data.artist} – ${data.title}?`}
          </Text>
          <Box marginBottom={6}>
            <Button
              onClick={handleCancel}
              marginRight={2}
              variant="outline"
            >
              Cancel
            </Button>
            <SubmitButton
              isDisabled={isDeleting}
              isLoading={isDeleting}
              loadingText="Deleting"
              text="Delete"
            />
          </Box>
        </form>
      )}
      {status === STATE_STATUSES.FAILURE ? <AppMessage /> : null}
    </Container>
  );
};

export default DeleteAlbum;
