import React from 'react';

import Admin from '../../src/components/Admin/presenter';
import render from '../utils';
import { mockAdminData } from '../mocks';

test('Admin renders with data', () => {
  const { getByTestId, getByText } = render(
    <Admin
      searchText=''
      total={mockAdminData.length}
      data={mockAdminData}
      currentPage={1}
      perPage={25}
      sort='artist'
      direction='asc'
      searchInput={{ current: null }}
      onChange={jest.fn}
      clearInput={jest.fn}
      onFirst={jest.fn}
      onLast={jest.fn}
      onPrev={jest.fn}
      onNext={jest.fn}
      onPageChange={jest.fn}
      onSort={jest.fn}
      isLoading={false}
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
