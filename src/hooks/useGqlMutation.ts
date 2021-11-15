import { graphQLClient, revalidateLiveQueries } from './useStore';

export default function useGqlMutation(key: string) {
  return async function (data: any) {
    await graphQLClient.request(key, data);
    await revalidateLiveQueries();
  };
}
