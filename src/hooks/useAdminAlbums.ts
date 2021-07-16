import useSWR from 'swr';

import { fetcher } from '../utils/api';
import { Album } from '../utils/types';

interface Payload {
  albums: Album[];
  cdTotal: number;
  hasError: boolean;
  isLoading: boolean;
  mutate: () => void;
  total: number;
}

function useAdminAlbums(url: string, preventFetch = false): Payload {
  const key = preventFetch ? null : url;
  const { data, error, mutate } = useSWR(key, fetcher, {
    dedupingInterval: 5000,
  });
  const { data: cdData, error: cdError } = useSWR('/api/cds', fetcher);

  const payload = {
    albums: [],
    cdTotal: 0,
    hasError: error,
    isLoading: !error && !data,
    mutate,
    total: 0,
  };

  if (data && !error) {
    payload.albums = data.data;
    payload.total = data.count;
  }

  if (cdData && !cdError) {
    payload.cdTotal = cdData;
  }

  return payload;
}

export default useAdminAlbums;
