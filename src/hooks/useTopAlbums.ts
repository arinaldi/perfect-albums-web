import useSWR from 'swr';

import { gqlFetcher } from '../utils/graphql';
import { Favorites, SwrPayload } from '../utils/types';
import { GET_FAVORITES } from '../queries';

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
