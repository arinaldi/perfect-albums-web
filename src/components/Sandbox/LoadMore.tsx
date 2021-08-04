import { FC } from 'react';
import { Box, Button, ListItem, Text, UnorderedList } from '@chakra-ui/react';

import useBufferedData from '../../hooks/useBufferedData';

const LoadMore: FC = () => {
  const { data, hasError, isStale, update } = useBufferedData();

  if (!data) return <Text>Loading...</Text>;
  if (hasError) return <Text>Error</Text>;

  return (
    <Box>
      {isStale && (
        <Button marginBottom={3} onClick={update} variant="outline">
          Load More
        </Button>
      )}
      <UnorderedList>
        {data.map((quote: string, index: number) => (
          <ListItem key={index}>{quote}</ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default LoadMore;
