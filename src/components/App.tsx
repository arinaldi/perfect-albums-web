import { FC } from 'react';
import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';

import client from '../utils/graphql';
import theme from '../utils/theme';
import ErrorBoundary from './ErrorBoundary';
import Routes from './Routes';

const App: FC = () => (
  <ErrorBoundary>
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Routes />
      </ChakraProvider>
    </ApolloProvider>
  </ErrorBoundary>
);

export default App;
