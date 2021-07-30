import useSWR from 'swr';

import { gqlFetcher } from '../utils/fetcher';
import { Favorite, SwrPayload } from '../utils/types';
import { GET_FAVORITES } from '../queries';

interface Favorites {
  favorites: Favorite[];
}

function useTopAlbums(): SwrPayload<Favorites> {
  const { data, error, mutate } = useSWR(GET_FAVORITES, gqlFetcher);

  return {
    data,
    hasError: Boolean(error),
    isLoading: !error && !data,
    mutate,
  };
}

export default useTopAlbums;
