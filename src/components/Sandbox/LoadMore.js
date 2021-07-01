import {
  Box,
  Button,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';

import useBufferedData from '../../hooks/useBufferedData';

const LoadMore = () => {
  const { data, error, isStale, update } = useBufferedData();

  if (!data) return <Text>Loading...</Text>;
  if (error) return <Text>Error</Text>;

  return (
    <Box>
      {isStale && (
        <Button variant="outline" onClick={update}>
          Load More
        </Button>
      )}
      <UnorderedList>
        {data.map((quote, index) => (
          <ListItem key={index}>{quote}</ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default LoadMore;
