import useSWR from 'swr';

import { gqlFetcher } from '../hooks/useStore';
import { Releases, SwrPayload } from '../utils/types';
import { GET_RELEASES } from '../queries';

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
