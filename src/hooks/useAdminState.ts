import {
  ChangeEvent,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { PER_PAGE, SORT_DIRECTION, SORT_VALUE } from '../constants';
import { Album } from '../utils/types';
import useDebounce from '../hooks/useDebounce';
import useAdminAlbums from '../hooks/useAdminAlbums';
import useQueryParams from '../hooks/useQueryParams';
import { fetchAndCache } from '../hooks/useStore';

interface Handlers {
  onClear: () => void;
  onFirst: () => void;
  onLast: () => void;
  onNext: () => void;
  onPerPageChange: (value: number) => void;
  onPrevious: () => void;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSort: (value: SORT_VALUE) => void;
}

interface Payload {
  albums: Album[];
  cdTotal: number;
  direction: SORT_DIRECTION;
  handlers: Handlers;
  hasError: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
  isLoading: boolean;
  mutate: () => void;
  page: number;
  perPage: PER_PAGE;
  searchInput: RefObject<HTMLInputElement>;
  searchText: string;
  sort: SORT_VALUE;
  total: number;
}

export default function useAdminState(): Payload {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = useQueryParams();
  const { direction, page, perPage, search, sort } = queryParams;
  const [searchText, setSearchText] = useState(search);
  const searchInput = useRef<HTMLInputElement | null>(null);
  const debouncedSearch = useDebounce(searchText, 500);
  const url = `/api/albums?page=${page}&per_page=${perPage}&search=${debouncedSearch}&sort=${sort}&direction=${direction}`;
  const preventFetch = !debouncedSearch && Boolean(searchText);
  const { albums, cdTotal, hasError, isLoading, mutate, total } =
    useAdminAlbums(url, preventFetch);
  const isFirstPage = page === 1;
  const isLastPage = page === Math.ceil(total / perPage);

  useEffect(() => {
    if (!search) {
      const nextUrl = `/api/albums?page=2&per_page=${PER_PAGE.SMALL}&search=&sort=&direction=`;
      fetchAndCache(nextUrl);
    }
  }, [search]);

  useEffect(() => {
    if (searchInput && searchInput.current) {
      searchInput.current.focus();
    }
  }, [searchInput]);

  const handlers = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);

    function updateQueryParams(keyValuePairs: Record<string, string>): void {
      Object.entries(keyValuePairs).forEach(([key, value]) => {
        searchParams.set(key, value);
      });

      navigate(`/admin?${searchParams.toString()}`, { replace: true });
    }

    return {
      onPrevious: () => {
        const newPage = page - 2;
        const previousUrl = `/api/albums?page=${newPage}&per_page=${perPage}&search=${debouncedSearch}&sort=${sort}&direction=${direction}`;

        if (newPage !== 0) fetchAndCache(previousUrl);

        const prevPage = page - 1;
        updateQueryParams({ page: prevPage.toString() });
      },
      onNext: () => {
        const nextUrl = `/api/albums?page=${
          page + 2
        }&per_page=${perPage}&search=${debouncedSearch}&sort=${sort}&direction=${direction}`;
        fetchAndCache(nextUrl);

        const nextPage = page + 1;
        updateQueryParams({ page: nextPage.toString() });
      },
      onFirst: () => {
        updateQueryParams({ page: '1' });
      },
      onLast: () => {
        const lastPage = Math.ceil(total / perPage);
        const prevUrl = `/api/albums?page=${
          lastPage - 1
        }&per_page=${perPage}&search=${debouncedSearch}&sort=${sort}&direction=${direction}`;
        fetchAndCache(prevUrl);

        updateQueryParams({ page: lastPage.toString() });
      },
      onPerPageChange: (value: PER_PAGE) => {
        updateQueryParams({ page: '1', perPage: value.toString() });
      },
      onSearchChange: (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        setSearchText(value);
        updateQueryParams({ page: '1', search: value });
      },
      onClear: () => {
        if (searchInput?.current) {
          searchInput.current.focus();
        }

        setSearchText('');
        updateQueryParams({ page: '1', search: '' });
      },
      onSort: (value: SORT_VALUE) => {
        const { ASC, DESC } = SORT_DIRECTION;
        let newDirection = DESC;

        if (sort !== value || !direction || direction === DESC) {
          newDirection = ASC;
        }

        updateQueryParams({ page: '1', sort: value, direction: newDirection });
      },
    };
  }, [
    debouncedSearch,
    direction,
    location.search,
    navigate,
    page,
    perPage,
    sort,
    total,
  ]);

  return {
    albums,
    cdTotal,
    direction,
    handlers,
    hasError,
    isFirstPage,
    isLastPage,
    isLoading,
    mutate,
    page,
    perPage,
    searchInput,
    searchText,
    sort,
    total,
  };
}
