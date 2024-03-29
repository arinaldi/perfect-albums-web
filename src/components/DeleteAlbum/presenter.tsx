import { FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Container, Heading, Text } from '@chakra-ui/react';

import { Album } from '../../utils/types';
import { STATE_STATUSES } from '../../constants';
import AppMessage from '../AppMessage/presenter';
import SubmitButton from '../SubmitButton/presenter';

interface Props {
  data: Album | null;
  isDeleting?: boolean;
  onSubmit: (event: FormEvent) => void;
  status: string;
}

export default function DeleteAlbum({
  data,
  isDeleting = false,
  onSubmit,
  status,
}: Props) {
  const navigate = useNavigate();
  const { search } = useLocation();

  function handleCancel() {
    navigate(`/admin${search}`);
  }

  return (
    <Container maxWidth="container.lg" marginBottom={3}>
      <Heading as="h3" size="lg">
        Delete Album
      </Heading>
      {data && (
        <form onSubmit={onSubmit}>
          <Text marginY={4}>
            {`Are you sure you want to delete ${data.artist} – ${data.title}?`}
          </Text>
          <Box marginBottom={6}>
            <Button marginRight={2} onClick={handleCancel} variant="outline">
              Cancel
            </Button>
            <SubmitButton
              isSubmitting={isDeleting}
              loadingText="Deleting"
              text="Delete"
            />
          </Box>
        </form>
      )}
      {status === STATE_STATUSES.FAILURE ? <AppMessage /> : null}
    </Container>
  );
}
