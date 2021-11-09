import { useLocation } from 'react-router-dom';

import { PER_PAGE, SORT_DIRECTION, SORT_VALUE } from '../constants';
import { QueryParams } from '../utils/types';

export default function useQueryParams(): QueryParams {
  const { search } = useLocation();
  const params: QueryParams = {
    direction: SORT_DIRECTION.NONE,
    page: 1,
    perPage: PER_PAGE.SMALL,
    search: '',
    sort: SORT_VALUE.NONE,
  };
  new URLSearchParams(search).forEach((value, key) => {
    let newValue: string | number = value;

    if (['page', 'perPage'].includes(key)) {
      newValue = parseInt(newValue);
    }

    params[key] = newValue;
  });

  return params;
}
