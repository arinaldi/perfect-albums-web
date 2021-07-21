import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

import { BASE_URL, ERRORS } from '../constants';
import { getToken } from '../utils/storage';
import { SignOut } from '../utils/types';

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

function getErrorLink(signOut: SignOut): ApolloLink {
  const errorLink = onError(({ graphQLErrors }) => {
    if (Array.isArray(graphQLErrors)) {
      const [error] = graphQLErrors;

      if (error.message === ERRORS.INVALID_USER) {
        signOut();
      }
    }
  });

  return errorLink;
}

function getClient(signOut: SignOut): ApolloClient<NormalizedCacheObject> {
  const errorLink = getErrorLink(signOut);
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: errorLink.concat(authLink).concat(httpLink),
  });

  return client;
}

export default getClient;
