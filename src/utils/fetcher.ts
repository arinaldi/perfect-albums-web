import { mutate } from 'swr';

import { BASE_URL } from '../constants';
import useStore from '../hooks/useStore';

export async function fetcher(url: string): Promise<any> {
  const token = useStore.getState().getSessionToken();
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
