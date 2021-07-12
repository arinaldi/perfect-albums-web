import { FC } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Spacer,
} from '@chakra-ui/react';
import { ApolloError } from '@apollo/client';

import { Song } from '../../utils/types';
import { useAppState } from '../Provider';
import AppMessage from '../AppMessage/presenter';
import CardWrapper from './CardWrapper';

interface Modal {
  onCreateOpen: () => void;
  onDeleteOpen: (song: Song) => void;
}

interface Props {
  data: {
    songs: Song[];
  };
  error?: ApolloError;
  isLoading?: boolean;
  modal: Modal;
  refresh: () => void;
}

const FeaturedSongs: FC<Props> = (props) => {
  const {
    data,
    error,
    isLoading = false,
    modal: { onCreateOpen, onDeleteOpen },
    refresh,
  } = props;
  const {
    user: { isAuthenticated },
  } = useAppState();

  return (
    <Container maxWidth="container.lg" marginBottom={6}>
      <Flex align="center" marginBottom={3}>
        <Heading as="h3" size="lg">
          Featured Songs
        </Heading>
        <Spacer />
        {isAuthenticated ? (
          <Box>
            <Button
              variant="outline"
              isDisabled={isLoading}
              onClick={refresh}
              marginRight={1}
            >
              Refresh
            </Button>
            <Button variant="outline" onClick={onCreateOpen}>
              New
            </Button>
          </Box>
        ) : null}
      </Flex>
      {error ? <AppMessage /> : null}
      {data && data.songs ? (
        <SimpleGrid data-testid="card-row" minChildWidth="240px" spacing="24px">
          {data.songs.map((song: Song) => (
            <CardWrapper
              key={song.id}
              onDeleteOpen={onDeleteOpen}
              song={song}
            />
          ))}
        </SimpleGrid>
      ) : null}
    </Container>
  );
};

export default FeaturedSongs;
