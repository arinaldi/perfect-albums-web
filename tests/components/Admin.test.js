import React from 'react';

import Admin from '../../src/components/Admin/presenter';
import render from '../utils';
import { mockAdminData } from '../mocks';

test('Admin renders with data', () => {
  const { getByText } = render(
    <Admin
      searchText=''
      total={mockAdminData.length}
      data={mockAdminData}
      currentPage={1}
      perPage={25}
      sort='artist'
      direction='asc'
      searchInput={{ current: null }}
      handleChange={jest.fn}
      clearInput={jest.fn}
      handleFirst={jest.fn}
      handleLast={jest.fn}
      handlePrev={jest.fn}
      handleNext={jest.fn}
      handlePageChange={jest.fn}
      handleSort={jest.fn}
      isLoading={false}
    />,
  );
  const titleHeader = getByText('Admin');
  const total = getByText(mockAdminData.length.toString());
  const clearButton = getByText('Clear');
  const newButton = getByText('New');

  expect(titleHeader).toBeInTheDocument();
  expect(total).toBeInTheDocument();
  expect(clearButton).toBeInTheDocument();
  expect(newButton).toBeInTheDocument();
});
