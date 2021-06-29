import React from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spacer,
  SimpleGrid,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

import { formatReleases, sortByDate } from '../../utils';
import { useAppState } from '../Provider';
import AppMessage from '../AppMessage/presenter';
import DateCol from './DateCol';

const NewReleases = (props) => {
  const {
    data,
    error,
    handleCreateOpen,
    handleEditOpen,
    handleDeleteOpen,
    isLoading,
    refresh,
  } = props;
  const { user: { isAuthenticated } } = useAppState();

  return (
    <Container maxWidth='container.lg' mb={6}>
      <Flex align='center' mb={3}>
        <Heading as='h3' size='lg'>New Releases</Heading>
        <Spacer />
        {isAuthenticated && (
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
              onClick={handleCreateOpen}
            >
              New
            </Button>
          </Box>
        )}
      </Flex>
      {error && <AppMessage />}
      {data && data.releases && (
        <SimpleGrid minChildWidth='248px' spacing='24px'>
          {Object
            .entries(formatReleases(data.releases))
            .sort(sortByDate)
            .map(([date, releases]) => (
              <DateCol
                key={date}
                data={releases}
                date={date}
                handleEditOpen={handleEditOpen}
                handleDeleteOpen={handleDeleteOpen}
              />
            ))}
        </SimpleGrid>
      )}
    </Container>
  );
};

NewReleases.propTypes = {
  data: PropTypes.object,
  error: PropTypes.object,
  handleCreateOpen: PropTypes.func.isRequired,
  handleEditOpen: PropTypes.func.isRequired,
  handleDeleteOpen: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  refresh: PropTypes.func.isRequired,
};

export default NewReleases;
