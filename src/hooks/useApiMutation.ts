import api from '../utils/api';
import { revalidateLiveQueries } from './useStore';

export default function useApiMutation(path: string) {
  return async function (data: any) {
    await api(path, data);
    await revalidateLiveQueries();
  };
}
