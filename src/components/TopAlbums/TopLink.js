import React from 'react';
import { Box, Link } from '@chakra-ui/react';

import { ICONS } from '../../constants';

const TopLink = () => (
  <Box
    bottom={0}
    padding={2}
    position='fixed'
    right={0}
    zIndex={1030}
  >
    <Link href='#top'>
      {`${ICONS.UP} Top`}
    </Link>
  </Box>
);

export default TopLink;
