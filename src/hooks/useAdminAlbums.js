import useSWR from 'swr';

import { fetcher } from '../utils/api';

const useAdminAlbums = (url, preventFetch) => {
  const { data, error } = useSWR(
    preventFetch ? null : url,
    fetcher,
    { dedupingInterval: 10000 },
  );
  const obj = {
    albums: [],
    total: 0,
    hasError: error,
    isLoading: !error && !data,
  };

  if (data && !error) {
    obj.albums = data.data;
    obj.total = data.count;
  }

  return obj;
};

export default useAdminAlbums;
