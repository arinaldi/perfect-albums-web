import { FC } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spacer,
  SimpleGrid,
} from '@chakra-ui/react';
import { ApolloError } from '@apollo/client';

import { formatReleases, sortByDate } from '../../utils';
import { Release } from '../../utils/types';
import { useAppState } from '../Provider';
import AppMessage from '../AppMessage/presenter';
import DateCol from './DateCol';

interface Modal {
  onCreateOpen: () => void;
  onDeleteOpen: (release: Release) => void;
  onEditOpen: (release: Release) => void;
}

interface Props {
  data: {
    releases: Release[];
  };
  error?: ApolloError;
  isLoading?: boolean;
  modal: Modal;
  refresh: () => void;
}

const NewReleases: FC<Props> = (props) => {
  const {
    data,
    error,
    isLoading = false,
    modal: { onCreateOpen, onDeleteOpen, onEditOpen },
    refresh,
  } = props;
  const { user: { isAuthenticated } } = useAppState();

  return (
    <Container maxWidth="container.lg" marginBottom={6}>
      <Flex align="center" marginBottom={3}>
        <Heading as="h3" size="lg">New Releases</Heading>
        <Spacer />
        {isAuthenticated
          ? (
            <Box>
              <Button
                variant="outline"
                isDisabled={isLoading}
                onClick={refresh}
                marginRight={1}
              >
                Refresh
              </Button>
              <Button
                variant="outline"
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
          <SimpleGrid minChildWidth="248px" spacing="24px">
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

export default NewReleases;
