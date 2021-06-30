import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

import Page from './Page';
import LoadMore from './LoadMore';

const Sandbox = (props) => {
  const { handleNext, page } = props;
  const [dataPage, setDataPage] = useState(1);
  const data = [];

  for (let i = 0; i < dataPage; i++) {
    data.push(
      <Page
        key={i}
        direction='desc'
        page={i + 1}
        perPage={10}
        sort='year'
      />,
    );
  }

  return (
    <Container maxWidth='container.lg' marginBottom={6}>
      <Flex>
        <Box flex={1}>
          <Heading as='h3' marginBottom={3} size='lg'>
            Sandbox
          </Heading>
          <Page page={page} perPage={10} />
          <Box style={{ display: 'none' }}>
            <Page page={page + 1} perPage={10} />
          </Box>
          <Button
            variant='outline'
            onClick={handleNext}
          >
            Next
          </Button>
          <Divider my={4} />
          {data}
          <Button
            variant='outline'
            onClick={() => setDataPage(page => page + 1)}
          >
            Load More
          </Button>
        </Box>
        <Box flex={1}>
          <Heading as='h3' marginBottom={3} size='lg'>
            Sandbox 2
          </Heading>
          <LoadMore />
        </Box>
      </Flex>
    </Container>
  );
};

Sandbox.propTypes = {
  handleNext: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};

export default Sandbox;
