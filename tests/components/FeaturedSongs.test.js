import React from 'react';

import FeaturedSongs from '../../src/components/FeaturedSongs/presenter';
import { STATE_STATUSES } from '../../src/constants';
import render from '../utils';
import { mockFeaturedSongsData } from '../mocks';

const handleCreateOpen = () => jest.fn;
const handleDeleteOpen = () => jest.fn;

test('FeaturedSongs renders with data', () => {
  const { getByText, getByTestId } = render(
    <FeaturedSongs
      cancel={jest.fn}
      data={{ songs: mockFeaturedSongsData }}
      onCreateOpen={handleCreateOpen}
      onDeleteOpen={handleDeleteOpen}
      refresh={jest.fn}
      status={STATE_STATUSES.SUCCESS}
    />,
  );
  const titleHeader = getByText('Featured Songs');
  const nirvanaCard = getByText('Smells Like Teen Spirit');
  const pearlJamCard = getByText('Even Flow');
  const cardRow = getByTestId('card-row');

  expect(titleHeader).toBeInTheDocument();
  expect(nirvanaCard).toBeInTheDocument();
  expect(pearlJamCard).toBeInTheDocument();
  expect(cardRow.children).toHaveLength(3);
});
