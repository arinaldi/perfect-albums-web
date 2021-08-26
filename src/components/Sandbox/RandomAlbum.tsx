import { FC, useState } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';

import api from '../../utils/api';

const RandomAlbum: FC = () => {
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
      setError(error.message);
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
};

export default RandomAlbum;
