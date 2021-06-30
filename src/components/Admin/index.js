import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { getQuery } from '../../utils';
import { fetchAndCache } from '../../utils/api';
import useDebounce from '../../hooks/useDebounce';
import useAdminAlbums from '../../hooks/useAdminAlbums';
import { PER_PAGE, SORT_DIRECTION } from '../../constants';

import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import AppMessage from '../AppMessage/presenter';
import Admin from './presenter';

const AdminContainer = () => {
  const history = useHistory();
  const location = useLocation();
  const initialSearch = location.search ? getQuery(location.search) : '';
  const [searchText, setSearchText] = useState(initialSearch);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(PER_PAGE[0]);
  const [sort, setSort] = useState('');
  const [direction, setDirection] = useState('');
  const searchInput = useRef(null);
  const debouncedSearch = useDebounce(searchText, 500);
  const url = `/api/albums?page=${currentPage}&per_page=${perPage}&search=${debouncedSearch}&sort=${sort}&direction=${direction}`;
  const preventFetch = !debouncedSearch && searchText;
  const { albums, total, hasError, isLoading } = useAdminAlbums(url, preventFetch);

  useEffect(() => {
    if (!location.search) {
      const nextUrl = '/api/albums?page=2&per_page=25&search=&sort=&direction=';
      fetchAndCache(nextUrl);
    }
  }, [location.search]);

  const handleChange = ({ target: { value } }) => {
    handleFirst();
    setSearchText(value);
  };

  const clearInput = () => {
    handleFirst();
    setSearchText('');
    searchInput.current.focus();

    if (location.search) {
      location.search = '';
      history.replace(location);
    }
  };

  const handleFirst = () => {
    setCurrentPage(1);
  };

  const handleLast = () => {
    const page = Math.ceil(total / perPage);
    const prevUrl = `/api/albums?page=${page - 1}&per_page=${perPage}&search=${debouncedSearch}&sort=${sort}&direction=${direction}`;
    fetchAndCache(prevUrl);
    setCurrentPage(page);
  };

  const handlePrev = () => {
    const prevUrl = `/api/albums?page=${currentPage - 2}&per_page=${perPage}&search=${debouncedSearch}&sort=${sort}&direction=${direction}`;
    fetchAndCache(prevUrl);
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    const nextUrl = `/api/albums?page=${currentPage + 2}&per_page=${perPage}&search=${debouncedSearch}&sort=${sort}&direction=${direction}`;
    fetchAndCache(nextUrl);
    setCurrentPage(currentPage + 1);
  };

  const handlePageChange = (value) => {
    setPerPage(value);
    handleFirst();
  };

  const handleSort = (e) => {
    const { value } = e.target.dataset;
    const { ASC, DESC } = SORT_DIRECTION;

    setSort(value);
    setDirection(direction => {
      if (sort !== value || !direction || direction === DESC) {
        return ASC;
      }

      return DESC;
    });
    handleFirst();
  };

  if (hasError) return <AppMessage />;

  return (
    <ErrorBoundary>
      <ProgressLoader isVisible={isLoading} />
      <Admin
        clearInput={clearInput}
        currentPage={currentPage}
        isLoading={isLoading}
        data={albums}
        direction={direction}
        onChange={handleChange}
        onFirst={handleFirst}
        onLast={handleLast}
        onNext={handleNext}
        onPageChange={handlePageChange}
        onPrev={handlePrev}
        onSort={handleSort}
        perPage={perPage}
        searchInput={searchInput}
        searchText={searchText}
        sort={sort}
        total={total}
      />
    </ErrorBoundary>
  );
};

export default AdminContainer;
