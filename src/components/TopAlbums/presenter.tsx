import { FC } from 'react';
import { Badge, Container, Flex, Heading, SimpleGrid } from '@chakra-ui/react';

import { formatFavorites, sortDesc } from '../../utils';
import { Favorites } from '../../utils/types';
import AppMessage from '../AppMessage/presenter';
import AlbumCol from './AlbumCol';
import TopLink from './TopLink';

interface Props {
  data: Favorites | null;
  hasError: boolean;
}

const TopAlbums: FC<Props> = ({ data, hasError }) => {
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
        </Flex>
        {hasError ? <AppMessage /> : null}
        {data?.favorites ? (
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
