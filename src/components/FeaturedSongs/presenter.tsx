import {
  Button,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Spacer,
} from '@chakra-ui/react';

import { Song, Songs } from '../../utils/types';
import useStore from '../../hooks/useStore';
import AppMessage from '../AppMessage/presenter';
import CardWrapper from './CardWrapper';

interface Modal {
  onCreateOpen: () => void;
  onDeleteOpen: (song: Song) => void;
}

interface Props {
  data: Songs | null;
  hasError: boolean;
  modal: Modal;
}

export default function FeaturedSongs({
  data,
  hasError,
  modal: { onCreateOpen, onDeleteOpen },
}: Props) {
  const user = useStore((state) => state.user);

  return (
    <Container maxWidth="container.xl" marginBottom={6}>
      <Flex align="center" marginBottom={3}>
        <Heading as="h3" size="lg">
          Featured Songs
        </Heading>
        <Spacer />
        {user ? (
          <Button variant="outline" onClick={onCreateOpen}>
            New
          </Button>
        ) : null}
      </Flex>
      {hasError ? <AppMessage /> : null}
      {data?.songs ? (
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
}
