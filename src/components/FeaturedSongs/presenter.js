import React from 'react';
import {
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
    handleCreateOpen,
    handleDeleteOpen,
    isLoading,
    refresh,
  } = props;
  const { user: { isAuthenticated } } = useAppState();

  return (
    <Container maxWidth='container.lg'>
      <Flex align='center' mb={3}>
        <Heading as='h3' size='lg'>
          Featured Songs
        </Heading>
        <Spacer />
        {isAuthenticated && (
          <>
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
              onClick={handleCreateOpen}
            >
              New
            </Button>
          </>
        )}
      </Flex>
      {error && <AppMessage />}
      {data && data.songs && (
        <SimpleGrid
          data-testid='card-row'
          minChildWidth='240px'
          spacing='24px'
        >
          {data.songs.map(song => (
            <CardWrapper
              key={song.id}
              song={song}
              handleDeleteOpen={handleDeleteOpen}
            />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};

FeaturedSongs.propTypes = {
  data: PropTypes.object,
  error: PropTypes.object,
  handleCreateOpen: PropTypes.func.isRequired,
  handleDeleteOpen: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  refresh: PropTypes.func.isRequired,
};

export default FeaturedSongs;
