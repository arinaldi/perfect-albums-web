import { Box, Flex, Heading, IconButton, Link, Text } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

import { Song } from '../../utils/types';
import useStore from '../../hooks/useStore';

interface Props {
  onDeleteOpen: (song: Song) => void;
  song: Song;
}

export default function CardWrapper({ onDeleteOpen, song }: Props) {
  const user = useStore((state) => state.user);

  function handleClick() {
    onDeleteOpen(song);
  }

  return (
    <Box borderWidth="1px" maxWidth="sm" p={5} rounded="md">
      <Heading size="md">{song.title}</Heading>
      <Text my={1}>{song.artist}</Text>
      <Flex align="center">
        <Link color="blue.500" href={song.link} isExternal>
          Listen
        </Link>
        {user ? (
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
}
