import React from 'react';

import Admin from '../../src/components/Admin/presenter';
import render from '../utils';
import { mockAdminData } from '../mocks';

const handleChange = () => jest.fn;
const handleFirst = () => jest.fn;
const handleLast = () => jest.fn;
const handleNext = () => jest.fn;
const handlePageChange = () => jest.fn;
const handlePrev = () => jest.fn;
const handleSort = () => jest.fn;

test('Admin renders with data', () => {
  const { getByTestId, getByText } = render(
    <Admin
      clearInput={jest.fn}
      currentPage={1}
      data={mockAdminData}
      direction='asc'
      isLoading={false}
      onChange={handleChange}
      onFirst={handleFirst}
      onLast={handleLast}
      onNext={handleNext}
      onPageChange={handlePageChange}
      onPrev={handlePrev}
      onSort={handleSort}
      perPage={25}
      searchInput={{ current: null }}
      searchText=''
      sort='artist'
      total={mockAdminData.length}
    />,
  );
  const titleHeader = getByText('Admin');
  const total = getByTestId('total');
  const clearButton = getByText('Clear');
  const newButton = getByText('New');

  expect(titleHeader).toBeInTheDocument();
  expect(total).toBeInTheDocument();
  expect(clearButton).toBeInTheDocument();
  expect(newButton).toBeInTheDocument();
});
