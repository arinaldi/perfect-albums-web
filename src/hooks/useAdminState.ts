import {
  ChangeEvent,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { PER_PAGE, SORT_DIRECTION, SORT_VALUE } from '../constants';
import { fetchAndCache } from '../utils/fetcher';
import { Album, GenericObject } from '../utils/types';
import useDebounce from '../hooks/useDebounce';
import useAdminAlbums from '../hooks/useAdminAlbums';
import useQueryParams from '../hooks/useQueryParams';

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
  currentPage: number;
  direction: SORT_DIRECTION;
  handlers: Handlers;
  hasError: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
  isLoading: boolean;
  perPage: number;
  searchInput: RefObject<HTMLInputElement>;
  searchText: string;
  sort: SORT_VALUE;
  total: number;
}

export default function useAdminState(): Payload {
  const history = useHistory();
  const location = useLocation();
  const queryParams = useQueryParams();
  const [searchText, setSearchText] = useState(queryParams.search || '');
  const [currentPage, setCurrentPage] = useState(
    parseInt(queryParams.page) || 1,
  );
  const [perPage, setPerPage] = useState(
    parseInt(queryParams.perPage) || PER_PAGE.SMALL,
  );
  const [sort, setSort] = useState(queryParams.sort || SORT_VALUE.NONE);
  const [direction, setDirection] = useState(
    queryParams.direction || SORT_DIRECTION.NONE,
  );
  const searchInput = useRef<HTMLInputElement | null>(null);
  const debouncedSearch = useDebounce(searchText, 500);
  const url = `/api/albums?page=${currentPage}&per_page=${perPage}&search=${debouncedSearch}&sort=${sort}&direction=${direction}`;
  const preventFetch = !debouncedSearch && Boolean(searchText);
  const { albums, cdTotal, hasError, isLoading, total } = useAdminAlbums(
    url,
    preventFetch,
  );
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === Math.ceil(total / perPage);

  useEffect(() => {
    if (!queryParams.search) {
      const nextUrl = `/api/albums?page=2&per_page=${PER_PAGE.SMALL}&search=&sort=&direction=`;
      fetchAndCache(nextUrl);
    }
  }, [queryParams.search]);

  useEffect(() => {
    if (searchInput && searchInput.current) {
      searchInput.current.focus();
    }
  }, [searchInput]);

  const handlers = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);

    function updateQueryParams(keyValuePairs: GenericObject): void {
      Object.entries(keyValuePairs).forEach(([key, value]) => {
        searchParams.set(key, value);
      });

      history.replace(`/admin?${searchParams.toString()}`);
    }

    return {
      onPrevious: () => {
        const newPage = currentPage - 2;
        const previousUrl = `/api/albums?page=${newPage}&per_page=${perPage}&search=${debouncedSearch}&sort=${sort}&direction=${direction}`;

        if (newPage !== 0) fetchAndCache(previousUrl);

        const prevPage = currentPage - 1;
        setCurrentPage(prevPage);
        updateQueryParams({ page: prevPage.toString() });
      },
      onNext: () => {
        const nextUrl = `/api/albums?page=${
          currentPage + 2
        }&per_page=${perPage}&search=${debouncedSearch}&sort=${sort}&direction=${direction}`;
        fetchAndCache(nextUrl);

        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        updateQueryParams({ page: nextPage.toString() });
      },
      onFirst: () => {
        setCurrentPage(1);
        updateQueryParams({ page: '1' });
      },
      onLast: () => {
        const lastPage = Math.ceil(total / perPage);
        const prevUrl = `/api/albums?page=${
          lastPage - 1
        }&per_page=${perPage}&search=${debouncedSearch}&sort=${sort}&direction=${direction}`;
        fetchAndCache(prevUrl);

        setCurrentPage(lastPage);
        updateQueryParams({ page: lastPage.toString() });
      },
      onPerPageChange: (value: number) => {
        setPerPage(value);
        setCurrentPage(1);
        updateQueryParams({ page: '1', perPage: value.toString() });
      },
      onSearchChange: (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        setCurrentPage(1);
        setSearchText(value);
        updateQueryParams({ page: '1', search: value });
      },
      onClear: () => {
        if (searchInput?.current) {
          searchInput.current.focus();
        }

        setCurrentPage(1);
        setSearchText('');
        updateQueryParams({ page: '1', search: '' });
      },
      onSort: (value: SORT_VALUE) => {
        const { ASC, DESC } = SORT_DIRECTION;
        let newDirection = DESC;

        if (sort !== value || !direction || direction === DESC) {
          newDirection = ASC;
        }

        setCurrentPage(1);
        setSort(value);
        setDirection(newDirection);
        updateQueryParams({ page: '1', sort: value, direction: newDirection });
      },
    };
  }, [
    currentPage,
    debouncedSearch,
    direction,
    history,
    location.search,
    perPage,
    sort,
    total,
  ]);

  return {
    albums,
    cdTotal,
    currentPage,
    direction,
    handlers,
    hasError,
    isFirstPage,
    isLastPage,
    isLoading,
    perPage,
    searchInput,
    searchText,
    sort,
    total,
  };
}
