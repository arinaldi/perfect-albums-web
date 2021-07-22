import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

import { BASE_URL, ERRORS } from '../constants';
import { getToken } from '../utils/storage';
import useStore from '../hooks/useStore';

const httpLink = createHttpLink({
  uri: `${BASE_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const token = getToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const errorLink = onError(({ graphQLErrors }) => {
  if (Array.isArray(graphQLErrors)) {
    const [error] = graphQLErrors;

    if (error.message === ERRORS.INVALID_USER) {
      useStore.getState().signOut();
    }
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: errorLink.concat(authLink).concat(httpLink),
});

export default client;
