import { FC } from 'react';
import {
  Badge,
  Button,
  Container,
  Flex,
  Heading,
  Spacer,
  SimpleGrid,
} from '@chakra-ui/react';
import { ApolloError } from '@apollo/client';

import { formatFavorites, sortDesc } from '../../utils';
import { Favorite } from '../../utils/types';
import useStore from '../../hooks/useStore';
import AppMessage from '../AppMessage/presenter';
import AlbumCol from './AlbumCol';
import TopLink from './TopLink';

interface Props {
  data: {
    favorites: Favorite[];
  };
  error?: ApolloError;
  isLoading?: boolean;
  refresh: () => void;
}

const TopAlbums: FC<Props> = ({ data, error, isLoading, refresh }) => {
  const hasAuth = useStore((state) => state.hasAuth);

  return (
    <>
      <Container maxWidth="container.lg" marginBottom={6}>
        <Flex align="center" marginBottom={3}>
          <Heading as="h3" size="lg">
            Top Albums
            {data && data.favorites ? (
              <Badge
                borderRadius="4px"
                fontSize="0.9em"
                marginLeft={1}
                verticalAlign="baseline"
              >
                {data.favorites.length.toLocaleString()}
              </Badge>
            ) : null}
          </Heading>
          <Spacer />
          {hasAuth ? (
            <Button
              isDisabled={isLoading}
              marginRight={1}
              onClick={refresh}
              variant="outline"
            >
              Refresh
            </Button>
          ) : null}
        </Flex>
        {error ? <AppMessage /> : null}
        {data && data.favorites ? (
          <SimpleGrid minChildWidth="240px" spacing="24px">
            {Object.entries(formatFavorites(data.favorites))
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
        ) : null}
      </Container>
      <TopLink />
    </>
  );
};

export default TopAlbums;
