import React from 'react';
import {
  Badge,
  Button,
  Container,
  Flex,
  Heading,
  Spacer,
  SimpleGrid,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

import { formatFavorites, sortDesc } from '../../utils';
import { useAppState } from '../Provider';
import AppMessage from '../AppMessage/presenter';
import AlbumCol from './AlbumCol';
import TopLink from './TopLink';

const TopAlbums = (props) => {
  const {
    data,
    error,
    isLoading,
    refresh,
  } = props;
  const { user: { isAuthenticated } } = useAppState();

  return (
    <>
      <Container maxWidth='container.lg' mb={6}>
        <Flex align='center' mb={3}>
          <Heading as='h3' size='lg'>Top Albums
            {data && data.favorites && (
              <Badge
                borderRadius='4px'
                fontSize='0.9em'
                marginLeft={1}
                verticalAlign='baseline'
              >
                {data.favorites.length.toLocaleString()}
              </Badge>
            )}
          </Heading>
          <Spacer />
          {isAuthenticated && (
            <Button
              isDisabled={isLoading}
              marginRight={1}
              onClick={refresh}
              variant='outline'
            >
              Refresh
            </Button>
          )}
        </Flex>
        {error && <AppMessage />}
        {data && data.favorites && (
          <SimpleGrid minChildWidth='240px' spacing='24px'>
            {Object
              .entries(formatFavorites(data.favorites))
              .sort(sortDesc)
              .map(([year, favorites]) => (
                <AlbumCol
                  key={year}
                  data={favorites}
                  year={year}
                  total={favorites.length}
                />
              ))}
          </SimpleGrid>
        )}
      </Container>
      <TopLink />
    </>
  );
};

TopAlbums.propTypes = {
  data: PropTypes.object,
  error: PropTypes.object,
  isLoading: PropTypes.bool,
  refresh: PropTypes.func.isRequired,
};

export default TopAlbums;
