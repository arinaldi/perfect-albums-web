import { FC, useEffect, useState } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';

import { getRandomInt } from '../../utils';
import api from '../../utils/api';

const RandomArtist: FC = () => {
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
        setText(error.message);
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
};

export default RandomArtist;
