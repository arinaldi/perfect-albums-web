import { GraphQLClient, request } from 'graphql-request';

import { GQL_URL } from '../constants';
import useStore from '../hooks/useStore';

export function gqlFetcher(query: string): Promise<any> {
  return request(GQL_URL, query);
}

export const graphQLClient = new GraphQLClient(GQL_URL, {
  headers: {
    authorization: `Bearer ${useStore.getState().getSessionToken()}`,
  },
});
