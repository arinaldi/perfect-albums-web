import {
  Badge,
  Box,
  Flex,
  Heading,
  ListItem,
  Spacer,
  UnorderedList,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const AlbumCol = (props) => {
  const { data, year, total } = props;

  return (
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
        {data.map((album, index) => (
          <ListItem key={index}>
            {album.artist} &ndash; {album.title}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

AlbumCol.propTypes = {
  data: PropTypes.array.isRequired,
  year: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default AlbumCol;
