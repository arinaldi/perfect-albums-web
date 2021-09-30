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
import usePrefetch from '../hooks/usePrefetch';
import useQueryParams from '../hooks/useQueryParams';

interface Handlers {
  onArtistChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  onFirst: () => void;
  onLast: () => void;
  onNext: () => void;
  onPerPageChange: (value: number) => void;
  onPrevious: () => void;
  onSort: (value: SORT_VALUE) => void;
  onFilter: () => void;
  onTitleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface Payload {
  albums: Album[];
  artistSearch: string;
  artistSearchRef: RefObject<HTMLInputElement>;
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
  sort: SORT_VALUE;
  studio: string;
  titleSearch: string;
  titleSearchRef: RefObject<HTMLInputElement>;
  total: number;
}

export default function useAdminState(): Payload {
  const navigate = useNavigate();
  const location = useLocation();
  const prefetch = usePrefetch();
  const queryParams = useQueryParams();
  const { artist, direction, page, perPage, sort, studio, title } = queryParams;
  const [artistSearch, setArtistSearch] = useState(artist?.toString() || '');
  const [titleSearch, setTitleSearch] = useState(title?.toString() || '');
  const debouncedArtist = useDebounce(artistSearch);
  const debouncedTitle = useDebounce(titleSearch);
  const artistSearchRef = useRef<HTMLInputElement | null>(null);
  const titleSearchRef = useRef<HTMLInputElement | null>(null);
  const url = `/api/albums?page=${page}&per_page=${perPage}&artist=${debouncedArtist}&title=${debouncedTitle}&sort=${sort}&direction=${direction}&studio=${studio}`;
  const preventFetch =
    (!debouncedArtist && Boolean(artistSearch)) ||
    (!debouncedTitle && Boolean(titleSearch));
  const { albums, cdTotal, hasError, isLoading, mutate, total } =
    useAdminAlbums(url, preventFetch);
  const isFirstPage = page === 1;
  const isLastPage = page === Math.ceil(total / perPage);

  useEffect(() => {
    if (!artist || !title) {
      const nextUrl = `/api/albums?page=2&per_page=${PER_PAGE.SMALL}&artist=&title=&sort=&direction=&studio=${studio}`;
      prefetch(nextUrl);
    }
  }, [artist, prefetch, studio, title]);

  useEffect(() => {
    artistSearchRef?.current?.focus();
  }, []);

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
        const previousUrl = `/api/albums?page=${newPage}&per_page=${perPage}&artist=${debouncedArtist}&title=${debouncedTitle}&sort=${sort}&direction=${direction}&studio=${studio}`;

        if (newPage !== 0) prefetch(previousUrl);

        const prevPage = page - 1;
        updateQueryParams({ page: prevPage.toString() });
      },
      onNext: () => {
        const nextUrl = `/api/albums?page=${
          page + 2
        }&per_page=${perPage}&artist=${debouncedArtist}&title=${debouncedTitle}&sort=${sort}&direction=${direction}&studio=${studio}`;
        prefetch(nextUrl);

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
        }&per_page=${perPage}&artist=${debouncedArtist}&title=${debouncedTitle}&sort=${sort}&direction=${direction}&studio=${studio}`;
        prefetch(prevUrl);

        updateQueryParams({ page: lastPage.toString() });
      },
      onPerPageChange: (value: PER_PAGE) => {
        updateQueryParams({ page: '1', perPage: value.toString() });
      },
      onArtistChange: (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        setArtistSearch(value);
        updateQueryParams({ artist: value, page: '1' });
      },
      onTitleChange: (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        setTitleSearch(value);
        updateQueryParams({ page: '1', title: value });
      },
      onClear: () => {
        artistSearchRef?.current?.focus();

        setArtistSearch('');
        setTitleSearch('');
        updateQueryParams({ artist: '', page: '1', title: '' });
      },
      onSort: (value: SORT_VALUE) => {
        const { ASC, DESC } = SORT_DIRECTION;
        let newDirection = DESC;

        if (sort !== value || !direction || direction === DESC) {
          newDirection = ASC;
        }

        updateQueryParams({ page: '1', sort: value, direction: newDirection });
      },
      onFilter: () => {
        updateQueryParams({ studio: studio === 'true' ? '' : 'true' });
      },
    };
  }, [
    debouncedArtist,
    debouncedTitle,
    direction,
    location.search,
    navigate,
    page,
    perPage,
    prefetch,
    sort,
    studio,
    total,
  ]);

  return {
    albums,
    artistSearch,
    artistSearchRef,
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
    sort,
    studio: studio?.toString() || '',
    titleSearch,
    titleSearchRef,
    total,
  };
}
