import useSWR from 'swr';

import { gqlFetcher } from '../utils/fetcher';
import { Release, SwrPayload } from '../utils/types';
import { GET_RELEASES } from '../queries';

interface Releases {
  releases: Release[];
}

function useNewReleases(): SwrPayload<Releases> {
  const { data, error, mutate } = useSWR(GET_RELEASES, gqlFetcher);

  return {
    data,
    hasError: Boolean(error),
    isLoading: !error && !data,
    mutate,
  };
}

export default useNewReleases;
