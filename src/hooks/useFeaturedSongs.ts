import useSWR from 'swr';

import { gqlFetcher } from '../utils/fetcher';
import { Song, SwrPayload } from '../utils/types';
import { GET_SONGS } from '../queries';

interface Songs {
  songs: Song[];
}

function useFeaturedSongs(): SwrPayload<Songs> {
  const { data, error, mutate } = useSWR(GET_SONGS, gqlFetcher);

  return {
    data,
    hasError: Boolean(error),
    isLoading: !error && !data,
    mutate,
  };
}

export default useFeaturedSongs;
