import React from 'react';

import TopAlbums from '../../src/components/TopAlbums/presenter';
import render from '../utils';
import { mockTopAlbumsData } from '../mocks';

test('TopAlbums renders with data by year', () => {
  const { getByText, getByTestId } = render(
    <TopAlbums
      data={{ favorites: mockTopAlbumsData }}
      error={null}
      isLoading={false}
      refresh={jest.fn}
    />,
  );
  const titleHeader = getByText('Top Albums');
  const year91Header = getByText('1991');
  const year99Header = getByText('1999');
  const year91List = getByTestId('list-1991');
  const year99List = getByTestId('list-1999');

  expect(titleHeader).toBeInTheDocument();
  expect(year91Header).toBeInTheDocument();
  expect(year99Header).toBeInTheDocument();
  expect(year91List.children).toHaveLength(2);
  expect(year99List.children).toHaveLength(1);
});
