import useSWR from 'swr';

import { fetcher } from '../utils/api';
import { Album } from '../utils/types';

interface Payload {
  albums: Album[];
  hasError: boolean;
  isLoading: boolean;
  mutate: () => void;
  total: number;
}

function useAdminAlbums (url: string, preventFetch = false): Payload {
  const key = preventFetch ? null : url;
  const { data, error, mutate } = useSWR(key, fetcher, { dedupingInterval: 10000 });
  const payload = {
    albums: [],
    hasError: error,
    isLoading: !error && !data,
    mutate,
    total: 0,
  };

  if (data && !error) {
    payload.albums = data.data;
    payload.total = data.count;
  }

  return payload;
}

export default useAdminAlbums;
