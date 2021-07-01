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
    isLoading,
    onCreateOpen,
    onEditOpen,
    onDeleteOpen,
    refresh,
  } = props;
  const { user: { isAuthenticated } } = useAppState();

  return (
    <Container maxWidth='container.lg' marginBottom={6}>
      <Flex align='center' marginBottom={3}>
        <Heading as='h3' size='lg'>New Releases</Heading>
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
      {data && data.releases
        ? (
          <SimpleGrid minChildWidth='248px' spacing='24px'>
            {Object
              .entries(formatReleases(data.releases))
              .sort(sortByDate)
              .map(([date, releases]) => (
                <DateCol
                  key={date}
                  data={releases}
                  date={date}
                  onEditOpen={onEditOpen}
                  onDeleteOpen={onDeleteOpen}
                />
              ))}
          </SimpleGrid>
        )
        : null}
    </Container>
  );
};

NewReleases.propTypes = {
  data: PropTypes.object,
  error: PropTypes.object,
  isLoading: PropTypes.bool,
  onCreateOpen: PropTypes.func.isRequired,
  onEditOpen: PropTypes.func.isRequired,
  onDeleteOpen: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
};

export default NewReleases;
