import { FC } from 'react';
import { Box, Flex, Heading, IconButton, Link, Text } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

import { Song } from '../../utils/types';
import useAuth from '../../hooks/useAuth';

interface Props {
  onDeleteOpen: (song: Song) => void;
  song: Song;
}

const CardWrapper: FC<Props> = ({ onDeleteOpen, song }) => {
  const { hasAuth } = useAuth();

  const handleClick = () => {
    onDeleteOpen(song);
  };

  return (
    <Box borderWidth="1px" maxWidth="sm" p={5} rounded="md">
      <Heading size="md">{song.title}</Heading>
      <Text my={1}>{song.artist}</Text>
      <Flex align="center">
        <Link color="blue.500" href={song.link} isExternal>
          Listen
        </Link>
        {hasAuth ? (
          <IconButton
            aria-label="Delete Song"
            icon={<DeleteIcon />}
            ml={1}
            onClick={handleClick}
            size="xs"
            variant="ghost"
          />
        ) : null}
      </Flex>
    </Box>
  );
};

export default CardWrapper;
