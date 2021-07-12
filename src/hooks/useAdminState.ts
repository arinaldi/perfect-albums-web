import {
  ChangeEvent,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { PER_PAGE, SORT_DIRECTION } from '../constants';
import { getQuery } from '../utils';
import { fetchAndCache } from '../utils/api';
import { Album } from '../utils/types';
import useDebounce from '../hooks/useDebounce';
import useAdminAlbums from '../hooks/useAdminAlbums';

interface Handlers {
  onClear: () => void;
  onFirst: () => void;
  onLast: () => void;
  onNext: () => void;
  onPerPageChange: (value: number) => void;
  onPrevious: () => void;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSort: (value: string) => void;
}

interface Payload {
  albums: Album[];
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
  sort: string;
  total: number;
}

export default function useAdminState(): Payload {
  const history = useHistory();
  const location = useLocation();
  const initialSearch = location.search ? getQuery(location.search) : '';
  const [searchText, setSearchText] = useState(initialSearch);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(PER_PAGE[0]);
  const [sort, setSort] = useState('');
  const [direction, setDirection] = useState(SORT_DIRECTION.NONE);
  const searchInput = useRef<HTMLInputElement | null>(null);
  const debouncedSearch = useDebounce(searchText, 500);
  const url = `/api/albums?page=${currentPage}&per_page=${perPage}&search=${debouncedSearch}&sort=${sort}&direction=${direction}`;
  const preventFetch = !debouncedSearch && Boolean(searchText);
  const { albums, hasError, isLoading, total } = useAdminAlbums(
    url,
    preventFetch,
  );
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === Math.ceil(total / perPage);

  useEffect(() => {
    if (!location.search) {
      const nextUrl = '/api/albums?page=2&per_page=25&search=&sort=&direction=';
      fetchAndCache(nextUrl);
    }
  }, [location.search]);

  useEffect(() => {
    if (searchInput && searchInput.current) {
      searchInput.current.focus();
    }
  }, [searchInput]);

  const handlers = useMemo(
    () => ({
      onPrevious: () => {
        const newPage = currentPage - 2;
        const previousUrl = `/api/albums?page=${newPage}&per_page=${perPage}&search=${debouncedSearch}&sort=${sort}&direction=${direction}`;

        if (newPage !== 0) fetchAndCache(previousUrl);
        setCurrentPage((page) => page - 1);
      },
      onNext: () => {
        const nextUrl = `/api/albums?page=${
          currentPage + 2
        }&per_page=${perPage}&search=${debouncedSearch}&sort=${sort}&direction=${direction}`;
        fetchAndCache(nextUrl);
        setCurrentPage((page) => page + 1);
      },
      onFirst: () => {
        setCurrentPage(1);
      },
      onLast: () => {
        const page = Math.ceil(total / perPage);
        const prevUrl = `/api/albums?page=${
          page - 1
        }&per_page=${perPage}&search=${debouncedSearch}&sort=${sort}&direction=${direction}`;
        fetchAndCache(prevUrl);
        setCurrentPage(page);
      },
      onPerPageChange: (value: number) => {
        setPerPage(value);
        setCurrentPage(1);
      },
      onSearchChange: (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setCurrentPage(1);
        setSearchText(value);
      },
      onClear: () => {
        setCurrentPage(1);
        setSearchText('');

        if (searchInput && searchInput.current) {
          searchInput.current.focus();
        }

        if (location.search) {
          location.search = '';
          history.replace(location);
        }
      },
      onSort: (value: string) => {
        const { ASC, DESC } = SORT_DIRECTION;

        setSort(value);
        setDirection((direction) => {
          if (sort !== value || !direction || direction === DESC) {
            return ASC;
          }

          return DESC;
        });
        setCurrentPage(1);
      },
    }),
    [
      currentPage,
      debouncedSearch,
      direction,
      history,
      location,
      perPage,
      sort,
      total,
    ],
  );

  return {
    albums,
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
