import { FC, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
} from '@chakra-ui/react';

import useStore from '../../hooks/useStore';
import Page from './Page';
import LoadMore from './LoadMore';
import RandomArtist from './RandomArtist';
import RandomAlbum from './RandomAlbum';

interface Props {
  handleNext: () => void;
  page: number;
}

const Sandbox: FC<Props> = ({ handleNext, page }) => {
  const user = useStore((state) => state.user);
  const [dataPage, setDataPage] = useState(1);
  const data = [];

  for (let i = 0; i < dataPage; i++) {
    data.push(
      <Page key={i} direction="desc" page={i + 1} perPage={10} sort="year" />,
    );
  }

  return (
    <Container maxWidth="container.xl" marginBottom={6}>
      <Flex>
        <Box flex={1}>
          <Heading as="h3" marginBottom={3} size="lg">
            Sandbox 1
          </Heading>
          <Page page={page} perPage={10} />
          <Box style={{ display: 'none' }}>
            <Page page={page + 1} perPage={10} />
          </Box>
          <Button marginTop={3} onClick={handleNext} variant="outline">
            Next
          </Button>
          <Divider my={4} />
          {data}
          <Button
            marginTop={3}
            onClick={() => setDataPage((page) => page + 1)}
            variant="outline"
          >
            Load More
          </Button>
        </Box>
        <Box flex={1}>
          <Heading as="h3" marginBottom={3} size="lg">
            Sandbox 2
          </Heading>
          <RandomArtist />
          <Divider my={4} />
          <RandomAlbum />
          <Divider my={4} />
          <LoadMore />
        </Box>
      </Flex>
    </Container>
  );
};

export default Sandbox;
