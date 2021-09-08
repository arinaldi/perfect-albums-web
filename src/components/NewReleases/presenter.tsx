import { FC } from 'react';
import {
  Button,
  Container,
  Flex,
  Heading,
  Spacer,
  SimpleGrid,
} from '@chakra-ui/react';

import { formatReleases, sortByDate } from '../../utils';
import { Release, Releases } from '../../utils/types';
import useStore from '../../hooks/useStore';
import AppMessage from '../AppMessage/presenter';
import DateCol from './DateCol';

interface Modal {
  onCreateOpen: () => void;
  onDeleteOpen: (release: Release) => void;
  onEditOpen: (release: Release) => void;
}

interface Props {
  data: Releases | null;
  hasError: boolean;
  modal: Modal;
}

const NewReleases: FC<Props> = (props) => {
  const {
    data,
    hasError,
    modal: { onCreateOpen, onDeleteOpen, onEditOpen },
  } = props;
  const user = useStore((state) => state.user);

  return (
    <Container maxWidth="container.xl" marginBottom={6}>
      <Flex align="center" marginBottom={3}>
        <Heading as="h3" size="lg">
          New Releases
        </Heading>
        <Spacer />
        {user ? (
          <Button variant="outline" onClick={onCreateOpen}>
            New
          </Button>
        ) : null}
      </Flex>
      {hasError ? <AppMessage /> : null}
      {data?.releases ? (
        <SimpleGrid minChildWidth="248px" spacing="24px">
          {Object.entries(formatReleases(data.releases))
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
      ) : null}
    </Container>
  );
};

export default NewReleases;
