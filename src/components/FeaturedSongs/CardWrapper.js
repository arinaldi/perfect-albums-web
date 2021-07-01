import {
  Box,
  Flex,
  Heading,
  IconButton,
  Link,
  Text,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

import { useAppState } from '../Provider';

const CardWrapper = (props) => {
  const { song, handleDeleteOpen } = props;
  const { user: { isAuthenticated } } = useAppState();

  const handleClick = () => {
    handleDeleteOpen(song);
  };

  return (
    <Box
      borderWidth="1px"
      maxWidth="sm"
      p={5}
      rounded="md"
    >
      <Heading size="md">{song.title}</Heading>
      <Text my={1}>{song.artist}</Text>
      <Flex align="center">
        <Link color="blue.500" href={song.link} isExternal>Listen</Link>
        {isAuthenticated && (
          <IconButton
            aria-label="Delete Song"
            icon={<DeleteIcon />}
            ml={1}
            onClick={handleClick}
            size="xs"
            variant="ghost"
          />
        )}
      </Flex>
    </Box>
  );
};

CardWrapper.propTypes = {
  song: PropTypes.object.isRequired,
  handleDeleteOpen: PropTypes.func.isRequired,
};

export default CardWrapper;
