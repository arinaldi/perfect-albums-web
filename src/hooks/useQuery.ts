import useSWR from 'swr';

import { gqlFetcher } from '../hooks/useStore';
import { SwrPayload } from '../utils/types';

export default function useQuery<T>(query: string): SwrPayload<T> {
  const { data, error, mutate } = useSWR(query, gqlFetcher);

  return {
    data,
    hasError: Boolean(error),
    isLoading: !error && !data,
    mutate,
  };
}
