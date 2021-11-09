import { useState } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';

import { MESSAGES } from '../../constants/index';
import api from '../../utils/api';

export default function RandomAlbum() {
  const [data, setData] = useState({
    artist: 'Artist',
    title: 'Title',
    year: new Date().getFullYear().toString(),
  });
  const [error, setError] = useState('');

  async function getRandomAlbum() {
    setError('');

    try {
      const { data: album } = await api('/api/random');
      setData(album);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : MESSAGES.ERROR_GENERIC;
      setError(message);
    }
  }

  return (
    <Box>
      {error ? (
        <Text>{error}</Text>
      ) : (
        <Text>
          {data.artist} &ndash; {data.title}&nbsp;{`(${data.year})`}
        </Text>
      )}
      <Button marginTop={3} onClick={getRandomAlbum} variant="outline">
        Submit
      </Button>
    </Box>
  );
}
