import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Link,
  Text,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

import { useAppState } from '../Provider';
import { ICONS } from '../../constants';

const CardWrapper = (props) => {
  const { song, handleDeleteOpen } = props;
  const { user: { isAuthenticated } } = useAppState();

  const handleClick = () => {
    handleDeleteOpen(song);
  };

  return (
    <Box
      borderWidth='1px'
      maxW='sm'
      p={5}
      rounded='md'
    >
      <Heading size='md'>{song.title}</Heading>
      <Text my={1}>{song.artist}</Text>
      <Flex align='center'>
        <Link color='blue.500' href={song.link} isExternal>Listen</Link>
        {isAuthenticated && (
          <Text
            cursor='pointer'
            ml={2}
            onClick={handleClick}
          >
            {ICONS.X}
          </Text>
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
