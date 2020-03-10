import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { getQuery } from '../../utils';
import Api from '../../utils/api';
import useDebounce from '../../hooks/useDebounce';
import { PER_PAGE, SORT_DIRECTION } from '../../constants';

import ErrorBoundary from '../ErrorBoundary';
import ProgressLoader from '../ProgressLoader/presenter';
import AppMessage from '../AppMessage/presenter';
import Admin from './presenter';

const AdminContainer = () => {
  const history = useHistory();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(PER_PAGE[0]);
  const [sort, setSort] = useState('');
  const [direction, setDirection] = useState('');
  const searchInput = useRef(null);
  const debouncedSearch = useDebounce(searchText, 500);

  useEffect(() => {
    if (location.search) {
      const search = getQuery(location.search);
      setSearchText(search);
    }
  }, [location.search]);

  useEffect(() => {
    const search = location.search ? getQuery(location.search) : '';
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const url = `/api/albums?page=${currentPage}&per_page=${perPage}&search=${debouncedSearch}&sort=${sort}&direction=${direction}`;
        const res = await Api.get(url, true);
        const { count, data: albums } = await res.json();

        setData(albums);
        setTotal(count);
      } catch (err) {
        setHasError(true);
      }

      setIsLoading(false);
    };

    if (!debouncedSearch && search) {
      // wait for debouncedSearch to fetch data
    } else {
      fetchData();
    }
  }, [
    debouncedSearch,
    currentPage,
    direction,
    location.search,
    perPage,
    sort,
  ]);

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
    setCurrentPage(Math.ceil(total / perPage));
  };

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
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
        isLoading={isLoading}
        searchText={searchText}
        total={total}
        data={data}
        currentPage={currentPage}
        perPage={perPage}
        sort={sort}
        direction={direction}
        searchInput={searchInput}
        handleChange={handleChange}
        clearInput={clearInput}
        handleFirst={handleFirst}
        handleLast={handleLast}
        handlePrev={handlePrev}
        handleNext={handleNext}
        handlePageChange={handlePageChange}
        handleSort={handleSort}
      />
    </ErrorBoundary>
  );
};

export default AdminContainer;
