import { FC } from 'react';
import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';

import getClient from '../utils/graphql';
import theme from '../utils/theme';
import useAuth from '../hooks/useAuth';
import ErrorBoundary from './ErrorBoundary';
import Routes from './Routes';

const App: FC = () => {
  const { signOut } = useAuth();
  const client = getClient(signOut);

  return (
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <ChakraProvider theme={theme}>
          <Routes />
        </ChakraProvider>
      </ApolloProvider>
    </ErrorBoundary>
  );
};

export default App;
