import { FC } from 'react';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ChakraProvider } from '@chakra-ui/react';

import { getToken } from '../utils/storage';
import { BASE_URL } from '../constants';
import ErrorBoundary from './ErrorBoundary';
import { Provider } from './Provider';
import Routes from './Routes';

const httpLink = createHttpLink({
  uri: `${BASE_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const token = getToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

const App: FC = () => (
  <ErrorBoundary>
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Provider>
          <Routes />
        </Provider>
      </ChakraProvider>
    </ApolloProvider>
  </ErrorBoundary>
);

export default App;
