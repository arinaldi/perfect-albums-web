import { FC } from 'react';
import {
  Badge,
  Box,
  Flex,
  Heading,
  ListItem,
  Spacer,
  UnorderedList,
} from '@chakra-ui/react';

import { Favorite } from '../../utils/types';

interface Props {
  data: Favorite[];
  total: number;
  year: string;
}

const AlbumCol: FC<Props> = ({ data, year, total }) => (
  <Box>
    <Flex align="center" marginBottom={2}>
      <Heading
        as="h5"
        id={year}
        size="md"
      >
        {year}
      </Heading>
      <Spacer />
      <Box>
        <Badge
          borderRadius="4px"
          fontSize="1.25em"
          marginLeft={1}
        >
          {total}
        </Badge>
      </Box>
    </Flex>
    <UnorderedList data-testid={`list-${year}`} pl={3}>
      {data.map((favorite: Favorite, index: number) => (
        <ListItem key={index}>
          {favorite.artist} &ndash; {favorite.title}
        </ListItem>
      ))}
    </UnorderedList>
  </Box>
);

export default AlbumCol;
