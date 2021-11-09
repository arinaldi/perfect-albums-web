import { useEffect, useState } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';

import { MESSAGES } from '../../constants/index';
import { getRandomInt } from '../../utils';
import api from '../../utils/api';

export default function RandomArtist() {
  const [data, setData] = useState([]);
  const [text, setText] = useState('Get random artist');

  function getRandomArtist() {
    const index = getRandomInt(0, data.length - 1);
    setText(data[index]);
  }

  useEffect(() => {
    async function getArtists() {
      try {
        const { data: artists } = await api('/api/artists');
        setData(artists);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : MESSAGES.ERROR_GENERIC;
        setText(message);
      }
    }

    getArtists();
  }, []);

  return (
    <Box>
      <Text>{text}</Text>
      <Button
        isDisabled={data.length === 0}
        marginTop={3}
        onClick={getRandomArtist}
        variant="outline"
      >
        Submit
      </Button>
    </Box>
  );
}
