import { mutate } from 'swr';
import { GraphQLClient, request } from 'graphql-request';

import { BASE_URL, GQL_URL } from '../constants';
import useStore from '../hooks/useStore';

const token = useStore.getState().getSessionToken();

export async function fetcher(url: string): Promise<any> {
  // eslint-disable-next-line no-undef
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return window
    .fetch(`${BASE_URL}${url}`, { headers })
    .then((res) => res.json());
}

export function fetchAndCache(key: string): Promise<any> {
  const request = fetcher(key);
  mutate(key, request, false);
  return request;
}

export function gqlFetcher(query: string): Promise<any> {
  return request(GQL_URL, query);
}

export const graphQLClient = new GraphQLClient(GQL_URL, {
  headers: {
    authorization: `Bearer ${token}`,
  },
});
