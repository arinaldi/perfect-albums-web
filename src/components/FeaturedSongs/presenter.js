import React from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Spacer,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

import { useAppState } from '../Provider';
import AppMessage from '../AppMessage/presenter';
import CardWrapper from './CardWrapper';

const FeaturedSongs = (props) => {
  const {
    data,
    error,
    isLoading,
    onCreateOpen,
    onDeleteOpen,
    refresh,
  } = props;
  const { user: { isAuthenticated } } = useAppState();

  return (
    <Container maxWidth='container.lg' mb={6}>
      <Flex align='center' mb={3}>
        <Heading as='h3' size='lg'>
          Featured Songs
        </Heading>
        <Spacer />
        {isAuthenticated
          ? (
            <Box>
              <Button
                variant='outline'
                isDisabled={isLoading}
                onClick={refresh}
                marginRight={1}
              >
                Refresh
              </Button>
              <Button
                variant='outline'
                onClick={onCreateOpen}
              >
                New
              </Button>
            </Box>
          )
          : null}
      </Flex>
      {error ? <AppMessage /> : null}
      {data && data.songs
        ? (
          <SimpleGrid
            data-testid='card-row'
            minChildWidth='240px'
            spacing='24px'
          >
            {data.songs.map(song => (
              <CardWrapper
                key={song.id}
                song={song}
                handleDeleteOpen={onDeleteOpen}
              />
            ))}
          </SimpleGrid>
        )
        : null}
    </Container>
  );
};

FeaturedSongs.propTypes = {
  data: PropTypes.object,
  error: PropTypes.object,
  isLoading: PropTypes.bool,
  onCreateOpen: PropTypes.func.isRequired,
  onDeleteOpen: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
};

export default FeaturedSongs;
