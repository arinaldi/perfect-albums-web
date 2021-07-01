import { Box, Link } from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';

const TopLink = () => (
  <Box
    bottom={0}
    padding={2}
    position='fixed'
    right={0}
    zIndex={1030}
  >
    <Link href='#top'>
      <ArrowUpIcon mr={1} verticalAlign='text-top' />
      Top
    </Link>
  </Box>
);

export default TopLink;
