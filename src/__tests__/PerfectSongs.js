import React from 'react';
import { render } from '@testing-library/react';

import PerfectSongs from '../components/PerfectSongs/presenter';
import data from '../data/songs';

test('PerfectSongs renders with all data', () => {
  const { getByText, getByTestId } = render(<PerfectSongs />);
  const titleHeader = getByText('Perfect Songs');
  const tableBody = getByTestId('table-body');

  expect(titleHeader).toBeInTheDocument();
  expect(tableBody.children.length).toBe(data.songs.length);
});
