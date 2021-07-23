import { useLocation } from 'react-router-dom';

import { SORT_DIRECTION, SORT_VALUE } from '../constants';
import { QueryParams } from '../utils/types';

function useQueryParams(): QueryParams {
  const { search } = useLocation();
  const params: QueryParams = {
    direction: SORT_DIRECTION.NONE,
    page: '1',
    perPage: '25',
    search: '',
    sort: SORT_VALUE.NONE,
  };
  new URLSearchParams(search).forEach((value, key) => {
    params[key] = value;
  });

  return params;
}

export default useQueryParams;
