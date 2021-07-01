import useSWR from 'swr';

import { fetcher } from '../utils/api';
import { Album } from '../utils/types';

interface Result {
  albums: Album[];
  hasError: boolean;
  isLoading: boolean;
  total: number;
}

function useAdminAlbums (url: string, preventFetch: boolean): Result {
  const { data, error } = useSWR(
    preventFetch ? null : url,
    fetcher,
    { dedupingInterval: 10000 },
  );
  const result = {
    albums: [],
    hasError: error,
    isLoading: !error && !data,
    total: 0,
  };

  if (data && !error) {
    result.albums = data.data;
    result.total = data.count;
  }

  return result;
}

export default useAdminAlbums;
